"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const pathname=usePathname();
 
  const router = useRouter();
  return (
    <aside className="w-64">
      <div className=" flex flex-col p-4   h-full justify-between">
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="font-bold text-2xl">Task manager</h2>
          </div>
          <div className="flex flex-col gap-3">
            <button
              className={`flex p-2 border-2 rounded-3xl hover:font-bold hover:cursor-pointer ${pathname==='/dashboard'?'bg-[#FE8A37] text-white border-[#FE8A37]':''}`}
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Dashboard
            </button>
            <button
              className={`flex p-2 border-2 rounded-3xl hover:font-bold hover:cursor-pointer ${pathname==='/tasks'?'bg-[#FE8A37] text-white border-[#FE8A37]':''}`}
              onClick={() => {
                router.push("/tasks");
              }}
            >
              My tasks
            </button>
            <button
              className={`flex p-2 border-2 rounded-3xl hover:font-bold hover:cursor-pointer ${pathname==='/notifications'?'bg-[#FE8A37] text-white border-[#FE8A37]':''}`}
             onClick={() => {
                router.push("/notifications");
              }}
             >
              Notifications
            </button>
          </div>
        </div>

        <div>
          <button
            className=" p-2 border-0 rounded-3xl hover:font-bold hover:cursor-pointer w-full bg-red-500 text-white"
            onClick={() => {
              localStorage.removeItem("userId");
              localStorage.removeItem("userName");
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
