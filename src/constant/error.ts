export default {
  ELEMENT_NOT_FOUND: (query: string) => `Element with selector ${query} not found.`,
  TYPE_ALLOWED_ONLY: (types: any[]) => `Only type${types.length ? "s" : ""} of ${types.map(type => type.name).join(", ")} ${types.length ? "are" : "is"} allowed.`,
  WEBGL_NOT_AVAILABLE: "WebGLRenderingContext not available.",
  PROGRAM_LINK_FAILED: (log: string) => `Program link failed: ${log}`,
};
