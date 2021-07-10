import * as React from "react";
import VanillaSignBoard from "../../release/latest/signboard.esm";

class SignBoard extends React.Component<{ src: string, className?: string }> {
  protected _instance: any;
  protected _canvas: React.RefObject<HTMLCanvasElement>;
  protected _src: string;

  public get instance() { return this._instance; }

  public constructor(props) {
    super(props);

    this._src = props.src;
    this._canvas = React.createRef();
  }

  public componentWillUnmount() {
    this._instance.destroy();
  }

  public componentDidMount() {
    this._instance = new VanillaSignBoard(this._canvas.current, this._src, {
      ...this.props
    });
  }

  public render() {
    const { className } = this.props;

    return <canvas className={className} ref={this._canvas}></canvas>
  }
}

export default SignBoard;
