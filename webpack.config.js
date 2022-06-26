const path = require('path')
const { BannerPlugin, DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const yaml = require('yamljs')
const json5 = require('json5')

module.exports = {
  name: 'Admin Webpack',
  mode: 'development', // production
  entry: {
    about: './src/pages/about/about.js',
    main: './src/pages/index/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    open: true,
    port: 8080
  },
  module: {
    rules: [
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
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
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
    new CleanWebpackPlugin(),
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
