const { staticScriptsConfig } = require("./paths")
const gerateStaticScriptsConfig = require(staticScriptsConfig)

// Todo: Create sane defaults
module.exports = function(env) {
  const isProduction = process.env.NODE_ENV === "production"
  let config = gerateStaticScriptsConfig(env)
  if (!config.generator) {
    throw new Error("`generator` must be provided by gulp.config.js")
  }
  config.dest = config.dest || "site/"
  config.src = config.src || "src/"
  config.tmp = config.tmp || ".tmp/"
  config.build = config.build || "dist/"

  const { styles, scripts, images, svg } = config

  const userConfig = Object.assign({}, config)
  delete userConfig.styles
  delete userConfig.scripts
  delete userConfig.images
  delete userConfig.svg

  return Object.assign(
    {
      styles: Object.assign(
        {
          src: config.src + "css/*.css",
          watch: config.src + "css/**/*.css",
          dest: config.dest + "static/css",
          tmp: config.tmp + "css",
        },
        config.styles
      ),
      scripts: Object.assign(
        {
          src: config.src + "js/*+(js|jsx)",
          watch: config.src + "js/**/*+(js|jsx)",
          dest: config.dest + "static/js/",
          tmp: config.tmp + "js/",
        },
        config.scripts
      ),
      images: Object.assign(
        {
          src: config.src + "img/**/*.+(png|jpg|jpeg|gif|svg|webp)",
          watch: config.src + "img/**/*.+(png|jpg|jpeg|gif|svg|webp)",
          dest: config.dest + "static/img/",
        },
        config.images
      ),
      svg: Object.assign(
        {
          src: config.src + "img/**/*.svg",
          watch: config.src + "img/**/*.svg",
          dest: config.dest + "static/svg/",
          config: {
            dest: ".",
            mode: {
              symbol: {
                sprite: "sprite.symbol.svg",
                prefix: "svg-%s",
                dest: ".",
              },
            },
            example: !isProduction,
          },
        },
        config.svg
      ),
    },
    userConfig
  )
}
