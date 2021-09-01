import React, { useContext } from "react"
import {useRouter} from "next/router";
import { AuthContext } from "../contexts";
import { Button } from "./Button";
import { useFirebaseLogout } from "../hooks";

export function Header(){
  const {currentUser} = useContext(AuthContext);
  const router = useRouter();
  const {logout} = useFirebaseLogout()

  return <div className="Header flex bg-gray-900 p-2 mb-5">
    {currentUser ? <>
      <Button variant="secondary" content="Logout" onClick={()=> {
        logout();
      }}/>
    </> : <>
      <Button variant="secondary" content="Login" onClick={()=> router.push("/login")}/>
      <Button variant="secondary" content="Register" onClick={()=> router.push("/register")}/>
    </>}
  </div>
}