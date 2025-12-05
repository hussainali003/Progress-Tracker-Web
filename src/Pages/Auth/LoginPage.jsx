import { FcGoogle } from "react-icons/fc";
import { RxEnter } from "react-icons/rx";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export default function LoginPage () {
    return (
        <div className="h-full w-full flex items-center justify-center bg-linear-to-b from-[#C4F2FE] from-10% via-[#e5f9fd] via-30% to-[#FEFEFE] to-90%">
            <div className="flex flex-col items-center p-12 rounded-2xl bg-linear-to-b from-[#C4F2FE] from-10% via-[#e5f9fd] via-30% to-[#FEFEFE] to-90%  shadow-lg">
                <button className="group flex justify-center mb-4 py-4 px-4 rounded-2xl bg-white shadow-lg cursor-pointer">
                    <RxEnter 
                        className="text-black transition duration-300 group-hover:text-[#C4F2FE]" 
                        size={28} 
                    />
                </button>
            <div className="flex flex-col items-center ">
                <h1 className="font-medium text-2xl text-[#2F262F]">Sign in with email</h1>
                <p className="text-[#909699] text-center mt-2">Make a new doc to bring your data, work and team togather. For Free</p>
            </div>
            <div className="w-full flex items-center justify-center gap-1 mb-3 mt-4 py-2 px-4 rounded-xl bg-white ">
                <FaEnvelope color="#909699"/>
                <input className="w-full text-[#2F262F] placeholder-[#909699] border-0 bg-transparent focus:outline-none" placeholder="Email" />
            </div>
            <div className="w-full flex items-center justify-center gap-1 mb-3 py-2 px-4 rounded-xl bg-white ">
                <FaLock color="#909699"/>
                <input className="w-full text-[#2F262F] placeholder-[#909699] border-0 bg-transparent focus:outline-none" placeholder="Password" />
            </div>
            <button className="self-end text-[#31323d] cursor-pointer hover:opacity-75 transition duration-300">
                Forgot Password?
            </button>
            <button className="w-full flex justify-center my-4 py-2 px-4 rounded-xl text-white bg-[#2F262F] cursor-pointer hover:opacity-75 transition duration-300">Sign in</button>
            <div className="w-full flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-[#E1E3E5]" />
                <p className="text-sm text-[#909699] whitespace-nowrap">Or sign in with</p>
                <div className="flex-1 h-px bg-[#E1E3E5]" />
            </div>
            <button className="flex justify-center py-3 px-3 rounded-xl bg-white shadow-sm cursor-pointer hover:opacity-75 transition duration-300">
                <FcGoogle size={20} />
            </button>
            </div>
        </div>
    )
}