---
---
## Configuration
For all intents and purposes, `create-static-site` is a zero configuration build tool for static sites.

**However**, we acknowledge that many static site generators have widely varying configurations, and may require you to alter the configuration of `create-static-site` slightly to make things work properly.

A limited API is available via `static-scripts.config.js`:

## Options

| Title | Var | Description | Default |
| -- | -- | -- | -- |
| Generator | `generator`, `String` | The name of the generator to display in logs in sdout. | `Generator` |
| Command | `command`, `String` | Specifying the command line command to run your generators builds. | `null` |
| Directories | `directories`, `Object` | Configurable paths for the project | `dist/` |
| Source directory | `directories.src`, `String` | The path where source files should be stored | `src/` |
| Build directory | `directories.build`, `String` | The path where all built assets should be stored | `dist/` |
| Static directory | `directories.static`, `String` | The path where static files should be moved during a build | `dist/` |
| Generator directory | `directories.static`, `String` | The path where the content/configuration of your generator is stored. | `site/` |
| Proxy | `proxy`, `String` | The URL to which the built-in BrowserSync server should proxy instead of running its own server | `false` |
| Args | `args`, `Object` | An object containing arrays of build command arguments. They are selected based on the `GENERATOR_ARGS` [environment variable](./env-variables.md). | [See reference below](#reference) |

### Reference

```
import {resolve} from "path"

module.exports = {
    generator: "GENERATOR_NAME", // e.g, "Hugo"
    command: "GENERATOR_PRIMARY_COMMAND", // e.g, require("hugo-bin"),
    proxy: false,
    args: {
        default: ["--verbose", "--source", resolve("site/"), "--destination", resolve("dist/")],
        develop: ["--baseDir", "http://localhost:3000", "--buildDrafts", "--buildFuture", "--buildExpired"]
        build: [],
        custom: ["--incremental"]
    },
    directories: {
        src: "src/",
        build: "dist/",
        static: "dist/",
        generator: "site/"
    }
}
```