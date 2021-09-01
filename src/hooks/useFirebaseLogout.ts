import { signOut } from "firebase/auth";
import { useContext } from "react";
import {useSnackbar} from "notistack";
import { useRouter } from "next/router";
import { AuthContext, FirebaseContext } from "../contexts";

export function useFirebaseLogout(){
  const router = useRouter();
  const {enqueueSnackbar} = useSnackbar();
  const {setCurrentUser} = useContext(AuthContext);
  const {auth} = useContext(FirebaseContext);

  async function logout(){
    try {
      await signOut(auth);
      setCurrentUser(null);
      enqueueSnackbar(`Successfully logged out`, { variant: 'success' });
      router.push("/")
    } catch (err: any) {
      enqueueSnackbar(`An error occurred. ${err.error} ${err.code}`, { variant: 'error' });
    }
  }
  
  return {
    logout
  }
}