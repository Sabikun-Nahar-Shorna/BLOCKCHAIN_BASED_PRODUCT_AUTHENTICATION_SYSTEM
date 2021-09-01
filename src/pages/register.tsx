import { Button, TextInput } from "../components";
import { useFirebaseRegister } from "../hooks";

export default function Register() {
  const {registerInput, setRegisterInput, register} = useFirebaseRegister();

  return <div className="Register w-full border-2 border-black flex items-center flex-col p-5">
    <div className="flex w-full flex-col">
      <TextInput value={registerInput.email} label="Email" placeHolder="Enter your email" onChange={(e)=> setRegisterInput({... registerInput, email: e.target.value})} />
      <TextInput value={registerInput.password} label="Password" placeHolder="Enter your password" onChange={(e)=> setRegisterInput({... registerInput, password: e.target.value})} />
    </div>
    <div className="flex w-full justify-between">
      <Button content="Register" onClick={register}/>
    </div>
  </div>
}