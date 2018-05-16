const {staticScriptsConfig} = require("./paths")
const generateConfig = require(staticScriptsConfig)

/**
 * Provides the underlying configuration for the generator
 * 
 * Pulls from the user's project for specific values, and provides
 * sensible best practises otherwise
 */
module.exports = () => {
    let config = generateConfig()

    if (!config.generator) {
        throw new Error("`generator` must be provided in static-scripts.config.js")
    }

    if (!config.command) {
        throw new Error("`command` must be provided in static-scripts.config.js")
    }

    if (!config.args || !config.args.default) {
        throw new Error("`args.default` must be provided in static-scripts.config.js")
    }

    // Here we configure a tmp directory because we run a parellized
    // generator and asset build to separate folders to get non-build command
    // support for CMS' like Forestry or Siteleaf
    const directoryConfig = {
        src: "src/",
        generator: "site/",
        static: "site/",
        tmp: ".tmp/",
        build: "dist/",
    }

    const userConfig = {
        generator: config.generator,
        command: config.command,
        args: config.args,
        proxy: config.proxy,
        directories: {
            src: config.directories.src,
            generator: config.directories.generator,
            static: config.directories.static,
            build: config.directories.build
        }
    }

    return Object.assign({
        directories: directoryConfig,
        styles: {
            src: directoryConfig.src + "css/*.css",
            dest: directoryConfig.static + "css",
            tmp: directoryConfig.tmp + "css",
        },
        scripts: {
            src: directoryConfig.src + "js/",
            dest: directoryConfig.static + "js/",
            tmp: directoryConfig.tmp + "js/",
        },
        images: {
            src: directoryConfig.src + "img/**/*",
            dest: directoryConfig.static + "img/"
        },
        svg: {
            src: directoryConfig.src + "img/**/*.svg",
            dest: directoryConfig.static + "svg/",
        }
    }, userConfig)
}
