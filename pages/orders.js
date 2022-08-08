import React,{useEffect,useState} from 'react'
import  { useRouter } from 'next/router'
import Link from 'next/link'

const orders = () => {
  const router = useRouter()
  const [Order, setOrder] = useState([])
  useEffect(() => {
    const fetchOrders= async ()=>{
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token:JSON.parse(localStorage.getItem('curruser')).token}),
      });
      let res = await a.json()
      setOrder(res.orders)
    }
    if(localStorage.getItem('curruser')){
      fetchOrders()
    }else{
      router.push("/")
    }
  }, [])
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <h1 className="font-semibold text-2xl px-6 py-5">My Orders</h1>
        <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Order ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Price
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {Order.map((item)=>{  
            return <tr key={item._id} className="border-b hover:bg-gray-300">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {item.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {item.amount}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <Link href={'/order?id='+item._id}><a>Details</a></Link>
              </td>
            </tr>})}
            {/* <tr className="bg-white border-b hover:bg-gray-300">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Jacob
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Thornton
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @fat
              </td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Larry
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Wild
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @twitter
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}

export default orders