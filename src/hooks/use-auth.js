import React, {useContext, useEffect, useState} from 'react';

const authContext = React.createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') ?? null) ?? null;
    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
  }, []);

  const login = async (email, password) => {
    const user = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({email, password})
    }).then(res => res.json()).then(res => res.data);
    if (user?.role === 'customer') {
      throw new Error('not authorized');
    }
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  return {user, login, logout};
};

export const ProvideAuth = ({children}) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
