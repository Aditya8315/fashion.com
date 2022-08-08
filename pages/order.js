import { useRouter } from 'next/router'
import React,{useEffect} from 'react'
import Order from "../models/Order";
import mongoose from "mongoose";

const order = ({myorder,clearcart}) => {
  const router = useRouter()
  useEffect(() => {
if(router.query.clearCart ==1){
  clearcart()
}
  }, [])
  
  const {id} = router.query
  const products = myorder.products
  return (
    <div className="min-h-screen"><section className="text-gray-600 body-font overflow-hidden">
    <div className="container px-5 py-8 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">fashion.com</h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id - #{myorder.orderId}</h1>
          
          <p className="leading-relaxed mb-4">Your order placed Successfully<br/>Order Status :{myorder.status} </p>
          <div class="flex mb-4">
          <a class="flex-grow text-black py-1 text-lg px-1">Item details</a>
          <a class="flex-grow text-black py-1 text-lg px-1 text-center">Quantity</a>
          <a class="flex-grow text-black py-1 text-lg px-1 text-right">Price</a>
        </div>
          {Object.keys(products).map((item)=>{ return <div key={products[item]._id} className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500 text-sm">{products[item].name}({products[item].size}/{products[item].variant})</span>
            <span className="ml-auto text-gray-900">{products[item].qty}</span>
            <span className="ml-auto text-sm text-gray-900">{products[item].qty}x{products[item].price} = Rs. {products[item].qty*products[item].price}</span>
          </div>})} 
          <div className="flex">
            <span className="title-font font-medium text-2xl text-gray-900">Total : {myorder.amount}</span>
            <button className="flex ml-auto text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-500 rounded">Delivery Status : {myorder.deliveryStatus}</button>
          </div>
        </div>
        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/>
      </div>
    </div>
  </section></div>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let myorder = await Order.findById(context.query.id);
  
  return {
    props: {myorder:JSON.parse(JSON.stringify(myorder))}, // will be passed to the page component as props
  };
}

export default order