const webpackMarge = require('webpack-merge')
const findRuleIndex = (rules, ext) => {
  return rules.findIndex((value) => {
    const {test} = value
    if(!test) {
      return false
    }
    if(Array.isArray(test)) {
      return test.some((value) => {
        return value.test(ext)
      })
    }
    return test.test(ext)
  })
}

module.exports = {
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register'
  ],
  stories: ['../stories/**/*.stories.[tj]sx'],
  webpackFinal: (config) => {
    const neutrinoWebpack = require('../webpack.config.js')
    const rules = config.module.rules
    const tsRuleIndex = findRuleIndex(neutrinoWebpack.module.rules, '.ts')
    const jsRuleIndex = findRuleIndex(rules, '.js')
    neutrinoWebpack.module.rules[tsRuleIndex].include = rules[jsRuleIndex].include
    neutrinoWebpack.module.rules[tsRuleIndex].exclude = rules[jsRuleIndex].exclude
    // neutrinoWebpack.module.rules[tsRuleIndex].use[0].options.plugins.push(require.resolve('babel-plugin-react-docgen'))
    config.module.rules.splice(jsRuleIndex, 1)
    return webpackMarge(
      config,
      {
        resolve: neutrinoWebpack.resolve,
        module: {
          ...neutrinoWebpack.module,
          rules: neutrinoWebpack.module.rules,
        }
      }
    )
  }
}
