var postcss = require("postcss")

module.exports = ctx => ({
    // Optionally enable a sourcemap
    map: ctx.options.map,
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
        require("postcss-cssnext")({
            
        }),
        // Automatically generates CSS fallbacks for legacy browsers. 
        // This is different than autoprefixing -- this creates custom 
        // CSS rules to add fallback support.
        // https://github.com/seaneking/laggard
        // Note: will not provide fallback for features that need 
        // polyfills
        require("laggard")({}),
        // In production, CSS is minified
        // We disable autoprefixer because it's bundled in cssnext
        (process.env.NODE_ENV === "production")
            ? require("cssnano")({autoprefixer: false})
            : false,
        // Add robust CLI logging
        require("postcss-reporter")({
            clearReportedMessages: true,
        })
    ]
})
