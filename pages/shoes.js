import React from 'react'
import Link from 'next/link'
import Product from"../models/Product"
import mongoose from "mongoose"


const Shoes = ({products}) => {
  return (
    <div>
  <section className="text-gray-600 body-font min-h-screen">
  <div className="container px-5 py-10 mx-auto">
    <div className="flex flex-wrap -m-4 ">
      {Object.keys(products).map((item)=>{return <Link key={products[item]._id} href={`/product/${products[item].slug}`}>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg">
        <a className="block  rounded overflow-hidden">
          <img alt="ecommerce" className="m-auto h-[30vh] md:h-[25vh] block" src={products[item].image}/>
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Shoes</h3>
          <h2 className="text-gray-900 title-font font-medium">{products[item].title}</h2>
          <div>
            {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
            {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
            {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-400 rounded-full w-6 h-6 focus:outline-none"></button>}
            {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>}
            {/* add more colors here  */}
          </div>
          <div className="mt-1">
            {products[item].size.includes('S') && <span className="border border-stone-600 px-1 text-sm mx-1">S</span>}
            {products[item].size.includes('M') && <span className="border border-stone-600 px-1  text-sm mx-1">M</span>}
            {products[item].size.includes('L') && <span className="border border-stone-600 px-1 text-sm  mx-1">L</span>}
            {products[item].size.includes('XL') && <span className="border border-stone-600 px-1 text-sm  mx-1">XL</span>}
            {products[item].size.includes('XXL') && <span className="border border-stone-600 px-1 text-sm  mx-1">XXL</span>}
          </div>
          <p className="mt-2 text-lg">Rs {products[item].price}</p>
        </div>
      </div>
      </Link>})}
    </div>
  </div>
</section>
</div>
  )
}
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products =await Product.find({category:"shoes"})
  let shoe ={};
  for(let item of products){
    if(item.title in shoe){
      if(!shoe[item.title].color.includes(item.color) && item.availableQty>0){
        shoe[item.title].color.push(item.color)
      }
      if(!shoe[item.title].size.includes(item.size) && item.availableQty>0){
        shoe[item.title].size.push(item.size)
      }
    }
    else{
      shoe[item.title]=JSON.parse(JSON.stringify(item))
      if(item.availableQty>0){
        shoe[item.title].color=[item.color]
        shoe[item.title].size=[item.size]
      }
    }
  }
  return {
    props: {products: JSON.parse(JSON.stringify(shoe))} // will be passed to the page component as props
  }
}

export default Shoes