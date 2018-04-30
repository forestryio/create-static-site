// @remove-file-on-eject
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict"

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err
})

const fs = require("fs-extra")
const path = require("path")
const chalk = require("chalk")
const spawn = require("react-dev-utils/crossSpawn")

module.exports = function(
  appPath,
  appName,
  verbose,
  originalDirectory,
  template
) {
  try {
    const ownPackageName = require(path.join(__dirname, "..", "package.json"))
      .name
    const ownPath = path.join(appPath, "node_modules", ownPackageName)
    const templatePath = path.join(ownPath, "templates", template)
    const templatePackage = require(path.join(templatePath, "package.json"))
    const appPackage = require(path.join(appPath, "package.json"))
    const useYarn = fs.existsSync(path.join(appPath, "yarn.lock"))

    appPackage = addTemplateDepsToPackage(templatePackage, appPackage)
    appPackage = addStaticScriptsToPackage(appPackage)
    copyTemplateToApp(templatePath, appPath)
    writeAppPackage(appPath, appPackage)
    const readmeExists = renameExistingReadme(appPath)
    setupGitIgnore(appPath)

    let command
    let args

    if (useYarn) {
      command = "yarnpkg"
      args = ["add"]
    } else {
      command = "npm"
      args = ["install", "--save", verbose && "--verbose"].filter(e => e)
    }
    // args.push("typescript") // TODO: Other deps

    // Install additional template dependencies, if present
    const templateDependenciesPath = path.join(
      appPath,
      ".template.dependencies.json"
    )
    if (fs.existsSync(templateDependenciesPath)) {
      const templateDependencies = require(templateDependenciesPath)
        .dependencies
      args = args.concat(
        Object.keys(templateDependencies).map(key => {
          return `${key}@${templateDependencies[key]}`
        })
      )
      fs.unlinkSync(templateDependenciesPath)
    }

    // Install react and react-dom for backward compatibility with old CRA cli
    // which doesn't install react and react-dom along with react-scripts
    // or template is presetend (via --internal-testing-template)
    if (template && args.length > 1) {
      console.log(`Installing dependencies using ${command}...`)
      console.log()

      const proc = spawn.sync(command, args, { stdio: "inherit" })
      if (proc.status !== 0) {
        console.error(`\`${command} ${args.join(" ")}\` failed`)
        return
      }
    }

    // Display the most elegant way to cd.
    // This needs to handle an undefined originalDirectory for
    // backward compatibility with old global-cli's.
    let cdpath
    if (
      originalDirectory &&
      path.join(originalDirectory, appName) === appPath
    ) {
      cdpath = appName
    } else {
      cdpath = appPath
    }

    // Change displayed command to yarn instead of yarnpkg
    const displayedCommand = useYarn ? "yarn" : "npm"

    console.log()
    console.log(`Success! Created ${appName} at ${appPath}`)
    console.log("Inside that directory, you can run several commands:")
    console.log()
    console.log(
      chalk.cyan(`  ${displayedCommand} ${useYarn ? "" : "run "}start`)
    )
    console.log(
      "    Starts a local server so you can develop your site with ease."
    )
    console.log()
    console.log(
      chalk.cyan(`  ${displayedCommand} ${useYarn ? "" : "run "}build`)
    )
    console.log("    Bundles the app into static files for production.")
    console.log()
    console.log(
      chalk.cyan(`  ${displayedCommand} ${useYarn ? "" : "run "}eject`)
    )
    console.log(
      "    Removes this tool and copies build dependencies, configuration files"
    )
    console.log(
      "    and scripts into the app directory. If you do this, you can’t go back!"
    )
    console.log()
    console.log(chalk.cyan(`  ${displayedCommand} test`))
    console.log("    COMING SOON: Starts the test runner.")
    console.log()
    console.log("We suggest that you begin by typing:")
    console.log()
    console.log(chalk.cyan("  cd"), cdpath)
    console.log(
      chalk.cyan(`  ${displayedCommand} ${useYarn ? "" : "run "}start`)
    )
    if (readmeExists) {
      console.log()
      console.log(
        chalk.yellow(
          "You had a `README.md` file, we renamed it to `README.old.md`"
        )
      )
    }
    console.log()
    console.log("Happy hacking!")
  } catch (e) {
    console.error(e.message)
  }
}

function addTemplateDepsToPackage(templatePackage, appPackage) {
  // // Copy over some of the devDependencies
  appPackage.dependencies = appPackage.dependencies || {}
  appPackage.devDependencies = appPackage.devDependencies || {}

  if (templatePackage.dependencies) {
    appPackage.dependencies = Object.assign(
      {},
      appPackage.dependencies,
      templatePackage.dependencie
    )
  }

  if (templatePackage.devDependencies) {
    appPackage.dependencies = Object.assign(
      {},
      appPackage.devDependencies,
      templatePackage.devDependencies
    )
  }

  return appPackage
}

function addStaticScriptsToPackage(appPackage) {
  // // Setup the script rules
  appPackage.scripts = Object.assign({}, appPackage.scripts, {
    start: "static-scripts start",
    preview: "static-scripts preview",
    build: "static-scripts build",
    eject: "static-scripts eject",
  })

  return appPackage
}

function copyTemplateToApp(templatePath, appPath) {
  if (!fs.existsSync(templatePath)) {
    throw new Error(
      `Could not locate supplied template: ${chalk.green(templatePath)}`
    )
  }
  fs.copySync(templatePath, appPath)
}

function writeAppPackage(appPath, appPackage) {
  fs.writeFileSync(
    path.join(appPath, "package.json"),
    JSON.stringify(appPackage, null, 2)
  )
}

function renameExistingReadme(appPath) {
  const readmeExists = fs.existsSync(path.join(appPath, "README.md"))
  if (readmeExists) {
    fs.renameSync(
      path.join(appPath, "README.md"),
      path.join(appPath, "README.old.md")
    )
  }
  return readmeExists
}

/**
 * Rename gitignore after the fact to prevent npm from renaming it to .npmignore
 * See: https://github.com/npm/npm/issues/1862
 */
function setupGitIgnore(appPath) {
  fs.move(
    path.join(appPath, "gitignore"),
    path.join(appPath, ".gitignore"),
    [],
    err => {
      if (err) {
        // Append if there's already a `.gitignore` file there
        if (err.code === "EEXIST") {
          const data = fs.readFileSync(path.join(appPath, "gitignore"))
          fs.appendFileSync(path.join(appPath, ".gitignore"), data)
          fs.unlinkSync(path.join(appPath, "gitignore"))
        } else {
          throw err
        }
      }
    }
  )
}
