// @ts-nocheck
import { HiMenuAlt4,HiLogout } from 'react-icons/hi'
import { HiOutlineUsers} from 'react-icons/hi2'

import PocketBase from 'pocketbase';
import { serverURL } from '../../config';
import toast from 'react-hot-toast';
import ActiveUser from './activeUser';
import React, { useState } from 'react';
const pb = new PocketBase(serverURL);


function Horizontal({ onMenuToggle }) {
    const handle_logout = ()=>{
        toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="bg-white p-6 rounded-lg shadow-md w-full flex flex-row justify-between">
  {/* First div containing "Are you sure?" */}
  <div className="mb-4">
    <p className="text-lg font-semibold">Are you sure?</p>
  </div>
  {/* Second div containing "Yes" and "No" buttons with icons */}
  <div className="flex justify-between">
    <button onClick={()=>{

localStorage.clear()
sessionStorage.clear()
window.location.replace('/login')
    }} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      Yes
    </button>
    <button  onClick={() => toast.dismiss(t.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
      No
    </button>
  </div>
</div>

           
            </div>
          ))
    }
    const [isOpen, setIsOpen] = useState(false);

const toggleDropdown = () => {
  setIsOpen(!isOpen);
};
    return (
        <div className='h-20 shadow w-full flex items-center justify-between px-8 bg-white z-50'>
   


     

            <div  onClick={onMenuToggle} className='cursor-pointer text-3xl my-4 hover:text-secondary/50'>
                <HiMenuAlt4 />
            </div>
            <div className='flex flex-rowjustify-center items-center'>
                <div className='flex'>
                <img src="https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=579&q=80" 
     className="w-12 h-12 rounded-full p-2"
     alt="Image Description"/>

                    <span className='p-2'>{pb.authStore.model.username}</span>
                </div>
            <div onClick={handle_logout} className='p-2 text-3xl text-secondary/50 cursor-pointer hover:text-red-500 duration-300'>
                <HiLogout />
            </div>
            <div className="relative inline-block text-left">
  <div>
    <button onClick={toggleDropdown} type="button" className='p-2 text-2xl text-secondary/50 cursor-pointer hover:text-red-500 duration-300' id="menu-button" aria-expanded="true" aria-haspopup="true">
    <HiOutlineUsers />
    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-[8px] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">20+</div>
    </button>
  </div>
  {/*
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
From: "transform opacity-0 scale-95"
To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
From: "transform opacity-100 scale-100"
To: "transform opacity-0 scale-95"
  */}
  {isOpen&&<div className="absolute right-0 z-10 mt-2  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
  <ActiveUser/>
  </div>
  }
</div>
            </div>
            {/* <img src='https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=579&q=80'
                 /> */}
        </div>
    )
}

export default Horizontal;
