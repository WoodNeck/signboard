import * as React from "react";
import SignBoard from "./SignBoard";

class BlackSignBoard extends React.Component<{ src: string }> {
  public render() {
    return <div className="demo-canvas-wrapper">
      <SignBoard {...this.props} />
    </div>
  }
}

export default BlackSignBoard;
