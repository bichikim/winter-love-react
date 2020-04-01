const babelMerge = require('babel-merge')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const {margeArray} = require('../utils')

module.exports.typescript = (/* options */) => (neutrino) => {
  neutrino.config.resolve.extensions
    .add('.tsx')
    .add('.ts')

  const compileTest = neutrino.config.module.rule('compile').get('test')
  const newCompileTest = /\.(ts|tsx)$/

  neutrino.config.module
    .rule('compile')
    .test(margeArray(compileTest, newCompileTest))
    .use('babel')
    .tap((options) => {
      return babelMerge(
        options,
        {
          presets: [[
            require.resolve('@babel/preset-typescript'), {
              // When set to true, the transform will only remove type-only imports
              // (introduced in TypeScript 3.8). This should only be used
              // if you are using TypeScript >= 3.8.
              // fix remove import React
              onlyRemoveTypeImports: true,
            }]],
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

