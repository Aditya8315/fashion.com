import React, { useState,useEffect } from "react";
import Link from "next/link";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import Head from "next/head";
import Script from "next/script";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = ({ cart, addtocart, removefromcart,clearcart, total }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [pincode, setpincode] = useState("");
  const [address, setaddress] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [user, setuser] = useState({value:null})

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

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('curruser'))
    if(user && user.token){
      setuser(user)
      setemail(user.email)
      fetchUser(user.token)
    }
  }, [])
  
    let res = await a.json();
    console.log(res)
    setname(res.name)
    setaddress(res.address)
    setpincode(res.pincode)
    setphone(res.phone)
    verifypincode(res.pincode)
  }
  const verifypincode= async(pin)=>{
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinjson = await pins.json();
    if(Object.keys(pinjson).includes(pin)){
      setcity(pinjson[pin][0])
      setstate(pinjson[pin][1])
    }
    else{
      setcity('')
      setstate('')
    }
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
  } else if (e.target.name == "pincode") {
    setpincode(e.target.value);
    if(e.target.value.length ===6){
      verifypincode(e.target.value)
    }
    else{
      setcity('')
      setstate('')
    }
  }
    if (name && phone && email && address && pincode.length > 3) {
      setdisabled(false);
    }
  };

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    const data = { cart, total, oid, email, name, phone, pincode, address,city,state };
    alert("MID toh daal");
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txnRes = await a.json();
    if(txnRes.success){
    let txntoken = txnRes.txnToken;
    console.log(txntoken);

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid /* update order id */,
        token: txntoken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: total /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
    }
    else{
      if(txnRes.cartclr){
        clearcart()
      }
      toast.error(txnRes.error, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  };

  return (
    <div className="container m-auto">
      
      <Head
        meta
        name="viewport"
        content="width=device-width, height=device-height, initial-scale=1.0,maximum-scale=1.0"
      ></Head>
      <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
      ></Script>
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
      <h1 className="font-bold text-center">Checkout</h1>
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
        {user && user.token? <input
            value={user.email}
            readOnly={true}
            type="email"
            id="email"
            name="email"
            placeholder="E-Mail"
            className="w-full bg-white rounded border border-black focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />:<input
            onChange={handleChange}
            value={email}
            type="email"
            id="email"
            name="email"
            placeholder="E-Mail"
            className="w-full bg-white rounded border border-black focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />}
          
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
      <div className="mx-auto flex space-x-2">
        <div className="w-1/2 mb-4">
          <input
          onChange={handleChange}
            value={city}
            type="text"
            id="city"
            name="city"
            placeholder="City"
            className="w-full bg-white rounded border border-black focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="w-1/2 mb-4">
          <input
            value={state}
            onChange={handleChange}
            type="text"
            id="state"
            name="state"
            placeholder="State"
            className="w-full bg-white rounded border border-black focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <h2>Review Cart Items</h2>
      <div className="sidebar bg-gray-100  p-4 m-2 ">
        <ol className="list-decimal font-semibold mx-2">
          {Object.keys(cart).length == 0 && (
            <div key={cart} className="my-4 text-black">
              <p>Add items to cart</p>{" "}
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li >
                <div key={k._id} className="item flex my-2">
                  <div>
                    {cart[k].name} ({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="flex items-center justify-center w-1/3">
                    <AiOutlineMinusSquare
                      onClick={() => {
                        removefromcart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="mx-1 text-xl cursor-pointer"
                    />{" "}
                    {cart[k].qty}
                    <AiOutlinePlusSquare
                      onClick={() => {
                        addtocart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="mx-1 text-xl cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="total">Total : Rs. {total} </span>
        <div className="flex space-x-4 justify-center">
          <Link href={"/checkout"}>
            <button
              disabled={disabled}
              onClick={initiatePayment}
              className="disabled:bg-slate-600 disabled:hover:cursor-not-allowed flex  text-white text-xl bg-black border-0 py-1 px-2 focus:outline-none hover:bg-gray-900 rounded cursor-pointer "
            >
              PAY <FaRupeeSign className="m-0.5 mx-1" />{total}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
