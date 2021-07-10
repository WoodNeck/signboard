import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SignBoard from "../components/SignBoard";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}>
      <header className="hero">
        <div className="container is-flex is-flex-direction-column is-align-items-center">
          <div className="demo-title-wrapper my-6">
            <SignBoard className="demo-title" src="signboard" contentType="text" objectFit="contain" textOptions={{ font: "96pt Fredoka One", fillStyle: "black" }} tileSize={4} initOnFontLoad={true} />
          </div>
          <div className="container demo-canvas-wrapper">
            <SignBoard className="demo-subtitle" src={siteConfig.tagline} contentType="text" objectFit="cover" scrollSpeed={0.3} textPadding={[0, 100, 0, 0]} textOptions={{ font: "96pt Bungee", fillStyle: "yellow" }} tileSize={16} initOnFontLoad={true} />
          </div>
          <Link
            className="button mt-4"
            to="https://github.com/WoodNeck/signboard">
            <span className="icon is-small mr-2">
              <img src="img/github.svg" />
            </span>
            <span>GitHub</span>
          </Link>
        </div>
      </header>
      <main className="is-flex is-flex-direction-column is-align-items-center mb-6">
        <div className="container">
          <h1 className="main-header">Main Features</h1>
        </div>
        <div className="columns container">
          <div className="column is-4">
            <div className="card m-2">
              <div className="main-features-wrapper card-image">
                <SignBoard className="demo-canvas" src={"img/test2.jpg"} contentType="image" objectFit="cover" />
              </div>
              <div className="card-content has-text-centered">
                <span className="subtitle has-text-dark">Image</span>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="card m-2">
              <div className="main-features-wrapper card-image">
                <SignBoard className="demo-canvas" src={"video/Astronaut.mp4"} contentType="video" objectFit="cover" />
              </div>
              <div className="card-content has-text-centered">
                <span className="subtitle has-text-dark">Video</span>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="card m-2">
              <div className="main-features-wrapper card-image">
                <SignBoard className="demo-canvas" src="Texts with emojis 🥰😼👍 are also available!" contentType="text" objectFit="cover" tileSize={16} scrollSpeed={0.3} textPadding={[5, 15, 8, 15]} />
              </div>
              <div className="card-content has-text-centered">
                <span className="subtitle has-text-dark">Text</span>
              </div>
            </div>
          </div>
        </div>
        <div className="columns container">
          <div className="column is-4">
            <div className="card m-2">
              <div className="main-features-wrapper card-image">
                <SignBoard className="demo-canvas" src="💰🆓" contentType="text" tileSize={4} objectFit="contain" textPadding={[5, 0, 8, 0]} />
              </div>
              <div className="card-content has-text-centered">
                <span className="subtitle has-text-dark">Free for commerical use</span>
                <div><span className="subtitle has-text-dark">License: MIT</span></div>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="card m-2">
              <div className="main-features-wrapper card-image">
                <SignBoard className="demo-canvas" src={"video/Astronaut2.mp4"} contentType="video" objectFit="cover" tileSize={16} dissipation={1.5} bulbSize={2.5} emission={2.5} />
              </div>
              <div className="card-content has-text-centered">
                <span className="subtitle has-text-dark">Customizable</span>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="card m-2">
              <div className="main-features-wrapper card-image">
                <SignBoard className="demo-canvas" src="🎈" contentType="text" objectFit="contain" tileSize={8} textPadding={[24, 0, 24, 0]} />
              </div>
              <div className="card-content has-text-centered">
                <span className="subtitle has-text-dark">Zero Dependencies</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
