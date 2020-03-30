const {resolve} = require('path')

/**
 * use after reactComponents
 * @returns {function(...[*]=)}
 */
module.exports = () => (neutrino) => {
  neutrino.config.resolve.alias
    .set('src', resolve(neutrino.options.root, 'src-client'))
}
