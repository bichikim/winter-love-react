const babelMerge = require('babel-merge')

/**
 * use after reactComponents
 * @returns {function(...[*]=)}
 */
module.exports = (options = {}) => (neutrino) => {
  const {postcss = true} = options

  // style rule chain
  const style = neutrino.config.module.rule('style')

  /**
   * post Loader config setter
   * @param config config.module.rule('...')
   * @returns {*}
   */
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

  /**
   * stylus loader config setter
   * @param config config.module.rule('...')
   * @returns {*}
   */
  const stylusLoader = (config) => {
    return config
      .use('stylus')
      .loader('stylus-loader')
      .end()
  }

  /**
   * css scope config setter
   * @param config config.module.rule('...')
   * @returns {*}
   */
  const scopedCssLoader = (config) => {
    return config
      .use('scoped-css')
      .loader('scoped-css-loader')
      .end()
  }

  /**
   * for an using module way
   * @example import foo from 'foo.module.styl'
   */
  const modules = style.oneOf('modules').test(/\.module\.(css|styl(us)?)$/)
  if(postcss) {
    postLoader(modules)
  }
  stylusLoader(modules)


  /**
   * for an using normal way
   * @example import 'foo.styl'
   */
  const normal = style.oneOf('normal').test(/\.(css|styl(us)?)$/)
  scopedCssLoader(normal)
  if(postcss) {
    postLoader(normal)
  }
  stylusLoader(normal)

  /**
   * for an using scoped way
   * @example import 'foo.scoped.styl'
   */
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
}
