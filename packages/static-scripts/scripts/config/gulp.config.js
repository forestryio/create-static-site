const path = require("path")
const PROJECT = "../../../.."
const gulpFilePath = path.resolve(__dirname, PROJECT, "./gulp.config.js")
const GulpConfig = require(gulpFilePath)

// Todo: Create sane defaults
module.exports = function(env) {
  let config = GulpConfig(env)

  return config
}
