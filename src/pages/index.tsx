import React from "react";
import {useRouter} from "next/router";
import { Button } from "../components";

const Index = () => {
  const router = useRouter();
  return (
    <div>
      <Button content="User" onClick={()=> router.push("/user")}/>
      <Button content="Manager" onClick={()=> router.push("/manager")}/>
    </div>
  );
};

export default Index;

// 73ec2ae5-7a93-4155-aa77-1d1b3d5f6d8f