// Configures gulp build
// See gulpfile.babel.js for build pipeline
const { resolve } = require("path")

module.exports = function(env) {
  const src = "src/"
  const dest = "jekyll/"
  const tmp = ".tmp/"
  const build = "dist/"
  const isProduction = process.env.NODE_ENV === "production"

  return {
    src: src,
    dest: dest,
    tmp: tmp,
    build: build,
    generator: {
      label: "Jekyll",
      command: "bundle",
      args: {
        default: [
          "exec",
          "jekyll",
          "build",
          "--source",
          resolve(dest),
          "--destination",
          resolve(build),
        ],
        development: [
          "-V",
          "--drafts",
          "--unpublished",
          "--future",
          "--baseURL=/",
        ],
        preview: ["--baseURL=/"],
        production: [],
      },
    },
    styles: {
      src: src + "css/*.css",
      watch: src + "css/**/*.css",
      dest: dest + "css",
      tmp: tmp + "css",
    },
    scripts: {
      src: src + "js/*+(js|jsx)",
      watch: src + "js/**/*+(js|jsx)",
      dest: dest + "js/",
      tmp: tmp + "js/",
    },
    images: {
      src: src + "img/**/*.+(png|jpg|jpeg|gif|svg|webp)",
      watch: src + "img/**/*.+(png|jpg|jpeg|gif|svg|webp)",
      dest: dest + "img/",
    },
    svg: {
      src: src + "img/**/*.svg",
      watch: src + "img/**/*.svg",
      dest: dest + "svg/",
      config: {
        dest: ".",
        mode: {
          symbol: {
            sprite: "sprite.symbol.svg",
            prefix: "svg-%s",
            dest: ".",
          },
        },
        example: isProduction ? false : true,
      },
    },
  }
}
