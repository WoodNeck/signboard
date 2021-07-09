import SignBoardError from "./SignBoardError";
import { SignBoardOptions } from "../SignBoard";
import * as ERROR from "../const/error";
import { BROWSER } from "../const/event";
import { CONTENT_TYPE } from "../const/external";
import Texture from "../texture/Texture";
import ImageTexture from "../texture/ImageTexture";
import VideoTexture from "../texture/VideoTexture";
import { Attributes } from "../types";

class TextureLoader {
  private _src: string;
  private _type: SignBoardOptions["contentType"];
  private _attribs: SignBoardOptions["contentAttribs"];

  public constructor(src: string, type: SignBoardOptions["contentType"], attribs: SignBoardOptions["contentAttribs"]) {
    this._src = src;
    this._type = type;
    this._attribs = attribs;
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

      const attribs = {
        crossOrigin: "anonymous",
        ...this._attribs
      } as Attributes<HTMLImageElement>;

      for (const key in attribs) {
        (image as any)[key] = (attribs as any)[key];
      }

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

      const attribs = {
        loop: true,
        playsInline: true,
        autoplay: true,
        crossOrigin: "anonymous",
        ...this._attribs
      } as Attributes<HTMLVideoElement>;

      for (const key in attribs) {
        (video as any)[key] = (attribs as any)[key];
      }

      video.src = src;
    });
  }
}

export default TextureLoader;
