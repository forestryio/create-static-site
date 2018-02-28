const path = require("path")
const config = require("../../config/static-scripts.config")()
const {isNullOrUndefined} = require("util")
const spawnWithLogging = require("../utils/spawnLogging")

const argsType = process.env.GENERATOR_ARGS || process.env.NODE_ENV || "development"
const args = config.args.default

if (argsType.indexOf(',') > -1) {
  argsType.split(',').forEach((type) => {
    
    if (!isNullOrUndefined(config.args[type])) {
      args.concat(config.args[type])
    }
  })
}

const cmdAttrs = [config.command]
  .concat(args)

const cmd = cmdAttrs.join(" ")

module.exports = () => {
    spawnWithLogging(cmd, config.generator)
}

