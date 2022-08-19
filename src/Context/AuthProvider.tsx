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

<<<<<<< HEAD
// Create the context
=======
>>>>>>> main
const AuthContext = createContext<AuthData>(initialData);

const AuthProvider = ({ children }: Props): JSX.Element => {
  useEffect(() => {
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
            return {...prevState, ['id']: id, ['token']: jwtToken, ['username']: userName, ['isLoggedIn']: false}
          })
          break;
        case "signIn_failure":
          console.log("Sign in failure", data);
          break;
      }
    });
  },[]);
  const [authData, setAuthData] = useState<AuthData>(initialData);
<<<<<<< HEAD
  useEffect(() => {
    return Hub.listen('auth', (data) => {
      const { payload } = data;
      console.log(data);
      //setAuthData
    })
  });
=======

>>>>>>> main
  return (
    <AuthContext.Provider value={{ ...authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };