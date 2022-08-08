import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';

const forgot = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const router = useRouter()
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push("/");
    }
  }, [])
  const handlechange =async (e)=>{
    if(e.target.name=="email"){
      setemail(e.target.value)
    } else if(e.target.name=="password"){
      setpassword(e.target.value)
    }else if(e.target.name=="cpassword"){
      setcpassword(e.target.value)
    }
  }
  const resetpassword=async ()=>{
    if(password==cpassword){
      const data = { email:email, password:password};
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      console.log(res)
      if(res.success){
        toast.success("Password Updated", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      }else{
        toast.error("User not exists", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        }
    }
    else{
      toast.error("Password is not matching", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      }
  }
  // const sendemail=async ()=>{
  //   const data = { email:email,sendMail:true};
  //   let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
  //     method: "POST", // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   let res = await a.json();
  //   router.push(`${process.env.NEXT_PUBLIC_HOST}/api/forgot?token=123`)
  // }
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
    <div className="max-w-md w-full ">
      <div>
        <Image className="mx-auto h-12 w-auto" src="/fashionlogo.png" alt="Workflow"/>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">Forgot Password</h2>
      </div>
      
        <input type="hidden" name="remember" value="true"/>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input onChange={handlechange} id="email" name="email" type="email" value={email}autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black-500 focus:border-black-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
          </div>
          <div>
            <input id="password" name="password" value={password} onChange={handlechange} type="text" autoComplete="password"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black-500 focus:border-black-500 focus:z-10 sm:text-sm" placeholder="New Password"/>
          </div>
          <div>
            <input id="cpassword" name="cpassword" value={cpassword} onChange={handlechange} type="password" autoComplete="password"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black-500 focus:border-black-500 focus:z-10 sm:text-sm" placeholder="Confirm New PAssword"/>
          </div>
        </div>
  
        <div>
          <button onClick={()=>{resetpassword()}} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Reset Password
          </button>
          {password != cpassword && <span>Passwords dont match</span>}
        </div>
    </div>
  </div>
    </div>
  )
}

export default forgot