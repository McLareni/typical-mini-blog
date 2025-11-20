"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useUser } from "@/context/userContext";
import {
  validateLogin,
  validateRegistration,
} from "@/utils/validation/loginValidation";

import FormInput from "../UI/FormInput.tsx/FormInput";

import styles from "./LoginFrom.module.css";

export default function Form() {
  const router = useRouter();
  const { setUser, user, setUserLoaded } = useUser();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

  useEffect(() => {
    if (user?.accessToken) {
      router.push("/profile");
    }
  }, [user, router]);

  if (user?.accessToken) {
    return null;
  }

  const loginFn = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const validation = validateLogin(login, password);

    if (validation.valid) {
      try {
        const res = await fetch(`/api/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login, password }),
        });
        if (res.ok) {
          const user = await res.json();
          setUser(user);
          setUserLoaded(true);
          router.push("/profile");
          alert("Login successful!");
        }
      } finally {
      }
    } else {
      alert(`${validation.error}`);
    }

    setIsLoading(false);
  };

  const registerFn = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const validation = validateRegistration(login, password, name, repassword);
    if (validation.valid) {
      try {
        const res = await fetch(`/api/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login, password, name, repassword }),
        });

        if (res.ok) {
          alert("Registration successful! You can now log in.");
          setIsLoginMode(true);
        }
      } finally {
      }
    } else {
      alert(`${validation.error}`);
    }

    setIsLoading(false);
  };

  return (
    <>
      <form
        onSubmit={isLoginMode ? loginFn : registerFn}
        className={styles.form}
      >
        <div className={styles.inputs}>
          <FormInput
            label="Login"
            type="text"
            value={login}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLogin(e.target.value);
            }}
            id="login"
          />
          <FormInput
            label="Password"
            value={password}
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            id="password"
          />
        </div>
        {!isLoginMode && (
          <div className={styles.inputs}>
            <FormInput
              label="Name"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
              id="name"
            />
            <FormInput
              label="Repeat Password"
              value={repassword}
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRepassword(e.target.value);
              }}
              id="repassword"
            />
          </div>
        )}
        <button type="submit" disabled={isLoading}>
          {isLoginMode ? "Login" : "Registration"}
        </button>
      </form>

      <button
        className={styles.toogles}
        onClick={() => setIsLoginMode(!isLoginMode)}
      >
        {isLoginMode
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </>
  );
}
