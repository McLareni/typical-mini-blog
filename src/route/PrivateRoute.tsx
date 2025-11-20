"use client";

import { useRouter } from "next/navigation";
import { ReactElement, ReactNode, useEffect } from "react";

import { useUser } from "@/context/userContext";

export default function PrivateRoute({
  children,
}: {
  children: ReactElement;
}): ReactNode {
  const { user, userLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (userLoaded && !user?.accessToken) {
      console.log("go gome");

      router.push("/");
    }
  }, [userLoaded, user, router]);

  console.log(userLoaded, user);
  if (!userLoaded) return null;

  if (!user?.accessToken) return null;

  return children;
}
