import { Command as AppComm, MultiCommand as AppMultiCommand, Option as AppOption } from 'command-line-application';
import { Overwrite } from 'utility-types';
export declare type Option = AppOption & {
    config?: boolean;
};
interface Configurable {
    /** Options for the @design-systems/cli */
    options?: Option[];
}
export declare type Command = Overwrite<AppComm, Configurable>;
export declare type MultiCommand = Overwrite<Overwrite<AppMultiCommand, Configurable>, {
    /** Commands for the @design-systems/cli multi command */
    commands: CliCommand[];
}>;
/** Register a command with the cli */
export declare type CliCommand = Command | MultiCommand;
export {};
//# sourceMappingURL=init.d.ts.map