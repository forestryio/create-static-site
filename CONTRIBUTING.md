# Contributing to Create Static Site 

Like what you see and want to help out?

Thanks! There are plenty of ways you can help.

Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue or assessing patches and features.

## Core Ideas

Todo: Provide a clearer vision for the project.

## Submitting a Pull Request

Good pull requests, such as patches, improvements, and new features, are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

Please ask first if somebody else is already working on this or the core developers think your feature is in-scope for Create Static Site. Generally always have a related issue with discussions for whatever you are including.

Please also provide a test plan, i.e. specify how you verified that your addition works.

## Folder Structure of Create Static Site
`create-static-site` is a monorepo, meaning it is divided into independent sub-packages.<br>
These packages can be found in the [`packages/`](https://github.com/forestryio/create-static-site/tree/master/packages) directory.

### Overview of directory structure
```
packages/
  create-static-site/
  static-scripts/
```
### Package Descriptions
#### [create-static-site](https://github.com/forestryio/create-static-site/tree/master/packages/create-static-site)
The global CLI command code can be found in this directory, and shouldn't often be changed. It should run on Node 0.10+.
#### [static-scripts](https://github.com/forestryio/create-static-site/tree/master/packages/static-scripts)
This package is the heart of the project, which contains the scripts for setting up the development server, building production builds, configuring all software used, etc.<br>

## Setting Up a Local Copy

1. Clone the repo with `git clone https://github.com/forestryio/create-static-site`

2. Run `npm install` in the root `create-static-site` folder.

If you want to try out the end-to-end flow with the global CLI, you can do this too:

```
npm run create-static-site my-app
cd my-app
```

## Cutting a Release

1. Tag all merged pull requests that go into the release with the relevant milestone. Each merged PR should also be labeled with one of the [labels](https://github.com/forestryio/create-static-site/labels) named `tag: ...` to indicate what kind of change it is.
2. Close the milestone.
3. Note that files in `packages/create-static-site` should be modified with extreme caution. Since it’s a global CLI, any version of `create-static-site` (global CLI) including very old ones should work with the latest version of `static-scripts`.
4. Create a change log entry for the release:
  * You'll need an [access token for the GitHub API](https://help.github.com/articles/creating-an-access-token-for-command-line-use/). Save it to this environment variable: `export GITHUB_AUTH="..."`
  * Run `npm run changelog`. The command will find all the labeled pull requests merged since the last release and group them by the label and affected packages, and create a change log entry with all the changes and links to PRs and their authors. Copy and paste it to `CHANGELOG.md`.
  * Add a four-space indented paragraph after each non-trivial list item, explaining what changed and why. For each breaking change also write who it affects and instructions for migrating existing code.
  * Maybe add some newlines here and there. Preview the result on GitHub to get a feel for it. Changelog generator output is a bit too terse for my taste, so try to make it visually pleasing and well grouped.
5. Make sure to include “Migrating from ...” instructions for the previous release. Often you can copy and paste them.
6. **Do not run `npm publish`. Instead, run `npm run publish`.**
7. Wait for a long time, and it will get published. Don’t worry that it’s stuck. In the end the publish script will prompt for versions before publishing the packages.
8. After publishing, create a GitHub Release with the same text as the changelog entry. See previous Releases for inspiration.

Make sure to test the released version! If you want to be extra careful, you can publish a prerelease by running `npm run publish -- --tag next` instead of `npm run publish`.
