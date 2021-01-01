const ethers = require("ethers")
const { getPrizePools } = require('./getPrizePools')
const { getComptroller } = require('./getComptroller')
const ComptrollerAbi = require("./abis/Comptroller.json")

console.log(ComptrollerAbi)

exports.claim = async function (relayer, network) {
  const prizePools = getPrizePools(network)

  const provider = new ethers.providers.InfuraProvider(network, process.env.INFURA_API_KEY)

  const comptrollerAddress = getComptroller(network)
  console.log(`Claiming for comptroller(${comptrollerAddress})`)
  const comptroller = new ethers.Contract(comptrollerAddress, ComptrollerAbi, provider)

  for (let i = 0; i < prizePools.length; i++) {
    console.log(`Claiming for prize pool ${prizePools[i]}...`)
    const unsignedTx = await comptroller.populateTransaction['claimComp(address)'](prizePools[i])
    if (relayer) {
      const gasLimit = (await comptroller.estimateGas['claimComp(address)'](prizePools[i])).toNumber()
      console.log('GAS LIMIT: ', gasLimit.toString())
      await relayer.sendTransaction({
        to: unsignedTx.to,
        data: unsignedTx.data,
        gasLimit,
        speed: 'average'
      })
    } else {
      console.warn('No relayer present.  Cannot start award.')
    }
  }
}
