import * as DEFAULT from "../constant/default";
import { EntityProps } from "../type/external";
import { EntityRenderingContext } from "../type/internal";

export default abstract class Entity {
  private _depth: number;

  get depth() { return this._depth; }

  constructor(props: Partial<EntityProps>) {
    const mergedProps = Object.assign({...DEFAULT.ENTITY_PROPS}, props);

    this._depth = mergedProps.depth;
  }

  public abstract render(ctx: EntityRenderingContext): void;
}
