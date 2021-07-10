import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import loadable from "@loadable/component";

const GUISignBoard = loadable(() => import("../components/GUISignBoard"));

export default function Image() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title="Image"
      description={siteConfig.tagline}>
      <GUISignBoard className="demo-canvas" src={"img/test.jpg"} objectFit="contain" />
      <GUISignBoard className="demo-canvas" src={"https://i.kym-cdn.com/entries/icons/original/000/034/084/cover6.jpg"} />
      <GUISignBoard className="demo-canvas" src={"img/test2.jpg"} objectFit="cover" />
    </Layout>
  )
}


