const ethers = require("ethers")
const { getPrizePools } = require('./getPrizePools')
const { getComptroller } = require('./getComptroller')
const ComptrollerAbi = require("./abis/Comptroller.json")
const CompoundPrizePoolAbi = require("@pooltogether/pooltogether-contracts/abis/CompoundPrizePool.json")

console.log(ComptrollerAbi)

exports.claim = async function (relayer, network) {
  const prizePools = getPrizePools(network)

  const provider = new ethers.providers.InfuraProvider(network, process.env.INFURA_API_KEY)

  const comptrollerAddress = getComptroller(network)
  console.log(`Claiming for comptroller(${comptrollerAddress})`)
  const comptroller = new ethers.Contract(comptrollerAddress, ComptrollerAbi, provider)


  for (let i = 0; i < prizePools.length; i++) {
    const prizePool = new ethers.Contract(prizePools[i], CompoundPrizePoolAbi, provider)
    const cToken = await prizePool.cToken()
    console.log(`Claiming for prize pool ${prizePools[i]} for cToken ${cToken}...`)
    const unsignedTx = await comptroller.populateTransaction['claimComp(address,address[])'](prizePools[i], [cToken])
    if (relayer) {
      const gasLimit = (await comptroller.estimateGas['claimComp(address,address[])'](prizePools[i], [cToken])).toNumber()
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
