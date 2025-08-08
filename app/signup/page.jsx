"use client"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  useState } from "react";
import { auth,db } from "../../firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";

import React from 'react'
import { setDoc ,doc} from "firebase/firestore";


export default function Page() {

   const [username,setUsername]=useState("");
   const[email,setEmail]=useState("");
   const[password,setPassword]=useState("");
   const[loading,setLoading]=useState(false);
   const handleChange=async(e)=>{
    const{name,value}=e.target;

    if(name=="username") setUsername(value);
    else if(name=="email") setEmail(value);
    else if(name=="password") setPassword(value);
   }
   const handleSubmit=async(e)=>{
    e.preventDefault();
   
        
    try{
      setLoading(true);
       const userCredential=await createUserWithEmailAndPassword(auth,email,password);
       await updateProfile(userCredential.user,{
        displayName:username
       })
        window.alert("User created:"+userCredential.user.displayName)
        const user=userCredential.user;
        await setDoc(doc(db,"users",user.uid),{
           uid: user.uid,
      name: username,
      email: user.email,
        });
    }
    catch(err){
        console.log(err.message);
    }
    setLoading(false);
   }
  return (
    <div className="h-full flex justify-center">
        <div className="flex items-center w-full justify-center">
          {loading?(<div className="text-9xl">Loading....
            </div>):(  <form className="flex flex-col w-1/3 gap-4 border-4 p-4 " onSubmit={handleSubmit}>
      <label>Enter your name:</label>
      <input className="border-2 rounded-3xl p-1 " 
        type="text" 
        name="username" 
        value={username} 
        onChange={handleChange}
      />
      
      <label>Enter your emailID:  </label>
        <input className="border-2 rounded-3xl p-1"
          type="email" 
          name="email" 
          value={email} 
         onChange={handleChange}
        />
      
        <label>Enter your Password:  </label>
        <input className="border-2 rounded-3xl p-1"
          type="password" 
          name="password" 
          value={password} 
          onChange={handleChange}
        />
      
<div className="py-10">
            <input type="submit" className="border-2 text-sm p-1 w-full rounded-2xl " />
</div>    </form>)}
        </div>
    </div>
  )
}
