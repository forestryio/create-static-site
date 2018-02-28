const chokidar = require("chokidar")
const config = require("../../config/static-scripts.config")()
const path = require("path")
const svgSpriteConfig = require("../../config/svg-sprite.config")
const spawnWithLogging = require("../utils/spawnLogging")

const cmdLabel = "SVG Sprite"

const cmdAttrs = [
    // Command
    "$(npm bin)/svg-sprite",
    // options(s)
    "-f", config.svg.src, "-o", config.svg.dest,
    // Arguments
    "--config", JSON.stringify(svgSpriteConfig)
]

const watchCmdAttrs = [
    // option(s)
    config.svg.src,
    // Arguments
    "--command", `"${cmdAttrs.join(" ")}"`,
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

