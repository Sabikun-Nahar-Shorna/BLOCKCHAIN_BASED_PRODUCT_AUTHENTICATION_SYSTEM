import { ProductAuthContract } from "../../types/truffle-contracts";

const ProductAuth = (global as any).artifacts.require("ProductAuth") as ProductAuthContract;

module.exports = function deploy(deployer: Truffle.Deployer) {
  deployer.deploy(ProductAuth);
  console.log("Successfully deployed ProductAuth smart contract");
} as Truffle.Migration;