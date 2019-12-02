// See https://webglfundamentals.org/webgl/lessons/webgl-text-texture.html
import Entity from "./Entity";
import { TextProps } from "../types";
import * as DEFAULT from "../constant/defaults";

export default class Text extends Entity {
  private _props: TextProps;

  constructor(props: TextProps) {
    super(props);

    this._props = Object.assign({...DEFAULT.TEXT_PROPS}, props);
  }

  render() {

  }
}
