"use client";
import React, { useState } from 'react'
import { db,auth } from '../../firebase/firebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import { Timestamp } from 'firebase/firestore';
export default function Page() {
    const {currentUser}=useAuth();
    const [taskname,setTaskname]=useState("")
    const [taskdesc,setTaskdesc]=useState("")
    const[duedate,setDuedate]=useState("")
    const[loading,setLoading]=useState(false);
    const changeValue=(e)=>{
    const {name,value}=e.target;
    if(name=="taskname")setTaskname(value)
        else if(name=="taskdesc")setTaskdesc(value)
    else if(name=="duedate") setDuedate(value)
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        if(!currentUser) return;
        try{
            setLoading(true)
            const taskRef=collection(db,"users",currentUser.uid,"tasks")
            await addDoc(taskRef,{
                taskname,
                description:taskdesc,
                completed:false,
                duedate: Timestamp.fromDate(new Date(duedate)),
            });
            setLoading(false)
            toast.success("Task added successfully!", {
  style: {
    background: "#0D542B",
  },
});

            setTaskname("");
            setTaskdesc("");
            setDuedate("")
            
        }catch(err){
            console.log(err.message);
        }
        
    }
    if (loading) return <Loading/>
  return (
    
    <div className='h-full'>
        <div className='flex flex-col justify-center items-center h-full gap-2 '>
            <h1 className='text-2xl'>Add tasks here!!</h1>
            <div className='flex flex-col gap-4 p-4 bg-[#FFF2DF] border-0 rounded-xl w-1/2 shadow-md'>
                <label>The title of the Task:</label>
                <input name='taskname' onChange={changeValue} value={taskname} type='text' className='border-2 rounded-2xl p-1' />
                 <label>The description of the Task:</label>
                <input name='taskdesc' type='text' className='border-2 rounded-2xl p-1' value={taskdesc} onChange={changeValue}/>
                <label>Due date</label>
                <input name='duedate' type='date' onChange={changeValue} value={duedate} className='border-2 rounded-2xl p-1'/>
<div className='flex items-center  justify-center w-full '>
                       
                    <button className='shadow-md text-white bg-green-800 text-sm hover:bg-green-900 w-1/2 p-1 border-0 rounded-2xl hover:cursor-pointer' onClick={handleSubmit}>Add it to the List</button>
</div>            </div>
        </div>
    </div>
  )
}
