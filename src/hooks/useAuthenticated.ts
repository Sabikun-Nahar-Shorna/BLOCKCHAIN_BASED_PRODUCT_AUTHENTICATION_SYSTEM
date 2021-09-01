import router from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts";

export function useAuthenticated(){
  const {currentUser} = useContext(AuthContext);
  useEffect(()=> {
    if(!currentUser){
      router.push('/login');
    }
  })
}