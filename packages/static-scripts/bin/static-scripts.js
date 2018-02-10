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

// CONSOLE OUTPUT MESSAGES
const MESSAGES = {
  SIGKILL: () =>
    "The build failed because the process exited too early. " +
    "This probably means the system ran out of memory or someone called " +
    "`kill -9` on the process.",
  SIGTERM: () =>
    "The build failed because the process exited too early. " +
    "Someone might have called `kill` or `killall`, or the system could " +
    "be shutting down.",
  SIGNULL: () =>
    "The build failed because the process exited too early. " +
    "It is unclear why this happened.",
  UNKNOWN_SCRIPT: script =>
    `Unknown script "${script}".\n` +
    "Perhaps you need to update static-scripts?\n" +
    "See: https://github.com/forestryio/create-static-site/blob/master/packages/static-scripts/template/README.md#updating-to-new-releases",
  HELP: () =>
    "react-scripts \n" +
    "\tavailable scripts are: \n" +
    Object.getOwnPropertyNames(SPAWN_SCRIPTS).map(script => `\t\t${script}\n`),
}

// SCRIPTS
const gulpArgs = [
  "--gulpfile",
  "node_modules/static-scripts/config/gulp.config.js",
  "--cwd",
  ".",
]

const SPAWN_SCRIPTS = {
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
  eject: ["node", [require.resolve("../scripts/eject")]],
}

// HANDLE ARGS & RUN THE SCRIPT
const spawn = require("react-dev-utils/crossSpawn")
const args = process.argv.slice(2)

const scriptIndex = args.findIndex(x => x === "build" || x === "start")
const script = scriptIndex === -1 ? args[0] : args[scriptIndex]

if (!script) {
  console.log(MESSAGES.HELP())
  process.exit(1)
}

const result = runScript(script)

if (result) {
  if (result.signal) {
    const terminationMessage = MESSAGES[result.signal] || MESSAGES.SIGNULL
    console.log(terminationMessage())
    process.exit(1)
  }
  process.exit(result.status)
}

/**
 * runScript(script)
 */
function runScript(script) {
  const scriptCmd = SPAWN_SCRIPTS[script]

  if (!scriptCmd) {
    return console.log(MESSAGES.UNKNOWN_SCRIPT(script))
  }

  return spawn.sync(...scriptCmd, { stdio: "inherit" })
}
