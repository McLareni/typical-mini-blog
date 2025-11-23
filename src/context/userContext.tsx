"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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

  const changeUser = (user: UserDTO | null) => {
    if (user) {
      setUser({ ...user });
      localStorage.setItem("token", user?.accessToken || "");
    } else {
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const getUser = async (token: string) => {
      setUserLoaded(false);
      const response = await fetch(`/api/user/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();

        setUser({ ...user });
      }

      setUserLoaded(true);
    };

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        getUser(token);
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser: changeUser, userLoaded, setUserLoaded }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
