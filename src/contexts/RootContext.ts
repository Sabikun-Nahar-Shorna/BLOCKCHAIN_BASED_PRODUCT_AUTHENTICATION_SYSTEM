import React from "react";

export interface IRootContext {
  accounts: string[]
  networkId: number | null,
  ProductAuthContract: any | null
}

export const RootContext = React.createContext<IRootContext>({} as any)