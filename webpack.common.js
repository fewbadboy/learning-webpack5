const path = require('path')
const { DefinePlugin, ProvidePlugin } = require('webpack')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'
const json5 = require('json5')

module.exports = {
  name: 'Admin Webpack',
  entry: {
    main: {
      import: './src/pages/index/index.js'
    },
    about: {
      import: './src/pages/about/about.js'
    },
    print: './src/print.js'
  },
  output: {
    publicPath: '/webpack',
    path: path.resolve(__dirname, 'webpack'),
    filename: '[name].[contenthash].js',
    pathinfo: false,
    clean: true
  },
  resolve: {
    symlinks: false,
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js','.jsx','.ts','.tsx','.json']
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/i,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.s?css$/i,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [
          { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // default: 8kb
          }
        },
        generator: {
          publicPath: '/webpack/static/images/',
          outputPath: 'static/images/'
        }
      },
      {
        test: /\.(svg)(\?.*)?$/i,
        type: 'asset',
        exclude: [
          path.resolve(__dirname, 'src/icons')
        ],
        generator: {
          publicPath: '/webpack/static/images/',
          outputPath: 'static/images/'
        }
      },
      {
        test: /\.(svg)(\?.*)?$/i,
        include: [
          path.resolve(__dirname, 'src/icons')
        ],
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          publicPath: '/webpack/static/fonts/',
          outputPath: 'static/fonts/'
        }
      },
      {
        resourceQuery: '/file/',
        type: 'asset/resource'
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      }
    ]
  },
  externalsType: 'script',
  externals: {
    lodash: [
      'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js',
      '_'
    ]
  },
  optimization: {
    moduleIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: 'chunk-libs',
          priority: 10,
          chunks: 'initial'
        }
      }
    },
    runtimeChunk: 'single'
  },
  performance: {
    maxAssetSize: 512000 // default 224 KiB
  },
  plugins: [
    new ProvidePlugin({
      // join: ['lodash', 'join']
    }),
    new DefinePlugin({
      'process.env': {
        BASE_URL: JSON.stringify('/'),
        VERSION: JSON.stringify('5fa3b9')
      }
    }),
    new HtmlWebpackPlugin({
      meta: {
        'theme-color': '#4285f4'
      },
      title: 'index',
      filename: 'index.html',
      template: './public/index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      title: 'about',
      filename: 'about.html',
      template: './public/about.html',
      chunks: ['about']
    })
  ]
}
