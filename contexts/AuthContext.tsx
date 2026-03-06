import React, { createContext, useEffect, useMemo, useState } from "react";
import { User } from "@/types/interface";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  signUp: (email: string, password: string, userName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInPasswordReset: (resetEmail: string) => Promise<void>;
  clearSuccessMessage: () => void;
  updateUserData: (
    userId: string,
    newEmail: string,
    newPassword: string,
    userName: string
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fireBaseUserStb = {
      id: "stbUserId",
      email: "yohei.kano@rutenya.jp",
      userName: "Yohei Kano",
      password: "password",
    };
    setUser(fireBaseUserStb);
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, userName: string) => {
    setUser({ id: "newUserId", email, userName, password });
  };

  const signIn = async (email: string, password: string) => {
    setUser({ id: "userId", email, userName: "Logged In User", password });
  };

  const signOut = async () => {
    setUser(null);
  };

  const signInPasswordReset = async (_resetEmail: string) => {
    setSuccessMessage(
      "パスワードリセット用のリンクを送信しました。メールをご確認ください。"
    );
  };

  const clearSuccessMessage = () => {
    setSuccessMessage(null);
  };

  const updateUserData = async (
    userId: string,
    newEmail: string,
    newPassword: string,
    userName: string
  ) => {
    setUser({ id: userId, email: newEmail, userName, password: newPassword });
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      error,
      successMessage,
      signUp,
      signIn,
      signOut,
      signInPasswordReset,
      clearSuccessMessage,
      updateUserData,
    }),
    [error, loading, successMessage, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
