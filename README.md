[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)

# Create Static Site

Create static websites with no build configuration.

## Overview
```
npx create-static-site my-site --template hugo
cd my-site
npm start
```

*([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher)*

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>

## Creating a Static Site

**You’ll need to have Node >= 6 on your local development machine**. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

To create a new app, run:

```sh
npx create-static-site my-site --template [template]
```

Replace `[template]` with either `hugo` or `jekyll`.

It will create a directory called `my-site` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-site
├── LICENSE
├── node_modules
├── package.json
├── README.md
├── static-scripts.config.js
├── .browserslistrc
├── .eslintrc.yml
├── .gitignore
├── .postcssrc.js
├── .stylelintrc.yml
├── site/ # Depends on the static site generator
└── src/
    ├── css/
    │   ├── styles.css
    │   └── imports
    │       └── resets.css
    ├── img/
    │   └── svg/
    │       ├── bitbucket.svg
    │       ├── github.svg
    │       └── gitlab.svg
    └── js/
        ├── scripts.js
        └── imports/
            └── index.js
```

No configuration or complicated folder structures, just the files you need to build your site.<br>
Once the installation is done, you can open your project folder:

```sh
cd my-site
```

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>

### `npm build` or `yarn build`

Builds the site for production to the `dist` folder.<br>

## Philosophy

* **One Dependency:** There is just one build dependency. It uses Webpack, Babel, ESLint, PostCSS, and other amazing projects, but provides a cohesive curated experience on top of them.

* **No Configuration Required:** You don't need to configure anything. Reasonably good configuration of both development and production builds is handled for you so you can focus on writing code.

* **No Lock-In:** You can “eject” to a custom setup at any time. Run a single command, and all the configuration and build dependencies will be moved directly into your project, so you can pick up right where you left off.

## What's Included?

Your environment will have everything you need to build a modern static website:
* A Static Site Generator (Jekyll or Hugo)
* Language extras beyond ES6, like object spread operator.
* Autoprefixed CSS
* Hassle-free updates for the above tools with a single dependency.

The tradeoff is that **these tools are preconfigured to work in a specific way**. If your project needs more customization, you can "eject" and customize it, but then you will need to maintain this configuration.

## Static Sites

Static sites are websites built using static, unchanging files. Because the content is static, delivering it to users requires no server processing time. This feature makes static sites incredibly fast and performant.

Static site generators are the modern way of building static sites. They convert simple, text-based content files in static files ready for the web.

They’re fantastic for developers because they are extremely fast, are built to work with version-control, and require little-to-no setup compared to existing monolithic CMS solutions like Wordpress.

Currently, `create-static-site` supports two static site generators:

- [**Jekyll**](https://jekyllrb.com) is the static site generator written in Ruby and created by [GitHub](https://github.com) founder, Tom Preston Werner.
- [**Hugo**](https://gohugo.io) is the static site generator written in GoLang and created by Steve Francia.

## Contributing

We'd love to have your helping hand on `create-static-site`! See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/6855186?v=4" width="100px;"/><br /><sub><b>chrisdmacrae</b></sub>](https://github.com/chrisdmacrae)<br />[💬](#question-chrisdmacrae "Answering Questions") [💻](https://github.com/forestryio/create-static-site/commits?author=chrisdmacrae "Code") [🎨](#design-chrisdmacrae "Design") [📖](https://github.com/forestryio/create-static-site/commits?author=chrisdmacrae "Documentation") [💡](#example-chrisdmacrae "Examples") [🤔](#ideas-chrisdmacrae "Ideas, Planning, & Feedback") [👀](#review-chrisdmacrae "Reviewed Pull Requests") [📢](#talk-chrisdmacrae "Talks") [🔧](#tool-chrisdmacrae "Tools") [✅](#tutorial-chrisdmacrae "Tutorials") | [<img src="https://avatars2.githubusercontent.com/u/824015?v=4" width="100px;"/><br /><sub><b>ncphillips</b></sub>](https://github.com/ncphillips)<br />[💬](#question-ncphillips "Answering Questions") [🐛](https://github.com/forestryio/create-static-site/issues?q=author%3Ancphillips "Bug reports") [💻](https://github.com/forestryio/create-static-site/commits?author=ncphillips "Code") [📖](https://github.com/forestryio/create-static-site/commits?author=ncphillips "Documentation") [💡](#example-ncphillips "Examples") [🤔](#ideas-ncphillips "Ideas, Planning, & Feedback") [🚇](#infra-ncphillips "Infrastructure (Hosting, Build-Tools, etc)") [👀](#review-ncphillips "Reviewed Pull Requests") [📢](#talk-ncphillips "Talks") [⚠️](https://github.com/forestryio/create-static-site/commits?author=ncphillips "Tests") [🔧](#tool-ncphillips "Tools") | [<img src="https://avatars0.githubusercontent.com/u/6154767?v=4" width="100px;"/><br /><sub><b>Bryan Klein</b></sub>](http://bryanklein.com)<br />[💻](https://github.com/forestryio/create-static-site/commits?author=zivbk1 "Code") [🐛](https://github.com/forestryio/create-static-site/issues?q=author%3Azivbk1 "Bug reports") [📖](https://github.com/forestryio/create-static-site/commits?author=zivbk1 "Documentation") [🤔](#ideas-zivbk1 "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/776019?v=4" width="100px;"/><br /><sub><b>Scott Gallant</b></sub>](http://forestry.io)<br />[🐛](https://github.com/forestryio/create-static-site/issues?q=author%3Ascottgallant "Bug reports") [📖](https://github.com/forestryio/create-static-site/commits?author=scottgallant "Documentation") [🤔](#ideas-scottgallant "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Acknowledgements

This project is greatly inspired by the wonderful [create-react-app](https://github.com/facebookincubator/create-react-app/) project.