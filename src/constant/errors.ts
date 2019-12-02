export const ELEMENT_NOT_FOUND = (query: string) => `Element with selector ${query} not found.`;
export const TYPE_ALLOWED_ONLY = (types: any[]) => `Only type${types.length ? "s" : ""} of ${types.map(type => type.name).join(", ")} ${types.length ? "are" : "is"} allowed.`;
export const WEBGL_NOT_AVAILABLE = "WebGLRenderingContext not available.";
