// Full list of options:
// http://www.browsersync.io/docs/options/
const GulpConfig = require("./static-scripts.config")

module.exports = function(env) {
  const gulpConfig = GulpConfig()
  const isProduction =
    env === "production" || process.env.NODE_ENV === "production"

  return {
    server: {
      baseDir: [gulpConfig.tmp, gulpConfig.build],
      middleware: isProduction ? [require("compression")()] : [],
    },
    https: false,
    injectChanges: true,
    notify: true,
    open: true,
    port: 3000,
    reloadThrottle: 300,
    reloadDelay: 300,
  }
}
