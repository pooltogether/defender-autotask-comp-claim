const { claim } = require('./claim')
const { Relayer } = require('defender-relay-client');

exports.handler =  async function(event, context) {
  await claim(new Relayer(event),'mainnet')
}