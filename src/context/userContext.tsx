"use client";
import { createContext, useContext, useState, ReactNode } from "react";

import { UserDTO } from "@/types/user";

export const UserContext = createContext<{
  user: UserDTO | null;
  setUser: (user: UserDTO | null) => void;
  userLoaded: boolean;
  setUserLoaded: (state: boolean) => void;
}>({
  user: null,
  setUser: () => {},
  userLoaded: true,
  setUserLoaded: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [userLoaded, setUserLoaded] = useState<boolean>(true);

  return (
    <UserContext.Provider value={{ user, setUser, userLoaded, setUserLoaded }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
