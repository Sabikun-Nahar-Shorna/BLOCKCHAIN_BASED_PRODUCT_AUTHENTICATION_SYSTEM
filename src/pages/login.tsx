import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { Button, TextInput } from "../components";
import { FirebaseContext } from "../contexts";
import { AuthContext } from "../contexts/AuthContext";

interface ILoginInput {
  email: string
  password: string,
}

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const {setCurrentUser} = useContext(AuthContext);
  const {auth} = useContext(FirebaseContext);
  const [loginInput, setLoginInput] = useState<ILoginInput>({
    email: "",
    password: ""
  });
  const router = useRouter();
  return <div className="Login w-full border-2 border-black flex items-center flex-col p-5">
    <div className="flex w-full flex-col">
      <TextInput value={loginInput.email} label="Email" placeHolder="Enter your email" onChange={(e)=> setLoginInput({... loginInput, email: e.target.value})} />
      <TextInput value={loginInput.password} label="Password" placeHolder="Enter your password" onChange={(e)=> setLoginInput({... loginInput, password: e.target.value})} />
    </div>
    <div className="flex w-full justify-between">
      <Button content="Register" onClick={async ()=> {
        try {
          const { user } = await signInWithEmailAndPassword(auth, loginInput.email, loginInput.password);
          enqueueSnackbar(`Successfully registered`, { variant: 'success' });
          setCurrentUser(user)
          setLoginInput({
            email: "",
            password: ""
          })
          router.push("/manager")
        } catch (err: any) {
          let errorMessage = 'Unknown error';
          if (err.code === 'auth/email-already-in-use') {
            errorMessage = 'Email already in use.'
          } else if (err.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email used'
          } else if (err.code === 'auth/weak-password') {
            errorMessage = 'Password is weak.'
          }
          enqueueSnackbar(`An error occurred. ${errorMessage}`, { variant: 'error' });
        }
      }}/>
    </div>
  </div>
}