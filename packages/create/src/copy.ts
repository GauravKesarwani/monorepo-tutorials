import copy from 'copy-template-dir';
import fs from 'fs';

export default async function template(
  source: string,
  output?: string,
  options?: Record<string, string>
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    copy(source, output as string, options, (err: any, createdFiles: any) => {
      if (err) {
        return reject(err);
      }

      createdFiles.forEach((file: any) => {
        const contents = fs.readFileSync(file, { encoding: 'utf8' });
        fs.writeFileSync(
          file,
          contents.replace(/\\{/g, '{').replace(/\\}/g, '}')
        );
      });

      resolve(createdFiles);
    });
  });
}