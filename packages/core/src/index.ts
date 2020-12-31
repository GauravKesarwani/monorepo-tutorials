// Design systems core.

import { Command , MultiCommand } from '@monorepo-tutorials/plugin';

export interface Configuration {
  plugins?: string[]
}

const clean: Command = {
  name: 'clean',
  description: 'Clean command'
};

const build: Command = { 
  name: 'build',
  description: 'Build a package command'
};


/** Return the CLI program definition. */
export default async function getApplicationDefinition(
  config: Configuration = {}
): Promise<MultiCommand> {
  return {
    name: 'ds',
    description: 'A toolbox for creating design systems monorepo',
    commands: [clean, build],
    options: [
      {
        name: 'verbose',
        alias: 'v',
        description: 'Output the debug logs. Debug: -v Trace: -vv',
        type: Boolean,
        multiple: true
      },
      {
        name: 'version',
        description:
          'Print the current version of the current @design-systems/cli',
        type: Boolean
      }
    ]
  };
}