// Learn more about configuring Webpack
// https://webpack.js.org/concepts/
const webpack = require("webpack")
const babelConfig = require("./babel.config")

module.exports = function(env) {
  const isProduction =
    env === "production" || process.env.NODE_ENV === "production"

  return {
    output: {
      path: __dirname + "/js/",
      filename: "[name].js",
    },
    externals: {
      // Any third-party deps added via a <script> tag
      // can be defined here so that they can be required
      // in your application's JS files
      // "jquery": "jQuery"
    },
    resolve: {
      // Can be used to create aliases for imports
      // utilities: path.resolve(__dirname, 'src/js/example/utilities/')
      // => import * from "utilities/filename"
    },
    resolveLoader: {
      modules: ["node_modules", "node_modules/static-scripts/node_modules"],
      extensions: [".js", ".json"],
      mainFields: ["loader", "main"],
    },
    module: {
      rules: [
        {
          // Enables ES6 syntax for JS
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/,
          options: Object.assign(
            {},
            {
              cacheDirectory: true,
            },
            babelConfig
          ),
        },
      ],
    },
    devtool: isProduction ? "nosources-source-map" : "cheap-eval-source-map",
    plugins: [
      new webpack.ProvidePlugin({
        // Automatically make packages available
        // without having to require them
        // $: "jquery",
        // jQuery: "jquery",
        fetch: "imports-loader?this=>global!exports?global.fetch!whatwg-fetch",
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
      }),
    ],
  }
}
