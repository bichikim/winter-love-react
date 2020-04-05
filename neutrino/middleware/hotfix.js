module.exports = () => (neutrino) => {
  if(process.env.NODE_ENV === 'test') {
    // test needs Buffer
    // https://github.com/neutrinojs/neutrino/issues/1363#issuecomment-483714232
    neutrino.config.node
      .set('Buffer', 'mock')
  }

}
