export interface LEDSignboardOptions {
  pixelPitch: number;
  ledSize: number;
  static: boolean;
  width?: number;
  height?: number;
}

export interface EntityProps {
  depth: number;
}

export interface TextProps extends EntityProps {
  text: string;
  font: string;
  position: number[];
  maxWidth?: number;
  stroke: boolean;
  align: CanvasTextAlign;
  baseline: CanvasTextBaseline;
  direction: CanvasDirection;
}
