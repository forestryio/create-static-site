[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
<a href="https://zenhub.com"><img src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"></a>
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# Create Typescript Package

Create a new Typescript package with zero build configuration.

## Getting Started

Install `create-typescript-package`:

```bash
npm install -g create-typescript-package
```

Create your new package

```bash
create-typescript-package my-pkg
```

A new directory will be created with the following contents:

```
my-pkg/
  package.json
  .gitignore
  src/
    index.ts
    bar.ts
```

The latest version of `typescript` and `static-scripts` will be installed and added to the `deveDependencies` in your `package.json`.

## Scripts

**Build**

```bash
npm run build
```

The built project will be output to `build/my-pkg.js`.

All `dependencies` will be bundled with your code.

All `peerDependencies` will not be bundled.

**Publish**

```bash
npm publish
```

Doing so will build the package and publish it to NPM. 

## Some Thanks

This project is greatly inspired by the wonderful [create-react-app](https://github.com/facebookincubator/create-react-app/) project.
