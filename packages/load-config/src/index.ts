import { cosmiconfigSync } from 'cosmiconfig';

type FlagTypes =
  | number
  | boolean
  | string
  | string[]
  | number[]
  | boolean[]
  | Schema;

interface Schema {
  [key: string]: FlagTypes;
}

interface LoadConfigOptions {
  cwd?: string;
}

// Load the config file from system
export function loadConfig({ cwd }: LoadConfigOptions = {}): Schema {
  const moduleName = 'ds';

  const explorer = cosmiconfigSync(moduleName, { searchPlaces: [
      'package.json',
      `.${moduleName}rc`,
      `.${moduleName}rc.json`,
      `${moduleName}.config.js`,
      `${moduleName}.config.json`,
    ],

    transform: (result) => {
      console.log(result);

      return result;
    }
  });

  // searches for a configuration file. 
  // This is the synchronous form.
  // Async form returns a promise.
  // if module name is ds then searches for a ds property in 
  // package.json, a .dsrc file in json or yaml syntax 
  // a ds.config.json file
  const results = explorer.search(cwd || process.cwd());

  console.log('cosmi config result', results);
  return results?.config;
}