import Header from "./Header"
import Head from "next/head"
import Footer from "./Footer"

export default function Layout({children}) {

  return (
    <>
      <Head>
        <title>Enclave App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}