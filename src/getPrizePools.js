const { contractAddresses } = require('@pooltogether/current-pool-data')

function getPrizePools(network) {
  let prizePoolAddresses = []
  if (network == 'rinkeby') {
    prizePoolAddresses.push(contractAddresses[4].dai.prizePool)
    prizePoolAddresses.push(contractAddresses[4].bat.prizePool)
  } else if (network == 'mainnet') {
    prizePoolAddresses.push(contractAddresses[1].dai.prizePool)
    prizePoolAddresses.push(contractAddresses[1].uni.prizePool)
    prizePoolAddresses.push(contractAddresses[1].usdc.prizePool)
    prizePoolAddresses.push(contractAddresses[1].comp.prizePool)
  } else {
    throw new Error(`Unknown network: ${network}`)
  }
  return prizePoolAddresses
}

module.exports = {
  getPrizePools
}