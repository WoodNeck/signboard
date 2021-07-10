import React from "react";
import SignBoard from "./SignBoard";

class AutoInitDemo extends React.Component<{ src: string }> {
  private _signboardRef: React.RefObject<SignBoard>;

  public constructor(props) {
    super(props);

    this._signboardRef = React.createRef();
  }

  public render() {
    return <div>
      <div className="demo-canvas-wrapper">
        <SignBoard ref={this._signboardRef} className="options-canvas" autoInit={false} {...this.props} />
      </div>
      <span className="button" style={{ width: "100%" }} onClick={e => {
        this._signboardRef.current.instance.init();
      }}>Call Init()</span>
    </div>
  }
}

export default AutoInitDemo;
