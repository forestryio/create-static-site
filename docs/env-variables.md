---
---
## Environment Variables

| Title | Var | Description | Default |
| -- | -- | -- | -- |
| Generator Arguments | `GENERATOR_ARGS` | Override the arguments used to build the the site, as defined in `static-scripts.config.js`. Useful for defining your own custom build commands using different options| `process.env.NODE_ENV` |
| Generate Sourcemaps | `GENERATE_SOURCEMAPS` | Set whether or not sourcemaps should be generated for JS and CSS in production builds. You may not want this behaviour if you have large bundles, as it's a costly operation. | `true` |