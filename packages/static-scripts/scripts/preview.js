#!/usr/bin/env node
const spawn = require("react-dev-utils/crossSpawn")
const gulpArgs = require("./gulpArgs")

const scriptCmd = [
  "cross-env",
  [
    "NODE_ENV=production",
    "GENRATOR_ARGS=preview",
    "gulp",
    ...gulpArgs,
    "server",
  ],
]
spawn.sync(...scriptCmd, { stdio: "inherit" })
