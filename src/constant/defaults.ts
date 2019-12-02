import { LEDSignboardOptions, EntityProps, TextProps } from "../types";

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
  font: "16px serif",
  position: [0, 0],
  stroke: false,
  align: "start",
  baseline: "alphabetic",
  direction: "inherit",
};
