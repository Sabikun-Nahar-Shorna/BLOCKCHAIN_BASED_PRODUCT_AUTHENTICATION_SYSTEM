import React, { useContext, useState } from "react"
import QrCode from "qrcode";
import {v4} from "uuid";
import {PDFDownloadLink} from "@react-pdf/renderer";
import { Button, Header, QrCodePdf, TextInput } from "../components"
import { IProduct } from "../types";
import { AuthContext, RootContext } from "../contexts";

export default function Manager(){
  const [transactionState, setTransactionState] = useState<"ongoing" | "idle">("idle");
  const [productInfo, setProductInfo] = useState<IProduct & {productQrCode: string}>({
    productName: "",
    productType: "",
    productId: "",
    productQrCode: ""
  });

  const {ProductAuthContract, accounts} = useContext(RootContext);
  const {currentUser} = useContext(AuthContext);
  
  async function createProduct(){
    if(ProductAuthContract){
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
  }

  const {productName, productType, productId, productQrCode} = productInfo;

  return <div>
    <Header />
    <div className="p-2">
      <div className="mb-5">
        <TextInput disabled={transactionState === "ongoing"} value={productName} onChange={e=> setProductInfo({...productInfo, productName: e.target.value})} label="Name" placeHolder="Product name" />
        <TextInput disabled={transactionState === "ongoing"} value={productType} onChange={e=> setProductInfo({...productInfo, productType: e.target.value})} label="Type" placeHolder="Product type" />
      </div>
      <div className="flex justify-between">
        <Button disabled={!currentUser || transactionState === "ongoing" || !productName || !productType} onClick={async ()=> {
          createProduct()
        }} content="Create Product"/>
      </div>
      {transactionState === "ongoing" ? <div className="loader"/> : transactionState === "idle" && productId && productQrCode && <div className="flex flex-col items-center justify-center">
        <span className="font-bold">{productId}</span>
        <img style={{width: 250}} src={productQrCode} alt="Product Qr Code"/>
        <PDFDownloadLink fileName={`${productId}.pdf`} document={<QrCodePdf productId={productId} productQrCode={productQrCode}/>}>
          {({loading}) =>
            <Button disabled={loading} content="Generate PDF"/>
          }
        </PDFDownloadLink>
      </div>}
    </div>
  </div>
} 