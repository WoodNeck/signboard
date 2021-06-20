import SignBoardError from "./SignBoardError";
import * as ERROR from "../const/error";
import { BROWSER } from "../const/event";
import { CONTENT_TYPE } from "../const/external";
import { ValueOf } from "../types";
import Texture from "../texture/Texture";
import ImageTexture from "../texture/ImageTexture";
import VideoTexture from "../texture/VideoTexture";

class TextureLoader {
  private _src: string;
  private _type: ValueOf<typeof CONTENT_TYPE>;

  public constructor(src: string, type: ValueOf<typeof CONTENT_TYPE>) {
    this._src = src;
    this._type = type;
  }

  public async load(): Promise<Texture> {
    switch (this._type) {
      case CONTENT_TYPE.IMAGE:
        return this._loadImage();
      case CONTENT_TYPE.VIDEO:
        return this._loadVideo();
    }
  }

  private async _loadImage(): Promise<ImageTexture> {
    const image = new Image();
    const src = this._src;

    return new Promise((resolve, reject) => {
      image.addEventListener(BROWSER.LOAD, () => {
        resolve(new ImageTexture(image));
      });
      image.addEventListener(BROWSER.ERROR, () => {
        reject(new SignBoardError(ERROR.MESSAGE.FAILED_TO_LOAD_IMAGE(src), ERROR.CODE.FAILED_TO_LOAD_IMAGE));
      });

      image.crossOrigin = "anonymous";
      image.src = src;
    });
  }

  private async _loadVideo(): Promise<VideoTexture> {
    const video = document.createElement("video");
    const src = this._src;

    return new Promise((resolve, reject) => {
      video.addEventListener(BROWSER.LOADED_DATA, () => {
        resolve(new VideoTexture(video));
      });
      video.addEventListener(BROWSER.ERROR, () => {
        reject(new SignBoardError(ERROR.MESSAGE.FAILED_TO_LOAD_IMAGE(src), ERROR.CODE.FAILED_TO_LOAD_IMAGE));
      });

      video.loop = true;
      video.playsInline = true;
      video.crossOrigin = "anonymous";
      video.src = src;
      video.load();
    });
  }
}

export default TextureLoader;
