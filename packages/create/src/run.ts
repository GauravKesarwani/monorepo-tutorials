import { execSync } from 'child_process';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import degit from 'degit'; 
import os from 'os';
import crypto from 'crypto';
import { titleCase } from 'title-case';
import path from 'path';
import copy from './copy';
import { getTemplate } from './template';

export interface Template {
  /** The name of the template */
  name: string;
  /** URL to the github repository that contains the template */
  url: string;
  /** A short description of what the template does */
  description: string;
  /** The commit sha of the version to clone */
  sha: string;
}

export interface TemplateOptions {
  /** The name of the package */
  name: string;
  /** The package author's name */
  authorName: string;
  /** The package author's email */
  authorEmail: string;
  /** Version of the package to create */
  version: string;
  /** A url to where the repo is stored */
  repoUrl: string;
  /** The name of the monorepo */
  monorepoName: string;
}

export interface CreateSystemArgs {
  /** The name of the thing to create */
  name?: string;
  /** Ignore if a directory already exists */
  force?: boolean;
  /** The GitHub repo to pull the template from */
  template?: string;
  /** List available templates */
  listTemplates?: boolean;
  /** directory to create system */
  destination?: string;
  /** A list of user configured templates for the command */
  templates?: Template[];
  /** The create system sub-command */
  _command: ['create', 'system'];
  /** Create the system in the CWD */
  cwd?: boolean;
  /** Repository url for the new repo */
  repo?: string;
}


function getDestDirectory(command: 'system', name?: string, dest?: string): any {
  return command === 'system' ? (dest || name) : undefined;
}

// for simplicity we create a system only now.
const askName = async () => {
  const result = await inquirer.prompt<{ value: string }>({
    name: 'value',
    type: 'input',
    message: 'What is the system name',
    validate: (input: any) => {

      if (!input) {
        return 'Name is required';
      }

      if (fs.existsSync(getDestDirectory('system', input))) {
        return 'Name already exists as a directory';
      }

      return true;
    }
  });

  return result.value;
}

/** Ask the user for their name. */
const askAuthor = async () => {
  const result = await inquirer.prompt<{ value: string }>({
    name: 'value',
    type: 'input',
    message: "What's your name?",

    /** Validate the user's name input */
    validate: (input: any) => {
      if (!input) {
        return 'Author name is required';
      }

      return true;
    }
  });

  return result.value;
}

/** Ask the user for their email. */
const askEmail = async () => {
  const result = await inquirer.prompt<{ value: string }>({
    name: 'value',
    type: 'input',
    message: "What's your emails?",

    /** Validate the user's name input */
    validate: (input: any) => {
      if (!input) {
        return 'Author email is required';
      }

      return true;
    }
  });

  return result.value;
}

/** Ask the user for the repo of the monorepo. */
const askRepo = async () => {
  const result = await inquirer.prompt<{ value: string }>({
    name: 'value',
    type: 'input',
    message: 'Repository url or owner/repo:',

    /** Validate the user's repo input */
    validate: (input: any) => {
      if (!input) {
        return 'Repository is required';
      }

      return true;
    }
  });

  return result.value;
}

/** Determine which sub-command was run. */
const getCommand = (args: CreateSystemArgs) =>
  Array.isArray(args._command) ? args._command[1] : args._command;


// Get the path to the template on github
async function getTemplatePath(args: CreateSystemArgs) {
  const command = getCommand(args);
  // by default it should get a typescript template
  const template = getTemplate(command, 'ts');

  const emitter = degit(template, {
    cache: false,
    force: true,
    verbose: true
  });

  emitter.on(
    'info',
    (info: {
      /** A message from the degit process. */
      message: string;
    }) => {
      console.log(info.message);
    }
  );

  const dir = path.join(
    os.tmpdir(),
    `design-systems-${crypto.randomBytes(16).toString('hex')}`
  );

  try {
    await emitter.clone(dir);
  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
    process.exit(0);
  }

  return dir;
}

const repoUrl = '';

/** A plugin to create a completely new system or a package in a system */
export default async function run(args: CreateSystemArgs) {
  console.log('args', args);
  const command = getCommand(args);
  const template = await getTemplatePath(args);

  const name = await askName();
  console.log('name', name);
  const config: TemplateOptions = {
    name: args.name || name,
    authorName: await askAuthor(),
    authorEmail: await askEmail(),
    repoUrl: args.repo || await askRepo(),
    version: '1.0.0',
    monorepoName: name
  };

  let destinationDirectory = config.name;
  
  console.log('destination directory', destinationDirectory);
  await copy(template, destinationDirectory, {
    ...config,
    title: titleCase(config.name)
  });


  execSync(`cd ${config.name} && git init`);
  execSync(`cd ${config.name} && git remote add origin ${repoUrl}`);

  new Promise<void>((res, rej) => {
    try {
      execSync(`cd ${config.name} && yarn`);
      res();
    } catch(err) {
      rej(err);
    }
  });

  execSync(`cd ${config.name} && git add . && git commit --no-verify -m "Create new design system`)
}