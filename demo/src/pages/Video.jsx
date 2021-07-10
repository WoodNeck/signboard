import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import loadable from "@loadable/component";

const GUISignBoard = loadable(() => import("../components/GUISignBoard"));

export default function Video() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title="Video"
      description={siteConfig.tagline}>
      <GUISignBoard className="demo-canvas" src={"video/Astronaut.mp4"} contentType="video" />
      <GUISignBoard className="demo-canvas" src={"video/Astronaut2.mp4"} contentType="video" />
    </Layout>
  )
}
