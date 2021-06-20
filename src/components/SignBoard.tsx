import * as React from "react";
import VanillaSignBoard from "../../release/latest/dist/signboard.esm";

class SignBoard extends React.Component<{ src: string, contentType: string }> {
  private _instance: any;
  private _canvas: React.RefObject<HTMLCanvasElement>;
  private _src: string;
  private _contentType: string;

  public constructor(props) {
    super(props);

    this._src = props.src;
    this._contentType = props.contentType;
    this._canvas = React.createRef();
  }

  public componentDidMount() {
    this._instance = new VanillaSignBoard(this._canvas.current, this._src, {
      contentType: this._contentType
    });
  }

  public render() {
    const { src, contentType, ...others } = this.props;

    return <canvas {...others} ref={this._canvas}></canvas>
  }
}

export default SignBoard;
