import * as React from "react";
import * as dat from "dat.gui";
import SignBoard from "./SignBoard";
import { OBJECT_FIT } from "../../release/latest/signboard.esm";

class GUISignBoard extends SignBoard {
  private _wrapper: React.RefObject<HTMLDivElement>;

  public constructor(props) {
    super(props);

    this._wrapper = React.createRef();
  }

  public componentDidMount() {
    super.componentDidMount();

    const signboard = this._instance;

    const gui = new dat.GUI({ name: "Controls", autoPlace: false }) as any;
    gui.add(signboard, "objectFit", OBJECT_FIT);
    gui.add(signboard, "frameRate", 1, 128, 1);
    gui.add(signboard, "tileSize", 1, 64, 1);
    gui.add(signboard, "emission", 0.1, 5, 0.01);
    gui.add(signboard, "dissipation", 0.1, 2, 0.01);
    gui.add(signboard, "bulbSize", 0.1, 2.5, 0.01);
    gui.add(signboard, "scrollSpeed", -2.5, 2.5, 0.01);

    if ((this.props as any).showTextPadding) {
      const padding = {
        "textPadding-top": signboard.textPadding[0],
        "textPadding-right": signboard.textPadding[1],
        "textPadding-btm": signboard.textPadding[2],
        "textPadding-left": signboard.textPadding[3]
      };

      Object.keys(padding).forEach((key, idx) => {
        gui.add(padding, key, 0, 100, 1).onChange(() => {
          const newPadding = [...signboard.textPadding];
          newPadding.splice(idx, 1, padding[key]);
          signboard.textPadding = newPadding;
        });
      });
    }

    const textOptions = (this.props as any).textOptions ?? {};
    Object.keys(textOptions).forEach(key => {
      gui.add(signboard.textOptions, key, ...textOptions[key])
      .onChange(() => {
        signboard.textOptions = signboard.textOptions;
      });
    });

    gui.domElement.classList.add("playground-controls");
    this._wrapper.current.appendChild(gui.domElement);
  }

  public render() {
    const { className } = this.props;

    return <div className="container playground-canvas-wrapper mb-4" ref={this._wrapper}>
      <canvas className={className} ref={this._canvas}></canvas>
    </div>;
  }
}

export default GUISignBoard;
