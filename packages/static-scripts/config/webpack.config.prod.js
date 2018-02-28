// Learn more about configuring Webpack
// https://webpack.js.org/concepts/

const babelConfig = require("./babel.config")
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")
const config = require("./static-scripts.config")()
const getClientEnvironment = require("./env")
const eslintFormatter = require("react-dev-utils/eslintFormatter")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin")
const path = require("path")
const paths = require("./paths")
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin")
const webpack = require("webpack")

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1)

// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl)

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false"

// Assert this just to be safe.
// We want to ensure we're not running in production
if (env.stringified["process.env"].NODE_ENV !== '"production"') {
  throw new Error("Production builds must have NODE_ENV=production.")
}

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We set webpacks "mode" feature to get built-in optimizations
  // mode: "development",
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: shouldUseSourceMap ? "source-map" : false,
  entry: [
    // These are the "entry points" to our application.
    // This means they will be the "root" imports that are included in JS
    // bundle(s)
    //
    // This is your app's code:
    "./src/js",
  ],
  output: {
    // Ensures we're outputting to the correct path
    path: path.resolve(config.scripts.dest),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This is the JS bundle containing code from all our entry points,
    // and the Webpack runtime.
    filename: config.scripts.dest + "[name].js",
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: config.scripts.dest + "[name].chunk.js",
    // Point sourcemap entries to original disk location
    // (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebook/create-react-app/issues/253
    modules: ["node_modules"].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebook/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: [".web.js", ".mjs", ".js", ".json", ".web.jsx", ".jsx"],
    alias: {
      // @remove-on-eject-begin
      // Resolve Babel runtime relative to react-scripts.
      // It usually still works on npm 3 without this but it would be
      // unfortunate to rely on, as static-scripts could be symlinked,
      // and thus @babel/runtime might not be resolvable from the source.
      "@babel/runtime": path.dirname(
        require.resolve("@babel/runtime/package.json")
      ),
      // @remove-on-eject-end
    },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      // new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    // Throw an error if an exported fxn is missing
    // We do this because it enforces good code quality
    strictExportPresence: true,
    rules: [
      {
        // Disable require.ensure as it's not a standard language feature.
        parser: {
          requireEnsure: false,
        },
      },
      {
        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        test: /\.(js|jsx|mjs)$/,
        enforce: "pre",
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve("eslint"),
              // TODO: consider separate config for production,
              // e.g. to enable no-console and no-debugger only in production.
              // @remove-on-eject-begin
              ignore: false,
              // @remove-on-eject-end
            },
            loader: require.resolve("eslint-loader"),
          },
        ],
        include: paths.srcPaths,
        exclude: [/[/\\\\]node_modules[/\\\\]/],
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          {
            // "url" loader works like "file" loader except that it embeds
            // assets smaller than specified limit in bytes as data URLs to
            // avoid requests. A missing `test` is equivalent to a match.
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: config.images.dest + "[name].[ext]",
            },
          },
          {
            // Process application JS with Babel.
            // The preset includes JSX, Flow, and some ESnext features.
            test: /\.(js|jsx|mjs)$/,
            include: paths.srcPaths,
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            use: [
              // This loader parallelizes code compilation, it is optional but
              // improves compile time on larger projects
              require.resolve("thread-loader"),
              {
                loader: require.resolve("babel-loader"),
                options: {
                  babelrc: true,
                  compact: true,
                  highlightCode: true,
                },
              },
            ],
          },
          {
            // Process any JS outside of the app with Babel.
            // Unlike the application JS, we only compile the standard ES features.
            test: /\.js$/,
            use: [
              // This loader parallelizes code compilation, it is optional but
              // improves compile time on larger projects
              require.resolve("thread-loader"),
              {
                loader: require.resolve("babel-loader"),
                options: {
                  babelrc: true,
                  compact: true,
                  cacheDirectory: false,
                  highlightCode: true,
                },
              },
            ],
          },
          {
            // The notation here is somewhat confusing.
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader normally turns CSS into JS modules injecting
            // <style>, but we do something different...
            // `ExtractTextPlugin` first applies the "postcss" and "css"
            // loaders (second argument), then grabs the result CSS and puts it
            // into a separate file in our build process.
            // This way we actually ship a single CSS file in production
            // If you use code splitting, however, any async bundles will still
            // use the "style" loader inside the async code so CSS from them
            // won't be in the main CSS file. By default we support CSS Modules
            // with the extension .module.css
            test: /\.css$/,
            exclude: /\.module\.css$/,
            loader: ExtractTextPlugin.extract(
              Object.assign({
                fallback: {
                  loader: require.resolve("style-loader"),
                  options: {
                    hmr: false,
                  },
                },
                use: [
                  {
                    loader: require.resolve("css-loader"),
                    options: {
                      importLoaders: 1,
                      minimize: true,
                      sourceMap: shouldUseSourceMap,
                    },
                  },
                  {
                    loader: require.resolve("postcss-loader"),
                    options: {
                      sourceMap: true,
                    },
                  },
                ],
              })
            ),
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          },
          {
            // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
            // using the extension .module.css
            test: /\.module\.css$/,
            loader: ExtractTextPlugin.extract(
              Object.assign({
                fallback: {
                  loader: require.resolve("style-loader"),
                  options: {
                    hmr: false,
                  },
                },
                use: [
                  {
                    loader: require.resolve("css-loader"),
                    options: {
                      importLoaders: 1,
                      minimize: true,
                      sourceMap: shouldUseSourceMap,
                      modules: true,
                      localIdentName: "[path]__[name]___[local]",
                    },
                  },
                  {
                    loader: require.resolve("postcss-loader"),
                    options: {
                      sourceMap: true,
                    },
                  },
                ],
              })
            ),
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          },
          {
            // "file" loader makes sure assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            loader: require.resolve("file-loader"),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: config.directories.static + "[name].[ext]",
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  },
  plugins: [
    // Add module names to factory functions so they appear in the
    // browser's profiler.
    new webpack.NamedModulesPlugin(),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebook/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still
    // have to restart the development server for Webpack to discover it.
    // This plugin makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebook/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // Moment.js bundles large locale files by default due to how Webpack
    // interprets its code. This is a practical solution that requires the  // user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // (You can remove this if you don't use Moment.js)
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Minify the code.
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8,
        compress: {
          warnings: false,
          // Disabled because of an issue with Uglify breaking seemingly valid code:
          // https://github.com/facebook/create-react-app/issues/2376
          // Pending further investigation:
          // https://github.com/mishoo/UglifyJS2/issues/2011
          comparisons: false,
        },
        mangle: {
          safari10: true,
        },
        output: {
          comments: false,
          // Turned on because emoji and regex is not minified properly using default
          // https://github.com/facebook/create-react-app/issues/2488
          ascii_only: true,
        },
      },
      // Use multi-process parallel running to improve the build speed
      // Default number of concurrent runs: os.cpus().length - 1
      parallel: true,
      // Enable file caching
      cache: true,
      sourceMap: shouldUseSourceMap,
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..)
    // in `loaders`.
    new ExtractTextPlugin({
      filename: config.styles.dest + "[name].css",
    }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      logger(message) {
        if (message.indexOf("Total precache size is") === 0) {
          // This message occurs for every build and is a bit too noisy.
          return
        }
        if (message.indexOf("Skipping static resource") === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebook/create-react-app/issues/2612
          return
        }
        console.log(message)
      },
      minify: true,
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      // `navigateFallback` and `navigateFallbackWhitelist` are disabled by default see
      // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#service-worker-considerations
      // navigateFallback: publicUrl + '/index.html',
      // navigateFallbackWhitelist: [/^(?!\/__).*/],
    }),
  ],
  node: {
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
}
