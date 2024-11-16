const RentalMarketplace = artifacts.require("RentalMarketplace");

module.exports = function (deployer) {
    deployer.deploy(RentalMarketplace);
};
