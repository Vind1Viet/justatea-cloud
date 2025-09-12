import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userName: '', 
    userId: '',
    accessToken: '', 
    role: ''
  });

  const login = (userName, userId, accessToken, role) => {
    setAuth({ userName, userId, accessToken, role });
  };

  const logout = () => {
    setAuth({ userName: '', userId: '', accessToken: '', role: '' });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;