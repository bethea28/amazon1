import React, { useState, createContext, Dispatch, SetStateAction, useEffect } from "react";
import { Hub, Auth } from "aws-amplify";

type Props = {
  children: React.ReactNode;
};

export type AuthData = {
  id: string | null;
  username: string | null;
  token: string | null;
  isLoggedIn: boolean | null;
  setAuthData: Dispatch<SetStateAction<AuthData>>;
};

const initialData: AuthData = {
  id: '',
  username: '',
  token: '',
  isLoggedIn: false,
  setAuthData: (): void => {},
};

// Create the context 
const AuthContext = createContext<AuthData>(initialData);

const AuthProvider = ({ children }: Props): JSX.Element => {
  useEffect(() => {
    console.log("useEffect used")
    Hub.listen("auth", ({ payload: { event, data } }) => {
      const id = data.attributes.sub
      const jwtToken = data.getSignInUserSession().getAccessToken().getJwtToken()
      const userName = data.username
      switch (event) {
        case "signIn":
          setAuthData(prevState => {
            return {...prevState, ['id']: id, ['token']: jwtToken, ['username']: userName, ['isLoggedIn']: true}
          })
          break;
          case "signUp":
          setAuthData(prevState => {
            return {...prevState, ['id']: id, ['token']: jwtToken, ['username']: userName, ['isLoggedIn']: true}
          })
          break;
        case "signOut":
          setAuthData(prevState => {
            return {...prevState, ['id']: null, ['token']: null, ['username']: null, ['isLoggedIn']: false}
          })
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