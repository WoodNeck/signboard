import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SignBoard from "../components/SignBoard";

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className="hero">
        <div className="container">
          <h1 className="title">{siteConfig.title}</h1>
          <p className="subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>
        <div className="container demo-canvas-wrapper">
          <SignBoard className="demo-canvas" src={"/video/Astronaut.mp4"} contentType="video" />
        </div>
      </main>
    </Layout>
  );
}
