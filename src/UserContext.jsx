import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    // Try to retrieve userId from local storage on component mount
    return localStorage.getItem('userId') || null;
  });

  const setUserIdHandler = (newUserId) => {
    setUserId(newUserId);
    // Store userId in local storage
    localStorage.setItem('userId', newUserId);
  };

  // Clear local storage on component unmount
  useEffect(() => {
    return () => {
      localStorage.removeItem('userId');
    };
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId: setUserIdHandler }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
