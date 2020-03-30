const eslint = require('@neutrinojs/eslint')
const reactComponents = require('@neutrinojs/react-components')
const karma = require('@neutrinojs/karma')
const {typescript, forkTsChecker} = require('./neutrino/middleware/typescript')
const {resolve} = require('path')
const styles = require('@neutrinojs/style-loader')
const alias = require('./neutrino/middleware/alias')
const stylus = require('./neutrino/middleware/stylus')
const pug = require('./neutrino/middleware/pug')

module.exports = {
  options: {
    roo: __dirname,
    source: 'src-client',
  },
  use: [
    eslint({
      useEslintrc: true,
    }),
    reactComponents(),
    pug(),
    // alias
    alias(),
    // stylus
    stylus(),
    typescript(),

    forkTsChecker({
      enable: process.env.NODE_ENV === 'development',
    }),
    karma(),
  ],
}
