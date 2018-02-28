/**
 * Configuration file for create-static-site
 * A zero configuration build tool for static sites
 * https://github.com/forestryio/create-static-site/
 */
const {resolve} = require("path")

module.exports = () => ({
    generator: "Jekyll",
    command: "bundle exec jekyll",
    proxy: false,
    args: {
        default: ["build", "--source", resolve(dest), "--destination", resolve(build)],
        development: ["--verbose", "--drafts", "--unpublished", "--future","--baseURL=/"],
        production: []
    },
    directories: {
        src: "src/",
        build: "dist/",
        static: "dist/",
        generator: "site/"
    }
})