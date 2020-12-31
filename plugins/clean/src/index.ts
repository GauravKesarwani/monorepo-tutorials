import Plugin from '@monorepo-tutorials/plugin';
import fs from 'fs-extra';

export interface CleanArgs {
  /** Do not delete node modules */
  excludeModules?:  boolean;
  /** Do not delete dist */
  excludeDist?: boolean;
}

export default class CleanPlugin implements Plugin<CleanArgs> {
  async run (args: CleanArgs = {}) {
    const removeNodeModules = !args.excludeModules;
    const removeDist = !args.excludeDist;

    // if run at root clean the node modules from each package else
    // clean for single package.

    //const isRoot = process.cwd() === getMonoRepoRoot();

    if (removeNodeModules) {
      // add a logger here
      await fs.remove('node_modules');
    }

    if (removeDist) {
      // add a logger here
      await fs.remove('dist');
    }
  }  
}