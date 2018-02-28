const path = require("path")
const config = require("../../config/static-scripts.config")()
const bsConfig = path.resolve(__dirname, "../../", "config/browsersync.config.js")
const spawnWithLogging = require("../utils/spawnLogging")

const cmdLabel = "BrowserSync"

const cmdAttrs = [
    // Command
    "$(npm bin)/browser-sync",
    // option(s)
    "start",
    // Arguments
    "--config", bsConfig
]

const cmd = cmdAttrs.join(" ")

module.exports = () => {
    spawnWithLogging(cmd, cmdLabel)
}
