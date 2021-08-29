import { Button, TextInput } from "../components";

export default function Login() {
  return <div className="Login w-full border-2 border-black flex items-center flex-col p-5">
    <div className="flex w-full flex-col">
      <TextInput label="ID" placeHolder="Enter your user id" />
      <TextInput label="Password" placeHolder="password" />
    </div>
    <div className="flex w-full justify-between">
      <Button content="Register" />
      <Button content="Forgot password" />
    </div>
  </div>
}