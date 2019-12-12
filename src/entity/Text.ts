// See https://webglfundamentals.org/webgl/lessons/webgl-text-texture.html
import Entity from "./Entity";
import * as DEFAULT from "../constant/default";
import { TextProps } from "../type/external";
import { EntityRenderingContext } from "../type/internal";

export default class Text extends Entity {
  private _props: TextProps;

  constructor(props: TextProps) {
    super(props);

    this._props = Object.assign({...DEFAULT.TEXT_PROPS}, props);
  }

  public render(ctx: EntityRenderingContext) {
    const { context2D, preserve } = ctx;
    const props = this._props;

    preserve(["font", "textAlign", "textBaseline", "direction"], () => {
      context2D.font = props.font;
      context2D.fillStyle = props.fillStyle;
      context2D.strokeStyle = props.strokeStyle;
      context2D.textAlign = props.align;
      context2D.textBaseline = props.baseline;
      context2D.direction = props.direction;

      const draw = props.stroke
        ? context2D.strokeText
        : context2D.fillText;

      draw.call(context2D, props.text, props.position[0], props.position[1], props.maxWidth);
    });
  }
}
