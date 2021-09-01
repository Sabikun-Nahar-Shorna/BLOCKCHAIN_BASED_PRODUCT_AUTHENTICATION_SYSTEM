import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import React from "react";

export interface IFirebaseContext{
  app: FirebaseApp,
  auth: Auth
}

export const FirebaseContext = React.createContext<IFirebaseContext>({ } as any)