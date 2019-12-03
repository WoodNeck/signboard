import { LEDSignboardOptions, EntityProps, TextProps } from "../type/external";

export const LED_OPTIONS: LEDSignboardOptions = {
  pixelPitch: 3,
  ledSize: 1,
  static: false,
};

export const ENTITY_PROPS: EntityProps = {
  depth: 0,
};

export const TEXT_PROPS: TextProps = {
  ...ENTITY_PROPS,
  text: "",
  position: [0, 0],
  // maxWidth's default is "undefined"
  stroke: false,
  font: "16px serif",
  align: "start",
  baseline: "alphabetic",
  direction: "inherit",
};
