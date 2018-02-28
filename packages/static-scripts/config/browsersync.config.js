// Full list of options:
// http://www.browsersync.io/docs/options/
const config = require("./static-scripts.config")

exports = {
  https: false,
  injectChanges: true,
  notify: true,
  open: true,
  port: 3000,
  reloadThrottle: 300,
  reloadDelay: 300,
}

if (config.proxy) {
  // If the proxy configuration option is set
  // in the template, run a proxy
  exports = Object.assign(exports, {
    proxy: config.proxy
  })
} else {
  // Otherwise, we use the built-in server
  // to serve from the baseDir and tmpDir
  exports = Object.assign(exports, {
    server: {
      baseDir: [config.build, config.tmp]
    }
  })
}

module.exports = exports
