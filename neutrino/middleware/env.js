const Dotenv =require('dotenv-webpack')

module.exports = () => (neutrino) => {
  neutrino.config.plugin('dotenv').use(Dotenv, [{
    // loads the .env file by distinguishing between production mode and development mode.
    path: process.env.NODE_ENV === 'production' ? './.env' : './.dev.env',
    safe: process.env.NODE_ENV === 'production',
    defaults: './.default.env',
  }])
}
