"use client";
import { createContext, useContext, useState, ReactNode } from "react";

import { UserDTO } from "@/types/user";

export const UserContext = createContext<{
  user: UserDTO | null;
  setUser: (user: UserDTO) => void;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
