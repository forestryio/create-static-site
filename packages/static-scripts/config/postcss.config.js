var postcss = require("postcss")
var cssnano = require("cssnano")

module.exports = ctx => ({
    // Optionally enable a sourcemap
    map: process.env.NODE_ENV === "production"
        ? {inline: false}
        : {inline: true},
    // We add support for a custom CSS parser; it's not used by 
    // default however
    parser: ctx.parser ? ctx.parser : false,
    plugins: [
        // Allows for resolving of CSS import statements
        // into the root CSS bundles
        require("postcss-import")({}),
        // Provides modern CSS features, today.
        // Also automatically provides autoprefixing
        // http://cssnext.io/features/
        require("postcss-cssnext")({}),
        // Pack like media queries together to reduce
        // bundle size
        require("css-mqpacker"),
        // In production, CSS is minified
        // We disable autoprefixer because it's bundled in cssnext
        process.env.NODE_ENV === "production"
            ? cssnano({autoprefixer: false})
            : false,
        // Automatically generates CSS fallbacks for legacy browsers. 
        // This is different than autoprefixing -- this creates custom 
        // CSS rules to add fallback support.
        // https://github.com/seaneking/laggard
        // Note: will not provide fallback for features that need 
        // polyfills
        require("laggard")({}),
        // Add robust CLI logging
        require("postcss-reporter")({
            clearReportedMessages: true,
        })
    ]
})
