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
    Hub.listen("auth", ({ payload: { event, data } }) => {

      let  { userId, jwtToken, username } = {userId:'', jwtToken:'', username:''}
      
      switch (event) {
        case "signIn":
          ({ username: username, attributes: {sub: userId }, signInUserSession: {accessToken: {jwtToken: jwtToken}}} = data); 
          setAuthData(prevState => {
            return {...prevState, id: userId, token: jwtToken, username: username, isLoggedIn: true}
          })
          break;
          case "signUp":
          ({ userSub:userId, user: { username:username }} = data);
          setAuthData(prevState => {
            return {...prevState, id: userId, username: username, isLoggedIn: true}
          })
          break;
        case "signOut":
          setAuthData(prevState => {
            return {...prevState, id: '', token: '', username: '', isLoggedIn: false}
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