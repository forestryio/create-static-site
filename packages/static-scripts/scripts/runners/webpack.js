const path = require("path")
const config = require("../../config/static-scripts.config")()
const spawnWithLogging = require("../utils/spawnLogging")
const webpackConfig = process.env.NODE_ENV === "production"
 ? path.resolve(__dirname, "../../", "config/webpack.config.prod.js")
 : path.resolve(__dirname, "../../", "config/webpack.config.dev.js")

const cmdLabel = "Webpack"

const cmdAttrs = [
    // The command
    "$(npm bin)/webpack",
    // Arguments
    "--config", webpackConfig
]

const watchCmdAttrs = cmdAttrs.concat([
    "--watch"
])

const cmd = cmdAttrs.join(" ")
const watchCmd = watchCmdAttrs.join(" ")

module.exports = () => {
    spawnWithLogging(cmd, cmdLabel)
}

module.exports.watch = () => {
    spawnWithLogging(watchCmd, cmdLabel)
}
