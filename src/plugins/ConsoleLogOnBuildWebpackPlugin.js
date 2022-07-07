const pluginName = 'ConsoleLogOnBuildWebpackPlugin'
class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      const logger = compilation.getLogger(pluginName)
      logger.log('The webpack build process is starting!')
    })
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin
