import React from "react";
import { ProductAuth } from "../../types/web3-v1-contracts/ProductAuth";

export interface IRootContext {
  accounts: string[]
  networkId: number | null,
  ProductAuthContract: ProductAuth | null
}

export const RootContext = React.createContext<IRootContext>({} as any)