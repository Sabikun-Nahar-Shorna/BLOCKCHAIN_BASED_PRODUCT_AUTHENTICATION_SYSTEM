import React from "react";
import { Button, Header, TextInput } from "../components";
import { useFirebaseLogin } from "../hooks";

export default function Login() {
  const {loginInput, isLoading, setLoginInput, login} = useFirebaseLogin();

  return <div className="Login page relative">
    <Header />
    <div className="w-1/2 flex border-2 p-3 border-gray-900 rounded-md flex-col absolute" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <div className="flex flex-col">
        <TextInput disabled={isLoading} value={loginInput.email} label="Email" placeHolder="Enter your email" onChange={(e)=> setLoginInput({... loginInput, email: e.target.value})} />
        <TextInput disabled={isLoading} type="password" value={loginInput.password} label="Password" placeHolder="Enter your password" onChange={(e)=> setLoginInput({... loginInput, password: e.target.value})} />
      </div>
      <div className="flex justify-between">
        <Button disabled={isLoading} content="Login" onClick={login}/>
      </div>
    </div>
  </div>
}