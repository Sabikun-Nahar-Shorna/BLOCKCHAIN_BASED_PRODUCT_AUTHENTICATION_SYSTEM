import React, { useContext, useState } from "react"
import QrCode from "qrcode";
import {v4} from "uuid";
import { Button, TextInput } from "../components"
import { IProduct } from "../types";
import { RootContext } from "../contexts";

export default function Manager(){
  const [transactionState, setTransactionState] = useState<"ongoing" | "idle">("idle");
  const [productInfo, setProductInfo] = useState<IProduct & {productQrCode: string}>({
    productName: "",
    productType: "",
    productId: "",
    productQrCode: ""
  });

  const {ProductAuthContract, accounts} = useContext(RootContext);
  
  async function createProduct(){
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

  return <div>
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
} 