import React, { useContext, useState } from "react"
import QrCode from "qrcode";
import {v4} from "uuid";
import {PDFDownloadLink} from "@react-pdf/renderer";
import { Button, Header, QrCodePdf, TextInput } from "../components"
import { IProduct } from "../types";
import { AuthContext, RootContext } from "../contexts";

export default function Manager(){
  const [transactionState, setTransactionState] = useState<"ongoing" | "idle">("idle");
  // State to store the product related data, this will be filled and displayed when the manager creates a product
  const [productInfo, setProductInfo] = useState<IProduct & {productQrCode: string}>({
    productName: "",
    productType: "",
    productId: "",
    productQrCode: ""
  });

  const {ProductAuthContract, accounts} = useContext(RootContext);
  const {currentUser} = useContext(AuthContext);
  
  async function createProduct(){
    // At first check if the smart contract exists (has been fetched properly)
    if(ProductAuthContract){
      const {productName, productType} = productInfo;
      const productId = v4();
      setTransactionState("ongoing");
      // Calling the addProduct method on ProductAuth.sol file passing the required arguments
      // Product name, type from the state and generate id.
      // send option is required to set which address is doing this transaction, it must be the manager's address or accounts[0]
      await ProductAuthContract.methods.addProduct(productName, productType, productId).send({from: accounts[0]});
      // Generate the QrCode which stores only the product id
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