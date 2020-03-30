const babelMerge = require('babel-merge')

/**
 * use after reactComponents
 * @returns {function(...[*]=)}
 */
module.exports = () => (neutrino) => {
  const style = neutrino.config.module.rule('style')

  const postLoader = (config) => {
    return config
      .use('postcss')
      .loader('postcss-loader')
      .options({
        config: {
          path: neutrino.options.root,
        },
      })
      .end()
  }

  const stylusLoader = (config) => {
    return config
      .use('stylus')
      .loader('stylus-loader')
      .end()
  }

  const scopedCssLoader = (config) => {
    return config
      .use('scoped-css')
      .loader('scoped-css-loader')
      .end()
  }

  const modules = style.oneOf('modules').test(/\.module\.(css|styl(us)?)$/)
  postLoader(modules)
  stylusLoader(modules)

  neutrino.config.module
    .rule('compile')
    .use('babel')
    .tap((options) => {
      return babelMerge(
        options,
        {
          plugins: [
            ['babel-plugin-react-scoped-css', {
              include: /\.scoped\.(css|styl(us)?)$/,
            }],
          ],
        },
      )
    })

  const normal = style.oneOf('normal').test(/\.(css|styl(us)?)$/)
  scopedCssLoader(normal)
  postLoader(normal)
  stylusLoader(normal)

}
