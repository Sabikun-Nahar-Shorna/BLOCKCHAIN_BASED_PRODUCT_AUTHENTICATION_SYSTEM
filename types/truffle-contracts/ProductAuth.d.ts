import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface ProductAuthContract
  extends Truffle.Contract<ProductAuthInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<ProductAuthInstance>;
}

type AllEvents = never;

export interface ProductAuthInstance extends Truffle.ContractInstance {
  owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

  products(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: string; 1: string; 2: string }>;

  productsMap(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: string; 1: string; 2: string }>;

  addProduct: {
    (
      productName: string,
      productType: string,
      productId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      productName: string,
      productType: string,
      productId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      productName: string,
      productType: string,
      productId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      productName: string,
      productType: string,
      productId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  fetchProducts(
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ productName: string; productType: string; productId: string }[]>;

  fetchProductById(
    productId: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ productName: string; productType: string; productId: string }>;

  methods: {
    owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

    products(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: string; 1: string; 2: string }>;

    productsMap(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: string; 1: string; 2: string }>;

    addProduct: {
      (
        productName: string,
        productType: string,
        productId: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        productName: string,
        productType: string,
        productId: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        productName: string,
        productType: string,
        productId: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        productName: string,
        productType: string,
        productId: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    fetchProducts(
      txDetails?: Truffle.TransactionDetails
    ): Promise<
      { productName: string; productType: string; productId: string }[]
    >;

    fetchProductById(
      productId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ productName: string; productType: string; productId: string }>;
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
