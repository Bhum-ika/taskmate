"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, deleteDoc, doc,getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Loading from "../../components/Loading";
import { FiTrash2 } from "react-icons/fi";
import ReactModal from "react-modal";


export default function Page() {
  const router = useRouter();
  const [alltasks, setAlltasks] = useState([]);
  const [loading,setLoading]=useState(false);
  const[isOpen,setIsOpen]=useState(false);
 const [selectedTaskId, setSelectedTaskId] = useState(null);

  const openModal=()=>setIsOpen(true);
    const closeModal=()=>setIsOpen(false);

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    console.log(uid)
    const getDocuments = async () => {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(
          collection(db, "users", uid, "tasks")
        );
        const tasksArray = [];
        querySnapshot.forEach((doc) => {
          //console.log(doc.data());
          tasksArray.push({ id: doc.id, ...doc.data() });
          
        });
        setAlltasks(tasksArray);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    getDocuments();
  }, []);

  const toggleCompleted = async (taskid, newStatus) => {
    const uid = localStorage.getItem("userId");
    try {
      const taskref = doc(db, "users", uid, "tasks", taskid);
      await updateDoc(taskref, { completed: newStatus });

      setAlltasks((prev) =>
        prev.map((task) =>
          task.id === taskid ? { ...task, completed: newStatus } : task
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteTask=async(taskid)=>{
        const uid = localStorage.getItem("userId");
try{
  const taskRef=doc(db,"users",uid,"tasks",taskid);
  await deleteDoc(taskRef);
  setAlltasks((prev) => prev.filter((task) => task.id !== taskid));
}catch(err){
  console.log(err.message)
}
 closeModal();
  }
  if (loading) return <Loading/>

  return (
    <div className="flex flex-col  justify-between h-full">
      <div>
        {alltasks.length > 0 ? (
          <div>
            {alltasks.map((task) => (
              <div
                key={task.id}
                className="border-2 p-2 rounded-2xl mb-2 flex flex-col gap-2"
              >
                <p className="font-semibold">{task.taskname}</p>
                <p className="text-sm">{task.description}</p>
                <p className="text-sm text-gray-500">
  Due: {task.duedate?.toDate?.().toLocaleDateString() || "No due date"}
</p>

               <form
  className="flex justify-end gap-6 align-baseline"
  onSubmit={(e) => e.preventDefault()} // prevent form submit on any button click
>
 <button
  type="button"
  onClick={() => {
    setSelectedTaskId(task.id);
    openModal();
  }}
>
    <FiTrash2 className="text-red-500 cursor-pointer text-md  hover:text-red-600 hover:text-lg transition-all ease-in-out delay-100 hover:translate-x-1" />
  </button>

                 <div className="flex gap-2">
                   <label className="text-green-800 text-sm">Completed</label>
                  <input
                    type="checkbox"
                    checked={task.completed || false}
                    onChange={(e) => 
                      toggleCompleted(task.id, e.target.checked)
                    }
                  />
                 </div>
                </form>
              </div>
            ))}
          </div>
        ) : (
          <div>No tasks</div>
        )}
      </div>
     <div>
         <button  className="border-0 w-1/12 text-sm rounded-2xl text-center p-1 bg-green-800 text-white hover:cursor-pointer hover:font-semibold"
        onClick={() => {
          setLoading(true);
          router.push("/addtask");
          setLoading(false);
        }}
      >
        Add Tasks
      </button>
      <ReactModal
  isOpen={isOpen}
  onRequestClose={closeModal}
  contentLabel="Confirm Delete"
  overlayClassName="fixed inset-0 bg-black/70  flex items-center justify-center z-50"
  className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md mx-auto"
 >
  <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
  <p className="mb-6 text-sm text-gray-600">This task will be permanently deleted.</p>
  <div className="flex justify-end gap-4">
    <button
      className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-sm"
      onClick={closeModal}
    >
      Cancel
    </button>
    <button
      className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm"
      onClick={() => deleteTask(selectedTaskId)}
    >
      Delete
    </button>
  </div>
</ReactModal>

     </div>
    </div>
  );
}
