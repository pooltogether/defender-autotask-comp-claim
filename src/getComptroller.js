function getComptroller(network) {
  if (network == 'rinkeby') {
    return "0x2eaa9d77ae4d8f9cdd9faacd44016e746485bddb"
  } else if (network == 'mainnet') {
    return "0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b"
  } else {
    throw new Error(`Unknown network: ${network}`)
  }
}

module.exports = {
  getComptroller
}