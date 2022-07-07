const path = require('path')
const { BannerPlugin, DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const yaml = require('yamljs')
const json5 = require('json5')

module.exports = {
  name: 'Admin Webpack',
  mode: 'development',
  entry: {
    about: './src/pages/about/about.js',
    main: './src/pages/index/index.js'
  },
  output: {
    publicPath: '/webpack',
    path: path.resolve(__dirname, 'webpack')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    open: {
      target: ['/webpack'],
      app: {
        name: 'chrome',
        arguments: ['--incognito', '--new-window']
      }
    },
    port: 8080
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
        loader: 'babel-loader',
        options: {
          presets: ['es2021']
        }
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
        generator: {
          outputPath: 'images/'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          outputPath: 'font/'
        }
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader']
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse
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
  externals: {
    lodash: '_'
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
