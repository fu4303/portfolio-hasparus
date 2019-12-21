/* eslint-disable global-require */

const deployUrl = process.env.DEPLOY_PRIME_URL || "";
const siteUrl =
  deployUrl && !deployUrl.includes("master--")
    ? deployUrl
    : // No trailing slash allowed!
      "https://haspar.us";

module.exports = {
  siteMetadata: {
    title: "haspar.us",
    titleTemplate: "%s — haspar.us",
    author: "Piotr Monwid-Olechnowicz",
    description: "A personal blog, mostly about software engineering",
    social: [
      {
        name: `Twitter`,
        url: `https://twitter.com/hasparus`,
      },
      {
        name: `GitHub`,
        url: `https://github.com/hasparus`,
      },
    ],
    siteUrl,
    htmlAttributes: { lang: "en" },
    // image: "/images/snape.jpg", // Path to your image you placed in the 'static' folder
    twitterUsername: "@hasparus",
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx"],
        commonmark: true,
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1380,
              linkImagesToOriginal: false,
            },
          },
          { resolve: "gatsby-remark-copy-linked-files" },
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              icon:
                '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
            },
          },
          { resolve: "gatsby-remark-smartypants" },
          {
            resolve: "gatsby-remark-vscode",
            options: {
              injectStyles: false,
              colorTheme: "Night Owl (No Italics)",
              extensions: [
                { identifier: "hackwaly.ocaml", version: "0.6.43" },
                { identifier: "sdras.night-owl", version: "1.1.3" },
                { identifier: "2gua.rainbow-brackets", version: "0.0.6" },
                { identifier: "fwcd.kotlin", version: "0.2.10" },
              ],
            },
          },
        ],
        remarkPlugins: [require("remark-slug")],
        defaultLayouts: {
          default: require.resolve("./src/layouts/post.tsx"),
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content/assets`,
        name: `assets`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        allowNamespaces: true,
      },
    },
    {
      resolve: "gatsby-plugin-codegen",
      options: {
        localSchemaFile: "gql-schema.json",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-robots-txt",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "haspar.us",
        short_name: "haspar.us",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#002FF4",
        icon: "src/favicon.png",
      },
    },
  ],
};
