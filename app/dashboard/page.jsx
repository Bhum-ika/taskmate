"use client";
import React, { useState,useEffect } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
export default function Page() {
const[name,setName]=useState(null);

useEffect(() => {
  
  const storedName=localStorage.getItem("userName");
  if(storedName){
    setName(storedName)
  }
}, []);
  return (


    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to your Dashboard {name ? `, ${name}` : ""}</h1>
        {/* Your task UI here */}
      </div>
    </ProtectedRoute>
  );
};
