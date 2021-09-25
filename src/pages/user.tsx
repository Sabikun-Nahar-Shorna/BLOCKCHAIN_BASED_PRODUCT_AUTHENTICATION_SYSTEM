import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { TextInput, Button, ProductDisplay, Header } from "../components";
import { RootContext } from "../contexts";
import { IProduct } from "../types";

export default function User(){
  const [fetchedProductId, setFetchedProductId] = useState<null | string>(null)
  // State to store the fetched product data
  const [fetchedProduct, setFetchedProduct] = useState<IProduct | null>(null);
  const {ProductAuthContract, accounts} = useContext(RootContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  // Function to fetch a product using its id, by calling the appropriate method on ProductAuth.sol smart contract
  const fetchProductByIdCallback = useCallback(async (_fetchedProductId: string) => {
    if(_fetchedProductId && ProductAuthContract){
      setIsLoading(true);
      // Calling the fetchProductById method on the ProductAuth smart contract and pass the from option (address) to the first account's (manager) address 
      const fetchProductByIdData = await ProductAuthContract.methods.fetchProductById(_fetchedProductId).call({
        from: accounts[0]
      });
      // If the id is invalid then the method will not return anything, which will trigger an error
      if(fetchProductByIdData[0] === ""){
        setIsError(true);
      } else {
        // Otherwise a product with that id exists
        // now we need to extract the fetched data
        // and store it in the state
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

  // This function is called when the component unmounts
  // To reset the state variables
  // To remove any event listeners
  // To stop playing video tracks
  const cleanUpCallback = useCallback(() => {
    if(videoRef.current)
      videoRef.current!.srcObject = null;
    cancelAnimationFrame(animationFrameRef.current)
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((stream) => {
      stream.getTracks().forEach((track) => {
        if (track.readyState === 'live' && track.kind === 'video') {
          track.stop();
        }
      });
    })
  }, [])

  // This function is called at every event loop
  // Populate the canvas using data from the video stream
  // Extract the image data from the canvas
  // Check for qrcode in the image data
  // If found, 
    // turn the camera off
    // Fetch the product using the id, stored in the qrcode
  function tick(_cameraOn: boolean) {
    const canvas = canvasRef.current!.getContext("2d");
    if (canvas && canvasRef.current && videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      canvasRef.current.height = videoRef.current.videoHeight;
      canvasRef.current.width = videoRef.current.videoWidth;
      canvas.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageData = canvas.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        cleanUpCallback();
        setCameraOn(false);
        fetchProductByIdCallback(code.data);
      }
    }
    if(_cameraOn){
      animationFrameRef.current = requestAnimationFrame(()=> {
        tick(_cameraOn)
      });
    }
  }

  useEffect(() => {
    if(videoRef.current) {
      // Access the users camera and feed the stream to the video element 
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((stream) => {
        if(cameraOn) {
          videoRef.current!.srcObject = stream;
          videoRef.current!.play();
          animationFrameRef.current = requestAnimationFrame(()=> {
            tick(cameraOn)
          });
        } else {
          cleanUpCallback();
        }
      });
    }

    return () => {
      cleanUpCallback();
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
