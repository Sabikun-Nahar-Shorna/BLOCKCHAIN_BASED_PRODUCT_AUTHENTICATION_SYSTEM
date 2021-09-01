import { Auth, User } from "firebase/auth";
import { useState, useEffect } from "react";

export function useFirebaseAutoAuth(auth: Auth){
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
  }, [auth]);

  return {
    currentUser,
    setCurrentUser
  }
}