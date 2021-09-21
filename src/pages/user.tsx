import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { TextInput, Button, ProductDisplay, Header } from "../components";
import { RootContext } from "../contexts";
import { IProduct } from "../types";

export default function User(){
  const [fetchedProductId, setFetchedProductId] = useState<null | string>(null)
  const [fetchedProduct, setFetchedProduct] = useState<IProduct | null>(null);
  const {ProductAuthContract, accounts} = useContext(RootContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fetchProductByIdCallback = useCallback(async (_fetchedProductId: string) => {
    if(_fetchedProductId && ProductAuthContract){
      setIsLoading(true);
      const fetchProductByIdData = await ProductAuthContract.methods.fetchProductById(_fetchedProductId).call({
        from: accounts[0]
      });
      if(fetchProductByIdData[0] === ""){
        setIsError(true);
      } else {
        setFetchedProduct({
          productId: fetchProductByIdData[2],
          productName: fetchProductByIdData[0],
          productType: fetchProductByIdData[1],
        });
        setIsError(false);
      }
      setIsLoading(false);
    }
  }, [ProductAuthContract, accounts]);

  function tick(_cameraOn: boolean) {
    const canvas = canvasRef.current!.getContext("2d");
    if (_cameraOn && canvas && canvasRef.current && videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      canvasRef.current.height = videoRef.current.videoHeight;
      canvasRef.current.width = videoRef.current.videoWidth;
      canvas.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageData = canvas.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        setCameraOn(false);
        fetchProductByIdCallback(code.data);
      }
      requestAnimationFrame(()=> {
        tick(_cameraOn)
      });
    }
  }

  useEffect(() => {
    if(videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((stream) => {
        if(cameraOn) {
          videoRef.current!.srcObject = stream;
          videoRef.current!.play();
          requestAnimationFrame(()=> {
            tick(cameraOn)
          });
        } else {
          stream.getTracks().forEach((track) => {
            if (track.readyState === 'live' && track.kind === 'video') {
              track.stop();
            }
          });
          videoRef.current!.srcObject = null;
        }
      });
    }

    return () => {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((stream) => {
        stream.getTracks().forEach((track) => {
          if (track.readyState === 'live' && track.kind === 'video') {
            track.stop();
          }
        });
      })
    }
  }, [cameraOn]);

  return <div>
    <Header />
    <div className="p-2">
      <TextInput value={fetchedProductId ?? ''} onChange={(e)=> setFetchedProductId(e.target.value)} label="Id" placeHolder="Product id"/>
      <Button onClick={()=> fetchProductByIdCallback(fetchedProductId!)} content="Fetch Product" disabled={isLoading}/>
      <Button onClick={()=> setCameraOn(_cameraOn=>!_cameraOn)} content="Scan QR Code"/>
      {fetchedProduct && !isLoading && !isError && <ProductDisplay product={fetchedProduct}/>}
      {isError && <div className="font-bold text-xl text-red-500 text-center">No product with that id exists</div>}
      <canvas ref={canvasRef} style={{display: 'none'}}/>
      <video ref={videoRef}/>
    </div>
  </div>
}
