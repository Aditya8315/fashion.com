import "../styles/globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  const [cart, setcart] = useState({});
  const [total, settotal] = useState(0);
  const [user, setuser] = useState({value:null,email:null})
  const [key, setkey] = useState(0)
  const router = useRouter();
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    router.events.on("routeChangeComplete",()=>{setProgress(100)})
    try {
      if (localStorage.getItem('cart')) {
        setcart(JSON.parse(localStorage.getItem('cart')));
        savecart(JSON.parse(localStorage.getItem('cart')));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
    let curruser = JSON.parse(localStorage.getItem('curruser'))
    if(curruser){
      setuser({value: curruser.token,email:curruser.email})
    }
    setkey(Math.random())
  },[router.query]);

  const savecart = (myCart) => {
    localStorage.setItem('cart',JSON.stringify(myCart));
    let tot = 0; 
    let keys = Object.keys(myCart);
    for (let i = 0; i<keys.length; i++) {
      tot += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    settotal(tot);
  };
  const addtocart =(itemid, qty, price, name, size, variant)=>{
    let newCart = cart;
    if (itemid in cart) {
      newCart[itemid].qty = cart[itemid].qty + qty;
    } else {
      newCart[itemid] = { qty: 1, price, name, size, variant };
    }
    setcart(newCart);
    savecart(newCart);
    toast.success('Added to Cart', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };
  const buynow=(itemid, qty, price, name, size, variant)=>{
    savecart({})
    let newCart = {};
    newCart[itemid]={ qty: 1, price, name, size, variant }
    setcart(newCart);
    savecart(newCart);
    router.push("/checkout")
  };
  const clearcart = () => {
    setcart({});
    savecart({});
  };
  const removefromcart = (itemid, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemid in cart) {
      newCart[itemid].qty = cart[itemid].qty - qty;
    }
    if (newCart[itemid].qty <= 0) {
      delete newCart[itemid];
    }
    setcart(newCart);
    savecart(newCart);
  };
  const logout=()=>{
    localStorage.removeItem('curruser');
    setuser({value: null,email:null})
    setkey(Math.random());
    router.push("/")
  }
  return (
    <>
    <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {key &&<Navbar
        logout={logout}
        user={user}
        key={key}
        cart={cart}
        addtocart={addtocart}
        removefromcart={removefromcart}
        savecart={savecart}
        total={total}
        clearcart={clearcart}
        buynow={buynow}
      />}
      <Component
        cart={cart}
        addtocart={addtocart}
        removefromcart={removefromcart}
        savecart={savecart}
        total={total}
        clearcart={clearcart}
        buynow={buynow}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
