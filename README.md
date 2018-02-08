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

## Some Thanks

This project is greatly inspired by the wonderful [create-react-app](https://github.com/facebookincubator/create-react-app/) project.
