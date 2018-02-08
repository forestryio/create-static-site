// Configures gulp build
// See gulpfile.babel.js for build pipeline
const { resolve } = require("path")
const hugo = require("hugo-bin")

module.exports = function(env) {
  const dest = "hugo/"
  const build = "dist/"

  return {
    dest: dest,
    generator: {
      label: "Hugo",
      command: hugo,
      args: {
        default: [
          "-v",
          "--source",
          resolve(dest),
          "--destination",
          resolve(build),
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
