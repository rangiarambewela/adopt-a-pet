import React, { useState, useEffect } from "react";
import { checkAuthentication } from "../utils/authUtils";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const authenticate = async () => {
    setIsAuthenticating(true);
    const user_data = await checkAuthentication(user);
    setUser(user_data);
    setIsAuthenticating(false);
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticating, setIsAuthenticating }}
    >
      {children}
    </AuthContext.Provider>
  );
}
