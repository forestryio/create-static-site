#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err
})

const spawn = require("react-dev-utils/crossSpawn")
const args = process.argv.slice(2)

const scriptIndex = args.findIndex(x => x === "build" || x === "start")
const script = scriptIndex === -1 ? args[0] : args[scriptIndex]
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []
const uhh = {
  result: null,
}

const gulpArgs = [
  "--gulpfile",
  "node_modules/static-scripts/scripts/gulpFile.js",
  "--cwd",
  ".",
]
const scripts = {
  start: ["gulp", [...gulpArgs, "server"]],
  preview: [
    "cross-env",
    [
      "NODE_ENV=production",
      "GENRATOR_ARGS=preview",
      "gulp",
      ...gulpArgs,
      "server",
    ],
  ],
  build: ["cross-env", ["NODE_ENV=production", "gulp", ...gulpArgs, "build"]],
}

switch (script) {
  case "build":
  case "preview":
  case "start":
    uhh.result = spawn.sync(...scripts[script], { stdio: "inherit" })
    break
  case "eject":
  default:
    console.log('Unknown script "' + script + '".')
    console.log("Perhaps you need to update static-scripts?")
    console.log(
      "See: https://github.com/forestryio/create-static-site/blob/master/packages/static-scripts/template/README.md#updating-to-new-releases"
    )
    break
}

if (uhh.result) {
  if (uhh.result.signal) {
    if (uhh.result.signal === "SIGKILL") {
      console.log(
        "The build failed because the process exited too early. " +
          "This probably means the system ran out of memory or someone called " +
          "`kill -9` on the process."
      )
    } else if (uhh.result.signal === "SIGTERM") {
      console.log(
        "The build failed because the process exited too early. " +
          "Someone might have called `kill` or `killall`, or the system could " +
          "be shutting down."
      )
    }
    process.exit(1)
  }
  process.exit(uhh.result.status)
}
