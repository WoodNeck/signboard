import SignBoard from './SignBoard';

import * as Core from "./core";
import * as Texture from "./texture";
import * as Constants from "./const/external";
import { merge } from "./utils";

merge(SignBoard, Core);
merge(SignBoard, Texture);
merge(SignBoard, Constants);

export default SignBoard;
