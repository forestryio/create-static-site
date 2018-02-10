#!/usr/bin/env node
const spawn = require("react-dev-utils/crossSpawn")
const gulpArgs = require("./gulpArgs")

const scriptCmd = ["gulp", [...gulpArgs, "server"]]

spawn.sync(...scriptCmd, { stdio: "inherit" })
