import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>fashion.com</title>
        <meta name="description" content="fashion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-5 mx-auto">
            <div className="flex">
              <div className="w-full my-2">
                <h1 className="sm:w-2/5 text-gray-900 font-bold title-font text-3xl mb-2 sm:mb-0">
                  Fashion.com
                </h1>
                <span >Always be ahead of trend</span>
              </div>
            </div>
            <div className="flex flex-wrap -m-4">
              <Link href={'/tshirt'}>
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-md">
                  <a className="block  rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="m-auto md:mx-0 w-full block"
                      src="/tshirt.jfif"
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      T-Shirts
                    </h3>
                  </div>
                </div>
              </Link>
              <Link href="/hoodies">
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-md">
                  <a className="block  rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="m-auto md:mx-0 w-full block"
                      src="/hoodie.png"
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      Hoodies
                    </h3>
                  </div>
                </div>
              </Link>
              <Link href="/hats">
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-md">
                  <a className="block  rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="m-auto md:mx-0 w-full block"
                      src="/hats.jfif"
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      Hats
                    </h3>
                  </div>
                </div>
              </Link>
              <Link href="/shoes">
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-md">
                  <a className="block  rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="m-auto md:mx-0 w-full block"
                      src="/shoes.jfif"
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      Shoes
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
