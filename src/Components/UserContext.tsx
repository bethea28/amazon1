import React, { createContext} from "react";
import User from "./types";

const UserContext = createContext<{
  user: User | undefined;
  setUser: (u: User | undefined) => void}>({
    user: undefined,
    setUser: () => {}
  })

export const useUser = () => React.useContext(UserContext);
export default UserContext;