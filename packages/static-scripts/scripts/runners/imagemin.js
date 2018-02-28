const path = require("path")
const config = require("../../config/static-scripts.config")()
const spawnWithLogging = require("../utils/spawnLogging")

const cmdLabel = "ImageMin"

const cmdAttrs = [
    // Command
    "$(npm bin)/imagemin",
    // option(s)
    config.images.src,
    // Arguments
    "--out-dir", config.images.dest
]

const watchCmdAttrs = [
    // Command
    "chokidar",
    // option(s)
    config.images.src,
    // Arguments
    "--command", `'${cmdAttrs.join(" ")}'`,
    "--debounce", 1000,
    "--throttle", 1000,
    "--initial" 
]

const cmd = cmdAttrs.join(" ")
const watchCmd = watchCmdAttrs.join(" ")

module.exports = () => {
    spawnWithLogging(cmd, cmdLabel)
}

module.exports.watch = () => {
    spawnWithLogging(watchCmd, cmdLabel)
}

