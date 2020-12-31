import { app, Command as AppComm, MultiCommand as AppMultiCommand, Option as AppOption } from 'command-line-application';
import { Overwrite } from 'utility-types';
import run, { CreateSystemArgs } from './run';

export type Option = AppOption & {
  config?: boolean;
};


interface Configurable {
  /** Options for the @design-systems/cli */
  options?: Option[];
}

export type Command = Overwrite<AppComm, Configurable>;

export type MultiCommand = Overwrite<
  Overwrite<AppMultiCommand, Configurable>,
  {
    /** Commands for the @design-systems/cli multi command */
    commands: CliCommand[];
  }
>;

/** Register a command with the cli */
export type CliCommand = Command | MultiCommand;

const listTemplates: Option = {
  name: 'list-templates',
  description: 'List available templates',
  type: Boolean
};

const force: Option = {
  name: 'force',
  description: 'Remove destination folder if it exits',
  alias: 'f',
  defaultValue: false,
  type: Boolean
};

const systemStandalone: Command | MultiCommand = {
  name: 'system',
  description: 'Scaffold a new ds system',
  examples: [
    'ds create system --name test-design-system',
  ],
  options: [
    {
      name: 'name',
      type: String,
      description: 'Name of the system to create.'
    },
    {
      name: 'repo',
      description: 'Repository url or owner',
      type: String
    }, 
    {
      name: 'template',
      alias: 't',
      description:
        'Override the template directory with a URL to a git repo. Repo must comply with template structure!',
      typeLabel: 'js | string',
      type: String,
      config: true
    },
    {
      name: 'verbose',
      alias: 'v',
      description: 'Output the debug logs. Debug: -v Trace: -vv',
      type: Boolean,
      multiple: true
    },
    listTemplates,
    force
  ]
}
const [, , ...processArgs] = process.argv;

console.log('process argv ', process.argv);
console.log('process args', processArgs);
const args = app(systemStandalone, { argv: processArgs });

if (args) {
  args._command = 'system';
  run(args as CreateSystemArgs);
}

// console.log('arguments in init', args);