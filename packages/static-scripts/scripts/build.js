#!/usr/bin/env node
const spawn = require("react-dev-utils/crossSpawn")
const gulpArgs = require("./gulpArgs")

// Todo: Extract

const scriptCmd = [
  "cross-env",
  ["NODE_ENV=production", "gulp", ...gulpArgs, "build"],
]

spawn.sync(...scriptCmd, { stdio: "inherit" })
