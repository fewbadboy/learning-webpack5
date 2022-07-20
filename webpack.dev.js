const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
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
  devtool: 'eval-cheap-module-source-map'
})