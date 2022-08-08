import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import Product from "../../models/Product";
import mongoose from "mongoose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "next/error"

const Slug = ({ addtocart, product, variants, buynow,error }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [Pin, setPin] = useState();
  const [service, setservice] = useState();
  const pincheck = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinjson = await pins.json();
    if (Object.keys(pinjson).includes(Pin)) {
      setservice(true);
    } else {
      setservice(false);
    }
  };
  const changepin = (e) => {
    setPin(e.target.value);
  };
  const [color, setcolor] = useState();
  const [size, setsize] = useState();
  const refreshVariant = (newcolor, newsize) => {
    let url = `http://localhost:3000/product/${variants[newcolor][newsize]["slug"]}`;
    window.location = url;
  };
  useEffect(() => {
    if(!error){
      setcolor(product.color)
      setsize(product.size)
    }
  }, [router.query])
  if(error==404){
  return <Error statusCode={404}/>
  }
  return <>
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-2 py-5 mx-auto">
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
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className=" lg:w-1/2 w-full lg:h-auto object-cover object-top rounded"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">
                {product.title} ({product.color}/{product.size})
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-black-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-black-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-black-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-black-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-black-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {color && Object.keys(variants).includes("red") &&
                    Object.keys(variants["red"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant("red", size);
                        }}
                        className={`border-2 bg-red-600 rounded-full w-6 h-6 focus:outline-none ${
                          color === "red" ? `border-black` : `border-grey-300`
                        }`}
                      ></button>
                    )}
                  {color && Object.keys(variants).includes("blue") &&
                    Object.keys(variants["blue"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant("blue", size);
                        }}
                        className={`border-2  ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none${
                          color === "blue" ? `border-black` : `border-gray-300`
                        }`}
                      ></button>
                    )}
                  {color && Object.keys(variants).includes("black") &&
                    Object.keys(variants["black"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant("black", size);
                        }}
                        className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none${
                          color === "black" ? `border-black` : `border-gray-300`
                        }`}
                      ></button>
                    )}
                  {color && Object.keys(variants).includes("green") &&
                    Object.keys(variants["green"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant("green", size);
                        }}
                        className={`border-2  ml-1 bg-green-400 rounded-full w-6 h-6 focus:outline-none${
                          color === "green" ? `border-black` : `border-gray-300`
                        }`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div>
                    <select
                      value={size}
                      onChange={(e) => {
                        refreshVariant(color, e.target.value);
                      }}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black-500 text-base pl-3 pr-10"
                    >
                      {color && Object.keys(variants[color]).includes("S") && (
                        <option value={"S"}>S</option>
                      )}
                      {color && Object.keys(variants[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {color && Object.keys(variants[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                      {color && Object.keys(variants[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                      {color && Object.keys(variants[color]).includes("XXL") && (
                        <option value={"XXL"}>XXL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
              {product.availableQty>0 && <span className="title-font font-medium text-2xl text-gray-900">
                  Rs {product.price}{" "}
                </span>}
                {product.availableQty<=0 && <span className="title-font font-medium text-base text-gray-900">
                  Out of Stock
                </span>}
                <button
                  onClick={() => {
                    addtocart(
                      product.slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  disabled={product.availableQty<=0}
                  className="flex ml-4 text-white disabled:invisible bg-black border-0 py-2 px-2 focus:outline-none hover:bg-black-600 rounded"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => {
                    buynow(
                      product.slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  disabled={product.availableQty<=0}
                  className="flex ml-4 text-white disabled:invisible bg-black border-0 py-2 px-2 focus:outline-none hover:bg-black-600 rounded"
                >
                  Buy Now
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="pin mt-6 flex space-x-2 ">
                <input
                  onChange={changepin}
                  className="px-2 border-2 border-black"
                  type="text"
                  placeholder="Pincode Availability"
                />
                <button
                  onClick={pincheck}
                  className="flex ml-4 text-white bg-black border-0 py-1 px-1 focus:outline-none hover:bg-black-600 rounded"
                >
                  Check
                </button>
              </div>
              {!service && service != null && (
                <div className="mt-2 text-sm text-red-600">
                  Delivery Not Available
                </div>
              )}
              {service && service != null && (
                <div className="mt-2 text-sm text-green-600">
                  Delivery Available
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let error=null;
  let product = await Product.findOne({ slug: context.query.slug });
  if(product==null){
    return {props: {error:404}}
  }
  let variants = await Product.find({ title: product.title , category:product.category});
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }
  return {
    props: {error:error,
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}

export default Slug;
