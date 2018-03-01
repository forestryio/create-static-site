const path = require("path")
const config = require("../../config/static-scripts.config")()
const spawnWithLogging = require("../utils/spawnLogging")

const cmdLabel = "ImageMin"

const cmdAttrs = [
    // Command
    "$(npm bin)/imagemin-power",
    config.images.src,
    // option(s)
    "-rv",
    "-o", config.images.dest
    // Arguments
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
    return spawnWithLogging(cmd, cmdLabel)
}

module.exports.watch = () => {
    return spawnWithLogging(watchCmd, cmdLabel)
}

