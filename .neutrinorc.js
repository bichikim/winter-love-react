const eslint = require('@neutrinojs/eslint')
const reactComponents = require('@neutrinojs/react-components')
const karma = require('@neutrinojs/karma')
const {typescript, forkTsChecker} = require('./neutrino/middleware/typescript')
const {resolve} = require('path')
const styles = require('@neutrinojs/style-loader')
const alias = require('./neutrino/middleware/alias')
const stylus = require('./neutrino/middleware/stylus')
const pug = require('./neutrino/middleware/pug')
const env = require('./neutrino/middleware/env')

module.exports = {
  options: {
    roo: __dirname,
    source: 'src-client',
  },
  use: [
    env(),
    eslint({
      useEslintrc: true,
    }),
    reactComponents(),

    // alias
    alias(),
    // stylus
    stylus(),
    typescript(),
    pug(),
    forkTsChecker({
      enable: process.env.NODE_ENV === 'development',
    }),
    karma({
      frameworks: ['mocha', 'chai'],
      files: [
        {
          pattern: 'test/**/*.spec.ts',
          watched: false,
          included: true,
          served: true,
        }
      ],
      preprocessors: {
        'test/**/*.spec.ts': ['webpack'],
        'src/**/*.(ts|tsx|js|jsx|mjs)': ['webpack'],
      }
      ,
      plugins: [
        require.resolve('karma-chai'),
      ],
    }),
  ],
}
