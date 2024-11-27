import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGooglePlusG, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

export default function LoginPage() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]">
      <div className={`bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] relative overflow-hidden w-[768px] max-w-full min-h-[480px] ${isActive ? 'active' : ''}`}>
        <div className="absolute top-0 h-full transition-all duration-600 ease-in-out sign-up-container">
          <form className="bg-white flex flex-col items-center justify-center h-full px-10">
            <h1 className="text-3xl font-bold mb-4">Create Account</h1>
            <div className="flex gap-3 my-5">
              <a href="#" className="border border-[#ccc] rounded-[20%] flex justify-center items-center w-10 h-10">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </a>
              <a href="#" className="border border-[#ccc] rounded-[20%] flex justify-center items-center w-10 h-10">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="border border-[#ccc] rounded-[20%] flex justify-center items-center w-10 h-10">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
            <span className="text-xs mb-4">or use your email for registration</span>
            <input type="text" placeholder="Name" className="bg-[#eee] border-none my-2 px-[15px] py-[10px] text-sm rounded-lg w-full outline-none" />
            <input type="email" placeholder="Email" className="bg-[#eee] border-none my-2 px-[15px] py-[10px] text-sm rounded-lg w-full outline-none" />
            <input type="password" placeholder="Password" className="bg-[#eee] border-none my-2 px-[15px] py-[10px] text-sm rounded-lg w-full outline-none" />
            <button className="bg-[#512da8] text-white text-xs py-[10px] px-[45px] border border-transparent rounded-lg font-semibold tracking-wider uppercase mt-[10px] cursor-pointer">Sign Up</button>
          </form>
        </div>
        <div className="absolute top-0 h-full transition-all duration-600 ease-in-out sign-in-container">
          <form className="bg-white flex flex-col items-center justify-center h-full px-10">
            <h1 className="text-3xl font-bold mb-4">Sign In</h1>
            <div className="flex gap-3 my-5">
              <a href="#" className="border border-[#ccc] rounded-[20%] flex justify-center items-center w-10 h-10">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </a>
              <a href="#" className="border border-[#ccc] rounded-[20%] flex justify-center items-center w-10 h-10">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="border border-[#ccc] rounded-[20%] flex justify-center items-center w-10 h-10">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
            <span className="text-xs mb-4">or use your email password</span>
            <input type="email" placeholder="Email" className="bg-[#eee] border-none my-2 px-[15px] py-[10px] text-sm rounded-lg w-full outline-none" />
            <input type="password" placeholder="Password" className="bg-[#eee] border-none my-2 px-[15px] py-[10px] text-sm rounded-lg w-full outline-none" />
            <a href="#" className="text-sm text-[#333] no-underline mt-[15px] mb-[10px]">Forget Your Password?</a>
            <button className="bg-[#512da8] text-white text-xs py-[10px] px-[45px] border border-transparent rounded-lg font-semibold tracking-wider uppercase mt-[10px] cursor-pointer">Sign In</button>
          </form>
        </div>
        <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out rounded-tl-[150px] rounded-bl-[100px] z-[1000]">
          <div className="bg-gradient-to-r from-[#5c6bc0] to-[#512da8] text-white relative left-[-100%] h-full w-[200%] transform translate-x-0 transition-all duration-600 ease-in-out">
            <div className="absolute w-1/2 h-full flex flex-col items-center justify-center px-[30px] text-center top-0 transform translate-x-0 transition-all duration-600 ease-in-out">
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-sm leading-5 tracking-wide mb-5">Enter your personal details to use all of site features</p>
              <button
                className="bg-transparent border border-white text-white text-xs py-[10px] px-[45px] rounded-lg font-semibold tracking-wider uppercase mt-[10px] cursor-pointer"
                onClick={() => setIsActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className="absolute right-0 w-1/2 h-full flex flex-col items-center justify-center px-[30px] text-center top-0 transform translate-x-0 transition-all duration-600 ease-in-out">
              <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
              <p className="text-sm leading-5 tracking-wide mb-5">Register with your personal details to use all of site features</p>
              <button
                className="bg-transparent border border-white text-white text-xs py-[10px] px-[45px] rounded-lg font-semibold tracking-wider uppercase mt-[10px] cursor-pointer"
                onClick={() => setIsActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

