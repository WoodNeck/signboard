/**
 * A constant for the {@link SignBoard#contentType contentType} option
 * @type {object}
 * @property {string} IMAGE "image"
 * @property {string} VIDEO "video"
 * @property {string} TEXT "text"
 * @example
 * ```ts
 * import { CONTENT_TYPE } from "signboard";
 * ```
 */
export const CONTENT_TYPE = {
  IMAGE: "image",
  VIDEO: "video",
  TEXT: "text"
} as const;

/**
 * A constant for the {@link SignBoard#objectFit objectFit} option
 * @type {object}
 * @property {string} FILL "fill"
 * @property {string} CONTAIN "contain"
 * @property {string} COVER "cover"
 * @property {string} NONE "none"
 * @property {string} SCALE_DOWN "scale-down"
 * @example
 * ```ts
 * import { OBJECT_FIT } from "signboard";
 * ```
 */
export const OBJECT_FIT = {
  FILL: "fill",
  CONTAIN: "contain",
  COVER: "cover",
  NONE: "none",
  SCALE_DOWN: "scale-down"
} as const;
