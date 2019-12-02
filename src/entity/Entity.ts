import { EntityProps } from "../types";
import * as DEFAULT from "../constant/defaults";

export default abstract class Entity {
  private _depth: number;

  get depth() { return this._depth; }

  constructor(props: Partial<EntityProps>) {
    const mergedProps = Object.assign({...DEFAULT.ENTITY_PROPS}, props);

    this._depth = mergedProps.depth;
  }

  public abstract render(): void;
}
