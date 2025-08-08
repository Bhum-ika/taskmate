"use client";
import "./globals.css";
import Sidebar from "./sidebar";
import {AuthProvider} from "../context/AuthContext"
import { usePathname } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactModal from "react-modal";


ReactModal.setAppElement('#root')


export default function RootLayout({ children }) {
const pathname=usePathname();
const NoSidebarRoutes=['/','/signup','/login'];
const hideSidebar=NoSidebarRoutes.includes(pathname)  //pathname current path bata raha hai

  return (
    <html lang="en" >
      
      <body className="font-body" >
        <div id="root" className="flex min-h-screen">
           <AuthProvider>{
            hideSidebar?
               <main className="flex-1  bg-[#FFF2DF]">
           
              {children}
              </main>
           :
            <>
 <Sidebar />
          <main className="flex-1 p-4 bg-purple-100">
           
              {children}
              </main>
       </>
            }
             <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
         
              </AuthProvider>
        </div>
      </body>
    </html>
  );
}
