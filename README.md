[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
<a href="https://zenhub.com"><img src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"></a>
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# Create Static Site

Create a new Static Site with zero build configuration.

## Getting Started

Install `create-static-site`:

```bash
npm install -g create-static-site
```

Create your new package

```bash
create-static-site my-site --template=hugo
```

A new directory will be created with the following contents:

```
my-site/
  # TODO
```

The latest version of `static-scripts` will be installed and added to the `devDependencies` in your `package.json`.

## Philosophy

* **One Dependency:** There is just one build dependency. It uses Webpack, Babel, ESLint, PostCSS, and other amazing projects, but provides a cohesive curated experience on top of them.

* **No Configuration Required:** You don't need to configure anything. Reasonably good configuration of both development and production builds is handled for you so you can focus on writing code.

* **No Lock-In:** You can “eject” to a custom setup at any time. Run a single command, and all the configuration and build dependencies will be moved directly into your project, so you can pick up right where you left off.

## What's Included?

Your environment will have everything you need to build a modern static website:
* A Static Site Generator (Jekyll or Hugo)
* Language extras beyond ES6, like object spread operator.
* Autoprefixed CSS

The tradeoff is that **these tools are preconfigured to work in a specific way**. If your project needs more customization, you can "eject" and customize it, but then you will need to maintain this configuration.

## Some Thanks

This project is greatly inspired by the wonderful [create-react-app](https://github.com/facebookincubator/create-react-app/) project.
