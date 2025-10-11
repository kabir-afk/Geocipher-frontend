import { useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const login = (accessToken) => {
    setIsLoggedIn(true);
    setAccessToken(accessToken);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
