const babelMerge = require('babel-merge')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports.typescript = (/* options */) => (neutrino) => {
  neutrino.config.module
    .rule('compile')
    .test(/\.(mjs|jsx|js|tsx|ts)$/)
    .use('babel')
    .tap((options) => {
      return babelMerge(
        options,
        {
          presets: [require.resolve('@babel/preset-typescript')],
        },
      )
    })
}

module.exports.forkTsChecker = (_options) => (neutrino) => {
  const {enable = false, options = {}} = _options
  if(!enable) {
    return
  }
  neutrino.config.plugin('fork-ts-checker')
    .use(ForkTsCheckerWebpackPlugin, [options])
}

