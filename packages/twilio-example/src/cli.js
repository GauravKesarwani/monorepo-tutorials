import arg from 'arg';
const { Command } = require('commander');
import commandLineArgs from 'command-line-args';
// https://github.com/75lb/command-line-usage/blob/master/doc/api.md
import commandLineUsage from 'command-line-usage';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
  };
}

export function cli(args) {
  // 1. using commander
  // const program = new Command();

  // program
  //   .option('-d, --debug', 'output extra padding')
  //   .option('-s --small', 'small pizza size')
  //   .option('-p --pizza-type', 'flavor of pizza');

  // program.parse(args);

  // if (program.debug) { console.log('program opts', program.opts()) };

  // using arg
  // let options = parseArgumentsIntoOptions(args);
  // console.log(options);

  // using command line arg

  // what you need  is a command line arguments library which can 
  // parse the arguments.
  const optionDefinitions = [
    { name: 'verbose', alias: 'v', type: Boolean },
    { name: 'src', type: String, multiple: true, defaultOption: true },
    { name: 'timeout', alias: 't', type: Number }
  ]

  const commandLineArgs = require('command-line-args');
  const options = commandLineArgs(optionDefinitions);
  console.log(options);
}