const RentalAgreement = artifacts.require("RentalAgreement");
const RentalNFT = artifacts.require("RentalNFT");

module.exports = function (deployer) {
  deployer.deploy(RentalNFT)
    .then(() => {
      return deployer.deploy(RentalAgreement, 100, 50); // rentalPrice=100, depositAmount=50
    });
};
