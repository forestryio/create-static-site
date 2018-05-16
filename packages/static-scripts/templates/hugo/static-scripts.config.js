/**
 * Configuration file for create-static-site
 * A zero configuration build tool for static sites
 * https://github.com/forestryio/create-static-site/
 */
const {resolve} = require("path")

module.exports = () => ({
    generator: "Hugo", // e.g, "Hugo"
    command: require("hugo-bin"), // e.g, require("hugo-bin"),
    proxy: false,
    args: {
        default: ["--verbose", "--source", resolve("site/"), "--destination", resolve("dist/")],
        development: ["-b", "http://localhost:3000", "--buildDrafts", "--buildFuture", "--buildExpired"],
        production: [],
    },
    directories: {
        src: "src/",
        build: "dist/",
        static: "dist/static/",
        generator: "site/"
    }
})