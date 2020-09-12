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

      <style jsx global>{`
          html {
            background-color: #282C31;
            font-size: 24px;
          }

          body {
            color: #fff;
            overflow-y: scroll;
            font-size: 24px;

            &::-webkit-scrollbar {
              width: 5px;
            }

            &::-webkit-scrollbar-track {
              background: #000;
            }

            &::-webkit-scrollbar-thumb {
              background-color: #000;
            }
          }

          ::-moz-selection {
            background: #3297FD;
            color: #fff;
            text-shadow: none;
          }

          ::selection {
            background: #3297FD;
            color: #fff;
            text-shadow: none;
          }
        `}</style>

        <style jsx>{`
          div {
            max-width: 1430px;
            width: 100%;
            margin: 0 auto;
            padding: .5rem 1rem;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          main {
            max-width: 787px;
            width: 100%;
            flex: 1 0 auto;
            margin: 3rem auto 2.5rem;
          }
        `}</style>
    </>
  )
}