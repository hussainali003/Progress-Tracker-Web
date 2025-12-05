import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

import authImage from '../../assets/images/authImage.jpg';

export default function RegisterPage () {
    return (
        <div className="h-full w-full flex">
            <div className="h-full flex flex-1 flex-col items-center justify-center px-24 bg-[#2F262F]">
                <div className="flex flex-col items-center mt-2">
                    <h1 className="font-medium text-2xl text-[#ffffff]">Sign up for free</h1>
                    <p className="text-[#909699] text-center">Track every progress in one place</p>
                </div>
                {/* input fields */}
                <div className="w-full flex items-center justify-center gap-1 mb-3 mt-4 py-2 px-4 rounded-xl bg-white ">
                    <FaUser color="#909699"/>
                    <input className="w-full text-[#2F262F] placeholder-[#909699] border-0 bg-transparent focus:outline-none" placeholder="Name" />
                </div>
                <div className="w-full flex items-center justify-center gap-1 mb-3 py-2 px-4 rounded-xl bg-white ">
                    <FaEnvelope color="#909699"/>
                    <input className="w-full text-[#2F262F] placeholder-[#909699] border-0 bg-transparent focus:outline-none" placeholder="Email" />
                </div>
                <div className="w-full flex items-center justify-center gap-1 mb-3 py-2 px-4 rounded-xl bg-white ">
                    <FaLock color="#909699"/>
                    <input className="w-full text-[#2F262F] placeholder-[#909699] border-0 bg-transparent focus:outline-none" placeholder="Password" />
                </div>
                {/* sign up button */}
                <button className="w-full flex justify-center mb-4 py-2 px-4 rounded-xl text-[#2F262F] bg-white cursor-pointer hover:opacity-75 transition duration-300">
                    Sign up
                </button>
                {/* divider */}
                <div className="w-full flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-[#909699]" />
                    <p className="text-sm text-[#909699] whitespace-nowrap">Or sign up with</p>
                    <div className="flex-1 h-px bg-[#909699]" />
                </div>
                {/* google button */}
                <button className="flex justify-center py-3 px-3 rounded-xl bg-white shadow-sm cursor-pointer hover:opacity-75 transition duration-300">
                    <FcGoogle size={20} />
                </button>
            </div>
            <div className="h-full flex-3">
                <img className="h-full w-full" src={authImage} alt="authImage" />
            </div>
        </div>
    )
}