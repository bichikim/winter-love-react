const babelMerge = require('babel-merge')

module.exports = () => (neutrino) => {
  neutrino.config.module
    .rule('compile')
    .test(/\.(mjs|jsx|js|tsx|ts)$/)
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
