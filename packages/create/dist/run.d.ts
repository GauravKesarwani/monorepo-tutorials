export interface Template {
    /** The name of the template */
    name: string;
    /** URL to the github repository that contains the template */
    url: string;
    /** A short description of what the template does */
    description: string;
    /** The commit sha of the version to clone */
    sha: string;
}
export interface TemplateOptions {
    /** The name of the package */
    name: string;
    /** The package author's name */
    authorName: string;
    /** The package author's email */
    authorEmail: string;
    /** Version of the package to create */
    version: string;
    /** A url to where the repo is stored */
    repoUrl: string;
    /** The name of the monorepo */
    monorepoName: string;
}
export interface CreateSystemArgs {
    /** The name of the thing to create */
    name?: string;
    /** Ignore if a directory already exists */
    force?: boolean;
    /** The GitHub repo to pull the template from */
    template?: string;
    /** List available templates */
    listTemplates?: boolean;
    /** directory to create system */
    destination?: string;
    /** A list of user configured templates for the command */
    templates?: Template[];
    /** The create system sub-command */
    _command: ['create', 'system'];
    /** Create the system in the CWD */
    cwd?: boolean;
    /** Repository url for the new repo */
    repo?: string;
}
/** A plugin to create a completely new system or a package in a system */
export default function run(args: CreateSystemArgs): Promise<void>;
//# sourceMappingURL=run.d.ts.map