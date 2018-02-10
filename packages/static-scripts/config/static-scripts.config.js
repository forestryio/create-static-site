const path = require("path")
const PROJECT = "../../../.."
const { staticScriptsConfig } = require("./paths")
const gulpFilePath = path.resolve(__dirname, PROJECT, "./gulp.config.js")
const GulpConfig = require(gulpFilePath)

// Todo: Create sane defaults
module.exports = function(env) {
  const isProduction = process.env.NODE_ENV === "production"
  let config = GulpConfig(env)
  if (!config.generator) {
    throw new Error("`generator` must be provided by gulp.config.js")
  }
  config.dest = config.dest || "site/"
  config.src = config.src || "src/"
  config.tmp = config.tmp || ".tmp/"
  config.build = config.build || "dist/"

  config = {
    styles: {
      src: config.src + "css/*.css",
      watch: config.src + "css/**/*.css",
      dest: config.dest + "static/css",
      tmp: config.tmp + "css",
      ...config.styles,
    },
    scripts: {
      src: config.src + "js/*+(js|jsx)",
      watch: config.src + "js/**/*+(js|jsx)",
      dest: config.dest + "static/js/",
      tmp: config.tmp + "js/",
      ...config.scripts,
    },
    images: {
      src: config.src + "img/**/*.+(png|jpg|jpeg|gif|svg|webp)",
      watch: config.src + "img/**/*.+(png|jpg|jpeg|gif|svg|webp)",
      dest: config.dest + "static/img/",
      ...config.images,
    },
    svg: {
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
      ...config.svg,
    },
    ...config,
  }

  return config
}
