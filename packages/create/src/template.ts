// the templates with github link are stored in json file
import installedTemplates from './templates.json';

interface Template {
    /** The name of the template */
    name: string;
    /** URL to the github repository that contains the template */
    url: string;
    /** A short description of what the template does */
    description: string;
    /** The commit sha of the version to clone */
    sha: string;
}

export const templates: Record<'system', Template[]> = installedTemplates;

export function getTemplate(type: 'system', name: string) {
  const allTemplates = [ ...templates[type] ];
  const template = allTemplates.find(t => t.name === name);

  if (template) {
    return `${template.url}#${template.sha}`;
  }

  return name;
}