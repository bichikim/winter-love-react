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
const pkg = require('./package.json')
const hotfix = require('./neutrino/middleware/hotfix')


/**
 * @example
 * @type {{use: ((function(...[*]=))|(function(...[*]=)))[], options: {roo: string, source: string}}}
 */
module.exports = {
  options: {
    roo: __dirname,
    source: 'src',
  },
  use: [
    env(),
    eslint({
      useEslintrc: true,
    }),
    reactComponents({
      externals: process.env.NODE_ENV !== 'test',
      targets: {
        browsers: pkg.browserslist,
      }
    }),

    // alias
    alias(),
    // stylus
    stylus(),
    typescript(),
    pug(),
    forkTsChecker({
      enable: process.env.NODE_ENV !== 'test',
    }),
    karma({
      frameworks: ['mocha', 'chai'],
      files: [
        {
          pattern: 'test/karma.polyfill.ts',
          watched: false,
          included: true,
          served: true,
        },
        {
          pattern: 'test/**/*.spec.tsx',
          watched: false,
          included: true,
          served: true,
        }
      ],
      preprocessors: {
        'test/**/*.ts': ['webpack'],
        'test/**/*.tsx': ['webpack'],
        'src/**/*.ts': ['webpack'],
        'src/**/*.js': ['webpack'],
        'src/**/*.tsx': ['webpack'],
        'src/**/*.jsx': ['webpack'],
      }
      ,
      plugins: [
        require.resolve('karma-chai'),
      ],
    }),
    hotfix(),
  ],
}
