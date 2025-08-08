// src/components/ProtectedRoute.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser) {
    return <div>Loading...</div>; // or a spinner
  }

  return children;
};

export default ProtectedRoute;
