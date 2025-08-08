"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { use, useEffect, useState } from "react";
import { auth,db } from "../../firebase/firebaseConfig";
import loginImg from "../../public/login.gif";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
//import { getMessagingInstance } from '../../firebase/firebaseClient'
import { getToken } from 'firebase/messaging'
import { getMessagingInstance } from "../../firebase/firebaseClient";
import { setDoc,doc } from "firebase/firestore";


export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;

   

    if (name == "email") setEmail(value);
    else if (name == "password") setPassword(value);
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const uid = userCredential.user.uid;
    localStorage.setItem("userName", userCredential.user.displayName);
    localStorage.setItem("userId", uid);

    
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const messaging = getMessagingInstance();
      const token = await getToken(messaging, {
        vapidKey: "BEcjoOC4fYdvOZ2TD-BdQrbpM0lICnnxPlM19l3_nl5WYiqOWoFdmz8-4KrlhlvZXo1kBADMbkz6lBba6trd7XY"
      });

      if (token) {
        await setDoc(doc(db, "users", uid), { fcmToken: token }, { merge: true });
        console.log("✅ FCM Token saved:", token);
      }
    } else {
      console.log("🔕 Notification permission denied.");
    }

    setLoading(false);
    router.push("/dashboard");
  } catch (err) {
    console.log(err.message);
    setLoading(false);
  }
};

  
  return (
    <div className="h-full flex w-full justify-evenly">
      <div className="flex items-center justify-center w-4/12 ">
        <form
          className="flex flex-col w-full  gap-4 border-2 rounded-lg p-4 "
          onSubmit={handleSubmit}
        >
          <label>Enter your emailID: </label>
          <input
            className="border-2 rounded-3xl p-1"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <label>Enter your Password: </label>
          <input
            className="border-2 rounded-3xl p-1 "
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <div className="py-10 ">
            <button
              type="submit"
              className="border-0 text-sm py-2 w-full rounded-2xl bg-[#FE8A37]"
            >
              Login
            </button>
          </div>{" "}
        </form>
      </div>
      <div className="h-full w-1/4 flex justify-center">
        <Image src={loginImg} alt="img" />
      </div>
    </div>
  );
}
