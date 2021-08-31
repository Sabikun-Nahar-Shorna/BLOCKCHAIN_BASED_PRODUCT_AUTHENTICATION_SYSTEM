const ProductAuth = (global as any).artifacts.require("ProductAuth");

module.exports = function deploy(deployer: any) {
  deployer.deploy(ProductAuth);
};