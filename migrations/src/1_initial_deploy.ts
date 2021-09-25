import { ProductAuthContract } from "../../types/truffle-contracts";

// Obtaining the ProductAuth smart contract
const ProductAuth = (global as any).artifacts.require("ProductAuth") as ProductAuthContract;

module.exports = function deploy(deployer: Truffle.Deployer) {
  // Deploying the smart contract
  deployer.deploy(ProductAuth);
  console.log("Successfully deployed ProductAuth smart contract");
} as Truffle.Migration;