import {User} from "firebase/auth";
import React from "react";

export interface IAuthContext{
  currentUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const AuthContext = React.createContext<IAuthContext>({
} as any)