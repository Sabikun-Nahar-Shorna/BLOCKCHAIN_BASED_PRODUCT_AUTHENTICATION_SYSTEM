import React, { useContext } from "react";
import {useRouter} from "next/router";
import { Button, Header } from "../components";
import { AuthContext } from "../contexts";

const Index = () => {
  const {currentUser} = useContext(AuthContext);
  const router = useRouter();
  return (
    <div>
      <Header />
      <div className="p-2">
        <Button content="User" onClick={()=> router.push("/user")}/>
        <Button content="Manager" onClick={()=> router.push(currentUser ? "/manager" : "/login")}/>
      </div>
    </div>
  );
};

export default Index;