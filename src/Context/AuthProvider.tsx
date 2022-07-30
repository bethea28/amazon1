import React, { useState, createContext, Dispatch, SetStateAction, useEffect } from "react";
import { Hub, Auth } from "aws-amplify";

type Props = {
  children: React.ReactNode;
};

export type AuthData = {
  id: string;
  token: string;
  isLoggedIn: boolean;
  setAuthData: Dispatch<SetStateAction<AuthData>>;
};

const initialData: AuthData = {
  id: '',
  token: '',
  isLoggedIn: false,
  setAuthData: (): void => {},
};

// Create the context 
const AuthContext = createContext<AuthData>(initialData);

const AuthProvider = ({ children }: Props): JSX.Element => {
  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.log("sign in called", data)
          break;
        case "signOut":
          console.log("siggnout called", data)
          break;
        case "signIn_failure":
          console.log("Sign in failure", data);
          break;
      }
    });
  },[]);
  const [authData, setAuthData] = useState<AuthData>(initialData);
  return (
    <AuthContext.Provider value={{ ...authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };