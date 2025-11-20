"use client";

import { useRouter } from "next/navigation";

import { useUser } from "@/context/userContext";
import { formatterDate } from "@/utils/function/formatterDate";

export function UserInfo() {
  const { user, setUser, setUserLoaded } = useUser();
  const router = useRouter();

  const formattedDate = formatterDate("ONLY_DATE", user?.createdAt);

  const logout = () => {
    setUser(null);
    setUserLoaded(false);
    router.push("/");
  };

  return (
    <div>
      <h3>{user?.name}</h3>
      <p>{user?.email}</p>
      <p>With us: {formattedDate}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
