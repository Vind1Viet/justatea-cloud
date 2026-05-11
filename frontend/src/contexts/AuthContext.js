import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userName: '', 
    userId: '',
    accessToken: '', 
    role: ''
  });

  const login = (userName, userId, accessToken, role) => {
    setAuth({ userName, userId, accessToken, role });
    localStorage.setItem('token', accessToken);
  };

  const logout = () => {
    setAuth({ userName: '', userId: '', accessToken: '', role: '' });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
