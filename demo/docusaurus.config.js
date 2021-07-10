const lightCodeTheme = require("prism-react-renderer/themes/oceanicNext");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const isDev = process.env.NODE_ENV === "development";

/** @type {import("@docusaurus/types").DocusaurusConfig} */
module.exports = {
  title: "SignBoard",
  tagline: "WebGL-based LED SignBoard effect for image / video / text",
  url: "https://woodneck.github.io",
  baseUrl: isDev ? "/" : "/signboard/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "WoodNeck",
  projectName: "signboard",
  plugins: ["docusaurus-plugin-sass"],
  themeConfig: {
    navbar: {
      title: "SignBoard",
      items: [
        {
          type: "doc",
          docId: "installation",
          position: "left",
          label: "Tutorial",
        },
        {
          type: "doc",
          docId: "options/contentType",
          position: "left",
          label: "Options"
        },
        {
          type: "doc",
          docId: "api/SignBoard",
          position: "left",
          label: "API"
        },
        {
          to: "Image",
          label: "Image",
          position: "left"
        },
        {
          to: "Video",
          label: "Video",
          position: "left"
        },
        {
          to: "Text",
          label: "Text",
          position: "left"
        },
        {
          href: "https://github.com/WoodNeck/signboard",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    logo: {
      alt: 'egjs',
      src: 'img/egjs_white.svg',
      href: 'https://naver.github.io/egjs/'
    },
    footer: {
      style: "light",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} WoodNeck. Built with Docusaurus & Bulma.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/WoodNeck/signboard/edit/master/demo/",
          remarkPlugins: [require("remark-breaks")]
        },
        pages: {
          remarkPlugins: [require("remark-breaks")]
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/common.css"),
            require.resolve("./src/css/bulma-override.sass")
          ]
        },
      },
    ],
  ],
};
