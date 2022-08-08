import React from 'react'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';
const Signup = () => {
  const router = useRouter()
  const [name, setname] = useState()
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push("/");
    }
  }, [])
  const handleChange=(e)=>{
    if(e.target.name=='name'){
        setname(e.target.value);
    }
    else if(e.target.name=='email'){
        setemail(e.target.value)
    }
    else if(e.target.name=='password'){
        setpassword(e.target.value)
    }
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const data = {name,email,password};
    let res=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data),
    })
    let response = await res.json();
    console.log(response);
    
    setname('');
    setemail('')
    setpassword('');
    toast.success('Account created', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  return (
    <div>
      <ToastContainer
            position="bottom-center"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="min-h-screen flex items-start justify-center pt-10 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <img className="mx-auto h-12 w-auto" src="/fashionlogo.png" alt="Workflow"/>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">Create an Account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
        Or
        <Link href={"/login"} className="font-medium text-black hover:text-gray-700"> Already have an Account ? </Link>
      </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
        <input type="hidden" name="remember" value="true"/>
        <div className="rounded-md shadow-sm -space-y-px">
        <div>
            <input value={name} onChange={handleChange} id="name" name="name" type="text"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black-500 focus:border-black-500 focus:z-10 sm:text-sm" placeholder="Name"/>
          </div>
          <div>
            <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black-500 focus:border-black-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
          </div>
          <div>
            <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm" placeholder="Create a Password"/>
          </div>
        </div>
  
        <div>
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Create Account
          </button>
        </div>
      </form>
    </div>
  </div></div>
  )
}

export default Signup