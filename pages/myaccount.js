import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const myaccount = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [pincode, setpincode] = useState("");
  const [address, setaddress] = useState("");
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [npassword, setnpassword] = useState('');
  const [user, setuser] = useState({ value: null });
  const router = useRouter();
  useEffect(() => {
    const curruser = JSON.parse(localStorage.getItem("curruser"));
    if (!curruser) {
      router.push("/");
    }
    if (curruser && curruser.token) {
      setuser(curruser);
      setemail(curruser.email);
      fetchUser(curruser.token)
    }
  },[]);
  const fetchUser =async (token)=>{
    const data = { token:token }
    console.log(data)
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    setname(res.name)
    setaddress(res.address)
    setpincode(res.pincode)
    setphone(res.phone)
  }
  const handleUserSubmit= async ()=>{
    const data = {token:user.token, address,name,phone,pincode };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let usrres = await a.json();
    console.log(usrres)
    if(usrres.success){
    toast.success("Details Updated", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });}
  }
  const handlePasswordSubmit= async ()=>{
    let res;
    if(npassword==cpassword){
        const data = { token:user.token,password,npassword,cpassword};
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        res = await a.json();
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
        }
        else{
          res={success:false};
            toast.error("Enter Correct Password", {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });}
      }
    
    else{
      toast.error("New Password is not matching", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      }
      setpassword('')
      setnpassword('')
      setcpassword('')
    }
  

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setname(e.target.value);
    } else if (e.target.name == "phone") {
      setphone(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "address") {
      setaddress(e.target.value);
    } else if(e.target.name =="password") {
      setpassword(e.target.value);
    } else if (e.target.name =="cpassword") {
      setcpassword(e.target.value);
    }else if (e.target.name =="npassword") {
      setnpassword(e.target.value);
    }
     else if (e.target.name == "pincode") {
      setpincode(e.target.value);
    }
  };
  return (
    <div className="container m-auto">
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
      <h1 className="font-bold text-center">Update Account</h1>
      <h2>Delivery Details</h2>
      <div className="mx-auto flex space-x-2">
        <div className="w-1/2 mb-4">
          <input
            onChange={handleChange}
            value={name}
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="w-full bg-white rounded border border-black focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="w-1/2 mb-4">
          {user && user.token ? (
            <input
              value={user.email}
              readOnly={true}
              type="email"
              id="email"
              name="email"
              placeholder="E-Mail"
              className="w-full bg-white rounded border border-black focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          ) : (
            <input
              onChange={handleChange}
              value={email}
              type="email"
              id="email"
              name="email"
              placeholder="E-Mail"
              className="w-full bg-white rounded border border-black focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          )}
        </div>
      </div>
      <div className="w-full mb-4">
        <input
          onChange={handleChange}
          value={address}
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          className="w-full bg-white rounded border border-black focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="mx-auto flex space-x-2">
        <div className="w-1/2 mb-4">
          <input
            onChange={handleChange}
            value={phone}
            type="phone"
            id="phone"
            name="phone"
            placeholder="Contact No."
            className="w-full bg-white rounded border border-black focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="w-1/2 mb-4">
          <input
            onChange={handleChange}
            value={pincode}
            type="phone"
            id="pincode"
            name="pincode"
            placeholder="Pincode"
            className="w-full bg-white rounded border border-black focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
        <button onClick={()=>{handleUserSubmit()}}
              className="disabled:bg-slate-600 disabled:hover:cursor-not-allowed my-2 flex  text-white bg-black border-0 py-1 px-2 focus:outline-none hover:bg-gray-900 rounded cursor-pointer "
            >
              Submit
            </button>

      <h2 className="text-xl my-2">Change Password</h2>
       <div className="mx-auto flex space-x-2">
        <div className="w-1/2 mb-4">
          <input
            onChange={handleChange}
            value={password}
            type="password"
            id="password"
            name="password"
            placeholder="Old Password"
            className="w-full bg-white rounded border border-black focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="w-1/2 mb-4">
          <input
            onChange={handleChange}
            value={npassword}
            type="password"
            id="npassword"
            name="npassword"
            placeholder="New Password"
            className="w-full bg-white rounded border border-black focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="w-1/2 mb-4">
          <input
            onChange={handleChange}
            value={cpassword}
            type="password"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm New Password"
            className="w-full bg-white rounded border border-black focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div> 
      <button onClick={()=>{handlePasswordSubmit()}} className="disabled:bg-slate-600 disabled:hover:cursor-not-allowed flex  text-white bg-black border-0 py-1 px-2 focus:outline-none hover:bg-gray-900 rounded cursor-pointer ">Submit </button>

    </div>
  );
};
export default myaccount;
