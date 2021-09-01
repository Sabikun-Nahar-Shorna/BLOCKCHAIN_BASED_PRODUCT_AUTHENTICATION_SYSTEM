import React, {useState, useEffect} from "react";
import Web3 from "web3";
import QrCode from "qrcode";
import {v4} from "uuid";
import ProductAuthJSON from "../abis/ProductAuth.json";
import { Button, TextInput } from "../components";

interface IProduct{
  productType: string
  productName: string
  productId: string
  productQrCode: string
}

const Index = () => {
  const [transactionState, setTransactionState] = useState<"ongoing" | "idle">("idle");
  const [productInfo, setProductInfo] = useState<IProduct>({
    productName: "",
    productType: "",
    productId: "",
    productQrCode: ""
  })

  const [state, setState] = useState<{
    accounts: string[]
    networkId: number | null,
    ProductAuthContract: any | null
  }>({
    accounts: [],
    networkId: null,
    ProductAuthContract: null
  });

  useEffect(()=> {
    async function loadWeb3(){
      const web3 = new Web3("http://127.0.0.1:8545");
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const ProductAuthContract = new web3.eth.Contract(ProductAuthJSON.abi as any, "0xfcE42E27C47542A04F9eA8B80901A477Dc9668D3", {from: accounts[0], gas: 300000})
      setState({
        accounts,
        networkId,
        ProductAuthContract
      })
    }

    loadWeb3()
  }, []);
  
  async function createProduct(){
    const {accounts, ProductAuthContract} = state;
    const {productName, productType} = productInfo;
    const productId = v4();
    setTransactionState("ongoing");
    await ProductAuthContract.methods.addProduct(productName, productType, productId).send({from: accounts[0]});
    const productQrCode = await QrCode.toDataURL(productId);
    setProductInfo({
      productName: "",
      productType: "",
      productId,
      productQrCode
    })
    setTransactionState("idle");
  }

  const {productName, productType, productId, productQrCode} = productInfo;
  
  return (
    <div>
      <TextInput disabled={transactionState === "ongoing"} value={productName} onChange={e=> setProductInfo({...productInfo, productName: e.target.value})} label="Product Name" placeHolder="Set product name" />
      <TextInput disabled={transactionState === "ongoing"} value={productType} onChange={e=> setProductInfo({...productInfo, productType: e.target.value})} label="Product Type" placeHolder="Set product type" />
      <Button disabled={transactionState === "ongoing" || !productName || !productType} onClick={async ()=> {
        createProduct()
      }} content="Create Product"/>
      {transactionState === "ongoing" ? <div className="loader"/> : transactionState === "idle" && productId && productQrCode && <div className="flex flex-col items-center justify-center">
        <span className="font-bold">{productId}</span>
        <img style={{width: 250}} src={productQrCode} alt="Product Qr Code"/>
      </div>}
    </div>
  );
};

export default Index;
