import SignBoardError from "./SignBoardError";
import SignBoard from "../SignBoard";
import * as ERROR from "../const/error";
import { BROWSER } from "../const/event";
import { CONTENT_TYPE } from "../const/external";
import Texture from "../texture/Texture";
import ImageTexture from "../texture/ImageTexture";
import VideoTexture from "../texture/VideoTexture";
import TextTexture from "../texture/TextTexture";
import { Attributes } from "../types";

class TextureLoader {
  private _signboard: SignBoard;

  public constructor(signboard: SignBoard) {
    this._signboard = signboard;
  }

  public async load(): Promise<Texture> {
    const type = this._signboard.contentType;

    switch (type) {
      case CONTENT_TYPE.IMAGE:
        return this._loadImage();
      case CONTENT_TYPE.VIDEO:
        return this._loadVideo();
      case CONTENT_TYPE.TEXT:
        return new TextTexture(this._signboard);
      default:
        throw new SignBoardError(
          ERROR.MESSAGE.WRONG_OPTION(type, "contentType", Object.keys(CONTENT_TYPE).map(key => CONTENT_TYPE[key as keyof typeof CONTENT_TYPE])),
          ERROR.CODE.WRONG_OPTION
        )
    }
  }

  private async _loadImage(): Promise<ImageTexture> {
    const signboard = this._signboard;
    const image = new Image();
    const src = signboard.src;

    return new Promise((resolve, reject) => {
      image.addEventListener(BROWSER.LOAD, () => {
        resolve(new ImageTexture(image));
      });
      image.addEventListener(BROWSER.ERROR, () => {
        reject(new SignBoardError(ERROR.MESSAGE.FAILED_TO_LOAD_IMAGE(src), ERROR.CODE.FAILED_TO_LOAD_IMAGE));
      });

      const attribs = {
        crossOrigin: "anonymous",
        ...signboard.contentAttribs
      } as Attributes<HTMLImageElement>;

      for (const key in attribs) {
        image[key] = attribs[key];
      }

      image.src = src;
    });
  }

  private async _loadVideo(): Promise<VideoTexture> {
    const signboard = this._signboard;
    const video = document.createElement("video");
    const src = signboard.src;

    return new Promise((resolve, reject) => {
      video.addEventListener(BROWSER.LOADED_DATA, () => {
        resolve(new VideoTexture(video));
      });
      video.addEventListener(BROWSER.ERROR, () => {
        reject(new SignBoardError(ERROR.MESSAGE.FAILED_TO_LOAD_IMAGE(src), ERROR.CODE.FAILED_TO_LOAD_IMAGE));
      });

      const attribs = {
        loop: true,
        playsInline: true,
        autoplay: true,
        muted: true,
        crossOrigin: "anonymous",
        ...signboard.contentAttribs
      } as Attributes<HTMLVideoElement>;

      for (const key in attribs) {
        video[key] = attribs[key];
      }

      video.src = src;
    });
  }
}

export default TextureLoader;
