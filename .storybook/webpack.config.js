module.exports = (storybookConfig = {}) => {
  return {...require('../webpack.config'), ...storybookConfig.config}
}
