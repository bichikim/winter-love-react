const eslint = require('@neutrinojs/eslint')
const reactComponents = require('@neutrinojs/react-components')
const karma = require('@neutrinojs/karma')
const {typescript, forkTsChecker} = require('./neutrino/middleware/typescript')



module.exports = {
  options: {
    root: __dirname,
    source: 'src-client',
  },
  use: [
    eslint({
      useEslintrc: true,
    }),
    reactComponents(),
    typescript(),
    forkTsChecker({
      enable: process.env.NODE_ENV === 'development',
    }),
    karma(),
  ],
};
