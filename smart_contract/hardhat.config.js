//https://eth-ropsten.alchemyapi.io/v2/DfitRjOFAQUrUHrZ_9tkJPdtH1qfJTh4

require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten:{
      url:'https://eth-ropsten.alchemyapi.io/v2/DfitRjOFAQUrUHrZ_9tkJPdtH1qfJTh4',
      accounts: ['977392e2da57350232579b744ef6659c56fc33f9b04591d678d87b47286e8596']

    }
  }
}

