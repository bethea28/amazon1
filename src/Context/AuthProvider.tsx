import React, { useState, createContext, Dispatch, SetStateAction, useEffect } from "react";
import { Hub, Auth } from "aws-amplify";

type Props = {
  children: React.ReactNode;
};

export type AuthData = {
  id: string;                                       // The userId
  username: string                                  // The username of the user
  token: string;                                    // The jwt token
  isLoggedIn: boolean;                              // Checks if the user is logged in
  firstName: string                                 // The user's first name
  setAuthData: Dispatch<SetStateAction<AuthData>>;  // Used to set the variables above
};

const initialData: AuthData = {
  id: '',
  username: '',
  token: '',
  isLoggedIn: false,
  firstName: '',
  setAuthData: (): void => {},
};

/** Create the context */
const AuthContext = createContext<AuthData>(initialData);

const AuthProvider = ({ children }: Props): JSX.Element => {
  useEffect(() => {
    console.log("auth Provider called")
    Hub.listen("auth", ({ payload: { event, data } }) => {

      const userId = data.attributes.sub;
      let jwtToken = data.signInUserSession.accessToken.jwtToken;
      const username = data.username;
      
      switch (event) {
        case "signIn":
          jwtToken = data.signInUserSession.accessToken.jwtToken;
          setAuthData(prevState => {
            return {...prevState, ['id']: userId, ['token']: jwtToken, ['username']: username, ['isLoggedIn']: true}
          })
          break;
          case "signUp":
          setAuthData(prevState => {
            return {...prevState, ['id']: userId, ['username']: username, ['isLoggedIn']: true}
          })
          break;
        case "signOut":
          setAuthData(prevState => {
            return {...prevState, ['id']: '', ['token']: '', ['username']: '', ['isLoggedIn']: false}
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