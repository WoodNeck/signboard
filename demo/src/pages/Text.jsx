import React, { useRef } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import loadable from "@loadable/component";

const GUISignBoard = loadable(() => import("../components/GUISignBoard"));

export default function Text() {
  const defaultText = "Text? 텍스트! 💤😀🐈★∑";
  const {siteConfig} = useDocusaurusContext();
  const signBoardRef = useRef();

  return (
    <Layout
      title="Text"
      description={siteConfig.tagline}>
      <GUISignBoard ref={signBoardRef} className="demo-canvas" src={defaultText} textOptions={{
        "font": [],
        "fillStyle": [],
      }} showTextPadding={true} contentType="text" objectFit="cover" scrollSpeed={0.3} textPadding={[5, 15, 8, 15]} textOptions={{ font: "32pt serif", fillStyle: "white" }} />

      <div className="container">
        <input className="input is-primary" type="text" defaultValue={defaultText} onChange={e => {
          const text = e.currentTarget.value;
          const signboard = signBoardRef.current.instance;

          signboard.update(text);
        }} />
      </div>
    </Layout>
  )
}
