const babelMerge = require('babel-merge')

/**
 * Add pug plugin to Babel
 * @returns {function(...[*]=)}
 */
module.exports = () => (neutrino) => {
  neutrino.config.module
    .rule('compile')
    .use('babel')
    .tap((options) => {
      return babelMerge(
        options,
        {
          plugins: [
            require.resolve('babel-plugin-transform-react-pug'),
            require.resolve('@babel/plugin-transform-react-jsx'),
            [require.resolve('babel-plugin-transform-jsx-classname-components'), {
              object: ['React'],
            }],
          ],
        },
      )
    })
}
