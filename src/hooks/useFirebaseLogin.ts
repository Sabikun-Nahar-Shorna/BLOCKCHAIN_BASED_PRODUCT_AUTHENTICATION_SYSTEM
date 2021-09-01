import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseContext } from "../contexts";
import { ILoginInput } from "../types";
import { AuthContext } from "../contexts/AuthContext";

export function useFirebaseLogin(){
  const {auth} = useContext(FirebaseContext);
  const { enqueueSnackbar } = useSnackbar();
  const {setCurrentUser} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [loginInput, setLoginInput] = useState<ILoginInput>({
    email: "",
    password: ""
  });
  
  const router = useRouter();

  async function login(){
    setIsLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const { user } = await signInWithEmailAndPassword(auth, loginInput.email, loginInput.password);
      enqueueSnackbar(`Successfully logged in`, { variant: 'success' });
      setCurrentUser(user)
      setLoginInput({
        email: "",
        password: ""
      })
      router.push("/manager")
      setIsLoading(false);
    } catch (err: any) {
      let errorMessage = 'Unknown error';
      if (err.code === 'auth/wrong-password') {
        errorMessage = 'Wrong password'
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email used'
      } else if (err.code === 'auth/user-disabled') {
        errorMessage = 'User has been disabled'
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'User not found'
      }
      enqueueSnackbar(`An error occurred. ${errorMessage}`, { variant: 'error' });
      setIsLoading(false);
    }
  }

  return {
    loginInput,
    setLoginInput,
    login,
    isLoading,
    setIsLoading
  }
}