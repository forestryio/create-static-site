const path = require("path")
const config = require("../../config/static-scripts.config")()
const log = require("../utils/log")
const postcssConfig = path.resolve(__dirname, "../../", "config/postcss.config.js")
const spawnWithLogging = require("../utils/spawnLogging")

const cmdLabel = "PostCSS"

const cmdAttrs = [
    // Commands
    "$(npm bin)/postcss",
    // option(s)
    config.styles.src, "--dir", config.styles.dest,
    // Arguments
    "--config", postcssConfig
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

