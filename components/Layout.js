import Header from "./Header"
import Head from "next/head"
import Footer from "./Footer"
import ThemeContext from "../theme/provider"
import {useContext} from "react"

export default function Layout({children, navHandler, btnStyles}) {

  const {theme} = useContext(ThemeContext)

  return (
    <>
      <Head>
        <title>Enclave App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="apple-touch-icon" sizes="144x144" href="/meta/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png"/>
        <link rel="mask-icon" href="/meta/safari-pinned-tab.svg" color="#5bbad5"/>
        <link rel="manifest" href="/meta/site.webmanifest"/>
        <link rel="manifest" href="/meta/manifest.json"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
        <meta name="description" content="Privacy solutions for Ethereum transactions."/>
        <meta property="og:url" content="https://app.enclave.systems/"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Enclave App"/>
        <meta property="og:description" content="Privacy solutions for Ethereum transactions."/>
        <meta property="og:image" content="https://app.enclave.systems/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="enclave.systems"/>
        <meta property="twitter:url" content="https://app.enclave.systems/"/>
        <meta name="twitter:title" content="Enclave App"/>
        <meta name="twitter:description" content="Privacy solutions for Ethereum transactions."/>
        <meta name="twitter:image" content="https://app.enclave.systems/logo.png"/>
      </Head>
      <div>
        <Header navHandler={navHandler} btnStyles={btnStyles} />
        <main>
          {children}
        </main>
        <Footer />
      </div>

      <style jsx global>{`
          html {
            background-color: ${theme.bg.color};
            background-image: ${theme.bg.body};
            font-size: 24px;
            scrollbar-color: ${theme.bg.mozColor};
            scrollbar-width: thin;
          }

          body {
            color: ${theme.font.primary};
            overflow-y: scroll;
            font-size: 24px;

            &::-webkit-scrollbar {
              width: 5px;
            }

            &::-webkit-scrollbar-track {
              background: ${theme.scroll.color};
            }

            &::-webkit-scrollbar-thumb {
              background-color: ${theme.scroll.back};
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

          @media screen and (min-width: 2000px) {
            html, body {
              font-size: 1.2vw !important;
            }
          }

          @media screen and (min-width: 3000px) and (max-height: 1500px) {
            html, body {
              font-size: .9vw !important;
            }
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
          
          @media screen and (max-width: 1300px) {
            main {
              margin: 4rem auto 2.5rem;
            }
          }
          
          @media screen and (max-width: 830px) {
            main {
              margin: 2rem auto 2.5rem;
            }
           }

          @media screen and (max-width: 720px) {
            main {
              margin-bottom: 2rem;
            }
          }
          
          @media screen and (max-width: 550px) {
            main {
              margin: 3rem auto 2.5rem;
            }
          }

          @media screen and (min-width: 2000px) {
            div {
              max-width: 72vw;
            }

            main {
              max-width: 39.5vw;
            }
          }

          @media screen and (min-width: 3000px) and (max-height: 1500px) {
            div {
              max-width: 60vw;
            }

            main {
              max-width: 32vw;
            }
          }
        `}</style>
    </>
  )
}