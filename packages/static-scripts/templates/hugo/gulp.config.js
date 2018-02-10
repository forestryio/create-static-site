// Configures gulp build
// See gulpfile.babel.js for build pipeline
const { resolve } = require("path")
const hugo = require("hugo-bin")

module.exports = function(env) {
  return {
    generator: {
      label: "Hugo",
      command: hugo,
      args: {
        default: [
          "-v",
          "--source",
          resolve("site/"),
          "--destination",
          resolve("dist/"),
        ],
        development: [
          "-b",
          "http://localhost:3000",
          "--buildDrafts",
          "--buildFuture",
          "--buildExpired",
        ],
        preview: ["-b", "http://localhost:3000"],
        production: [],
      },
    },
  }
}
