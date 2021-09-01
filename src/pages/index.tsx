import React, { useContext } from "react";
import {useRouter} from "next/router";
import { Button } from "../components";
import { AuthContext } from "../contexts";

const Index = () => {
  const {currentUser} = useContext(AuthContext);
  const router = useRouter();
  return (
    <div>
      <Button content="User" onClick={()=> router.push("/user")}/>
      <Button content="Manager" onClick={()=> router.push(currentUser ? "/manager" : "/register")}/>
      <Button content="Login" onClick={()=> router.push("/login")}/>
      <Button content="Register" onClick={()=> router.push("/register")}/>
    </div>
  );
};

export default Index;

// 73ec2ae5-7a93-4155-aa77-1d1b3d5f6d8f