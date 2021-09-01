import React from "react";
import { Button, Header, TextInput } from "../components";
import { useFirebaseRegister } from "../hooks";

export default function Register() {
  const {registerInput, isLoading, setRegisterInput, register} = useFirebaseRegister();

  return <div className="Register page relative">
    <Header />
    <div className="sm:w-1/2 w-3/4 flex border-2 p-3 border-gray-900 rounded-md flex-col absolute" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <div className="flex flex-col">
        <TextInput disabled={isLoading} value={registerInput.email} label="Email" placeHolder="Enter your email" onChange={(e)=> setRegisterInput({... registerInput, email: e.target.value})} />
        <TextInput disabled={isLoading} type="password" value={registerInput.password} label="Password" placeHolder="Enter your password" onChange={(e)=> setRegisterInput({... registerInput, password: e.target.value})} />
      </div>
      <div className="flex justify-between">
        <Button className="m-0" disabled={isLoading} content="Register" onClick={register}/>
      </div>
    </div>
  </div>
}