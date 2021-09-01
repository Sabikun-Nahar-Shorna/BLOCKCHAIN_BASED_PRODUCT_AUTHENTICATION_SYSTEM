import { Button, TextInput } from "../components";
import { useFirebaseLogin } from "../hooks";

export default function Login() {
  const {loginInput, setLoginInput, login} = useFirebaseLogin();

  return <div className="Login w-full border-2 border-black flex items-center flex-col p-5">
    <div className="flex w-full flex-col">
      <TextInput value={loginInput.email} label="Email" placeHolder="Enter your email" onChange={(e)=> setLoginInput({... loginInput, email: e.target.value})} />
      <TextInput value={loginInput.password} label="Password" placeHolder="Enter your password" onChange={(e)=> setLoginInput({... loginInput, password: e.target.value})} />
    </div>
    <div className="flex w-full justify-between">
      <Button content="Register" onClick={login}/>
    </div>
  </div>
}