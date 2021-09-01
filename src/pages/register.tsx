import { Button, TextInput } from "../components";
import { useFirebaseRegister } from "../hooks";

export default function Register() {
  const {registerInput, setRegisterInput, register} = useFirebaseRegister();

  return <div className="Register page relative">
    <div className="w-1/2 flex border-2 p-3 border-gray-900 rounded-md flex-col absolute" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <div className="flex flex-col">
        <TextInput value={registerInput.email} label="Email" placeHolder="Enter your email" onChange={(e)=> setRegisterInput({... registerInput, email: e.target.value})} />
        <TextInput type="password" value={registerInput.password} label="Password" placeHolder="Enter your password" onChange={(e)=> setRegisterInput({... registerInput, password: e.target.value})} />
      </div>
      <div className="flex justify-between">
        <Button content="Register" onClick={register}/>
      </div>
    </div>
  </div>
}