const path = require('path')
const { BannerPlugin, DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const json5 = require('json5')

module.exports = {
  name: 'Admin Webpack',
  mode: 'development',
  entry: {
    main: {
      import: './src/pages/index/index.js'
    },
    about: {
      import: './src/pages/about/about.js'
    }
  },
  output: {
    publicPath: '/webpack',
    path: path.resolve(__dirname, 'webpack'),
    clean: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    headers: [
      {
        key: 'X-Custom-Foo',
        value: 'foo'
      }
    ],
    open: {
      target: ['/webpack'],
      app: {
        name: 'chrome', // macOS: Google Chrome Linux: google-chrome Windows: chrome
        arguments: ['--incognito', '--new-window']
      }
    },
    port: 8080
    // setupMiddlewares: (middlewares, devServer) => {
    //   devServer.app.get('/some/path', (_, response) => {
    //     response.send('setup-middlewares options GET')
    //   })
    //   middlewares.unshift({
    //     name: 'first-in-array',
    //     path: '/first',
    //     middleware: (req, res) => {
    //       res.send('first')
    //     }
    //   })
    //   middlewares.push({
    //     name: 'last-in-array',
    //     path: '/last',
    //     middleware: (req, res) => {
    //       res.send('last')
    //     }
    //   })
    // }
    // proxy: {
    //   '/api': {
    //     target: 'http://172.20.3.183:30030',
    //     pathRewrite: {
    //       '^/api': ''
    //     },
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              // do
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        },
        generator: {
          publicPath: 'webpack/static/images/',
          outputPath: 'static/images/'
        }
      },
      {
        test: /\.(svg)(\?.*)?$/i,
        type: 'asset',
        exclude: [
          path.resolve(__dirname, 'src/icons')
        ],
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        },
        generator: {
          publicPath: 'webpack/static/images/',
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
          publicPath: 'webpack/static/fonts/',
          outputPath: 'static/fonts/'
        }
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
  plugins: [
    new DefinePlugin({
      'process.env': {
        BASE_URL: JSON.stringify('/'),
        VERSION: JSON.stringify('5fa3b9')
      }
    }),
    new BannerPlugin({
      banner: `Author: fewbadboy \nTime: ${new Date().toLocaleString()}`
    }),
    new HtmlWebpackPlugin({
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
