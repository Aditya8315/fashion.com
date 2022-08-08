import React, { useRef ,useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BsFillCartPlusFill,
  BsFillBagCheckFill,
  BsFillBagXFill,
} from "react-icons/bs";
import {
  AiFillCloseSquare,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import {
MdAccountBox
} from "react-icons/md";


const Navbar = ({user,
  logout,
  cart,
  addtocart,
  removefromcart,
  total,
  savecart,
  clearcart
}) => {
  const ref = useRef();
  const togglecart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const [dropdown, setdropdown] = useState(false)
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center shadow-sm sticky top-0 bg-white">
      <div className="logo mr-auto md:mx-5">
        <Link href="/" >
        <Image
          className="hover:cursor-pointer"
          src="/fashionlogo.png"
          width={40}
          height={40}
          alt="fashion.com logo here"
        ></Image>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-5 font-bold md:text-xl">
          <Link href={"/tshirt"}>
            <a>
              <li>T-Shirts</li>
            </a>
          </Link>
          <Link href={"/hoodies"}>
            <a>
              <li>Hoodies</li>
            </a>
          </Link>
          <Link href={"/hats"}>
            <a>
              <li>Hats</li>
            </a>
          </Link>
          <Link href={"/shoes"}>
            <a>
              <li>Shoes</li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="sidecart absolute items-center right-0 top-1 mx-5 flex space-x-2">
        <a onMouseOver={()=>{setdropdown(true)}} onMouseLeave={()=>{setdropdown(false)}}>
        {dropdown && <div onMouseOver={()=>{setdropdown(true)}} onMouseLeave={()=>{setdropdown(false)}} className="absolute bg-black top-7 w-36 text-sm px-5 rounded-md right-8  text-white">
          <ul>
            <Link href='/myaccount'><a><li>My Account</li></a></Link>
            <Link href='/orders'><a><li>My orders</li></a></Link>
            <a><li onClick={logout} className="cursor-pointer">Log out</li></a>
          </ul>
        </div>}
      {user.value && <MdAccountBox className="text-3xl"/>}
      </a>
        {!user.value && <Link href={'/login'}><a><button className="bg-black rounded-md text-white px-2 mx-2">Login</button></a></Link>}
        <BsFillCartPlusFill onClick={togglecart} className="text-2xl" />
        
      </div>
      <div
        ref={ref}
        className=" w-80 h-[100vh] sidebar overflow-y-scroll absolute top-0 right-0 bg-gray-100 border-2 rounded-lg border-black px-4 py-10  transition-all translate-x-full "
      >
        <h2 className="text-center text-xl py-1">Your Cart</h2>
        <span
          onClick={togglecart}
          className="absolute top-2 right-2 cursor-pointer text-2xl"
        >
          <AiFillCloseSquare />
        </span>
        <ol className="list-decimal font-semibold mx-2">
          {Object.keys(cart).length == 0 && (
            <div key={cart} className="my-4 text-black">
              <p>Add items to cart</p>{" "}
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k._id}>
                <div className="item flex my-2">
                  <div className="w-2/3">{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                  <div className="flex items-center justify-center w-1/3">
                    <AiOutlineMinusSquare onClick={() => {removefromcart(
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
          <span className="total">Total : Rs. {total} </span>
        </ol>
        <div className="flex space-x-4 justify-center">
          <Link href={"/checkout"}>
            <button disabled={Object.keys(cart).length==0} key={cart} className="flex disabled:bg-slate-500 text-white bg-black border-0 py-1 px-2 focus:outline-none hover:bg-gray-900 rounded cursor-pointer ">
              <BsFillBagCheckFill className="m-0.5 mx-2" /> Checkout{" "}
            </button>
          </Link>
          <button
            onClick={clearcart}
            disabled={Object.keys(cart).length==0}
            className="flex disabled:bg-slate-500 text-white bg-black hover:cursor-pointer border-0 py-1 px-2 focus:outline-none hover:bg-gray-900 rounded "
          >
            <BsFillBagXFill className="m-0.5 mx-2" /> Clear cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
