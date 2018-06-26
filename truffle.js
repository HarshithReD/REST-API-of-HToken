module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port:8545,
      network_id: '*', // Match any network id
      gas:  4712388,
      from:"0xf4ad7513c92FCC3FAD94A658Cc30413DCa82801e"
    },
     rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0xf4ad7513c92FCC3FAD94A658Cc30413DCa82801e", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
       gas: 6612388, // Gas limit used for deploys
      gasPrice: 2700000000000,
    }
  }
}
