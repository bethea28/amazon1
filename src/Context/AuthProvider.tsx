import React, { useState, createContext, Dispatch, SetStateAction } from "react";

type Props = {
  children: React.ReactNode;
};
export type AuthData = {
  id: string;
  token: string
  setAuthData: Dispatch<SetStateAction<AuthData>>;
};
const initialData: AuthData = {
  id: '',
  token: '',
  setAuthData: (): void => {},
};

// Create the context 
const AuthContext = createContext<AuthData>(initialData);

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [authData, setAuthData] = useState<AuthData>(initialData);
  return (
    <AuthContext.Provider value={{ ...authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };