import { Command as AppComm, MultiCommand as AppMultiComm, Option as AppOption } from 'command-line-application';
import { Overwrite } from 'utility-types';

export type Option = AppOption & {
  config?: boolean;
};

interface Configurable {
  /** Options for the @design-systems/cli */
  options?: Option[];
}

export type Command = Overwrite<AppComm, Configurable>;

export type MultiCommand = Overwrite<AppMultiComm, Configurable>;

export interface Plugin<T = unknown> {
  // Run when the user inputs the registered command
  run(args: T): Promise<void>;
}