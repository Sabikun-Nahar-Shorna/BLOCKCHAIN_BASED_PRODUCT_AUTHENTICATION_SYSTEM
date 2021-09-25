import { ProductAuthContract } from "./ProductAuth";

declare global {
  namespace Truffle {
    interface Artifacts {
      require(name: "ProductAuth"): ProductAuthContract;
    }
  }
}

export { ProductAuthContract, ProductAuthInstance } from "./ProductAuth";
