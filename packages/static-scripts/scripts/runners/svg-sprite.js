const chokidar = require("chokidar")
const config = require("../../config/static-scripts.config")()
const path = require("path")
const svgSpriteConfig = path.resolve(__dirname, "../../config/svg-sprite.config.json")
const spawnWithLogging = require("../utils/spawnLogging")

const cmdLabel = "SVG Sprite"

const cmdAttrs = [
    // Command
    "$(npm bin)/svg-sprite",
    // options(s)
    "-f", config.svg.src, "-o", config.svg.dest,
    // Arguments
    "--sprite",
    "--sprite-dest", config.svg.dest,
    "--symbol-prefix", "svg-%s",
    "--symbol-example-dest", config.svg.dest,
    "--verbose"
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
    return spawnWithLogging(cmd, cmdLabel)
}

module.exports.watch = () => {
    return spawnWithLogging(watchCmd, cmdLabel)
}

