#!/usr/bin/env node
const paths = require("../config/paths")
const spawn = require("react-dev-utils/crossSpawn")

// Todo: Extract
const gulpArgs = ["--gulpfile", paths.gulpConfig, "--cwd", paths.appPath]

const scriptCmd = [
  "cross-env",
  ["NODE_ENV=production", "gulp", ...gulpArgs, "build"],
]

spawn.sync(...scriptCmd, { stdio: "inherit" })
