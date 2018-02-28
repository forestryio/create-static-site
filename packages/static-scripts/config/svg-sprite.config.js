module.exports = {
  dest: ".",
  mode: {
    symbol: {
      sprite: "sprite.symbol.svg",
      prefix: "svg-%s",
      dest: ".",
    },
  },
  example: process.env.NODE_ENV !== "production",
}
