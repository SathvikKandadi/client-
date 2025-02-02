import React, { createContext, useContext, useState } from 'react';

type UserContextType = {
  userId: string | null;
  userRole: string | null;
  setUserId: (id: string | null) => void;
  setUserRole: (role: string | null) => void;
};

const UserContext = createContext<UserContextType>({
  userId: null,
  userRole: null,
  setUserId: () => {},
  setUserRole: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const value = {
    userId,
    setUserId,
    userRole,
    setUserRole,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
} 