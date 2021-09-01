import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { createUserWithEmailAndPassword, browserLocalPersistence, setPersistence } from "firebase/auth";
import { FirebaseContext } from "../contexts";
import { IRegisterInput } from "../types";
import { AuthContext } from "../contexts/AuthContext";

export function useFirebaseRegister(){
  const {auth} = useContext(FirebaseContext);
  const { enqueueSnackbar } = useSnackbar();
  const {setCurrentUser} = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [registerInput, setRegisterInput] = useState<IRegisterInput>({
    email: "",
    password: ""
  });
  
  const router = useRouter();

  async function register(){
    setIsLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const { user } = await createUserWithEmailAndPassword(auth, registerInput.email, registerInput.password);
      enqueueSnackbar(`Successfully registered`, { variant: 'success' });
      setCurrentUser(user)
      setRegisterInput({
        email: "",
        password: ""
      });
      setIsLoading(false);
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
      setIsLoading(false);
      enqueueSnackbar(`An error occurred. ${errorMessage}`, { variant: 'error' });
    }
  }

  return {
    registerInput,
    setRegisterInput,
    register,
    isLoading,
    setIsLoading
  }
}