import { app } from 'command-line-application';
import getApplicationDefinition from '@monorepo-tutorials/core';

// Todo: fix any type here.
export async function main() {
  // set the log level

  const config = loadConfig();
  const cli = await getApplicationDefinition(config);

  const args = app(cli);

  console.log(args);
  // const commandName = Array.isArray(args._command)
  //   ? args._command[0]
  //   : args._command;
}

main();