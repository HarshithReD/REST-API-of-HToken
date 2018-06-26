var Htoken = artifacts.require("./HToken.sol");
module.exports = function(deployer) {
  deployer.deploy(Htoken,10000,2);
};
