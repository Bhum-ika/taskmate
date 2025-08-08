import Image from "next/image";
import img from "../public/img.png";
import Link from "next/link";

export default function Home() {
  
  return (

    <div className="min-h-screen flex flex-col">
      <div className="flex justify-around flex-1">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-4xl font-heading font-bold text-[#3E4E78] ">
              Welcome to TaskMate
            </h1>
            <p className="">
              Organize tasks effortlessly, collaborate seamlessly — all in one
              playful workspace.
            </p>
          </div>
          <div className="w-full  flex justify-center space-x-8">
            <Link href="/login" className="bg-[#3E4E78] py-2 text-center  w-1/4 text-white border-0 rounded-md text-sm shadow-md hover:font-bold hover:cursor-pointer">
             Login</Link>
            
            <Link href="/signup" className="bg-[#3E4E78] py-2 text-center  w-1/4 text-white border-0 rounded-md text-sm shadow-md hover:font-bold hover:cursor-pointer" >
              Sign Up</Link>

          </div>
        </div>

        <div className="flex items-center justify-center">
          <Image src={img} width={500} alt="img" className="border-0 rounded-4xl" />
        </div>
      </div>
      {/* <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-5xl mx-auto px-4">
  <div className="p-4 border rounded-xl shadow-sm">
    <h3 className="text-lg font-semibold">📋 Simple Task Creation</h3>
    <p className="text-sm text-gray-500">Add, edit, and remove tasks with ease.</p>
  </div>
  <div className="p-4 border rounded-xl shadow-sm">
    <h3 className="text-lg font-semibold">🤝 Real-Time Collaboration</h3>
    <p className="text-sm text-gray-500">Work with your team instantly, no refresh needed.</p>
  </div>
  <div className="p-4 border rounded-xl shadow-sm">
    <h3 className="text-lg font-semibold">📊 Progress Tracking</h3>
    <p className="text-sm text-gray-500">See what’s done, what’s pending, and plan ahead.</p>
  </div>
</section> */}
      <footer className="py-6 text-center text-sm text-gray-500 ">
        Built with 💙 by Bhumika Sharma •{" "}
        <a href="https://github.com/yourusername" className="underline">
          GitHub
        </a>
      </footer>
    </div>
  );
}
