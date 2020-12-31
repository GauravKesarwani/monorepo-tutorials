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
export declare const templates: Record<'system', Template[]>;
export declare function getTemplate(type: 'system', name: string): string;
export {};
//# sourceMappingURL=template.d.ts.map