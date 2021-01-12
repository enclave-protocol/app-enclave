import Layout from "../components/Layout"
import Swap from "../components/Swap"
import Pool from "../components/Pool"
import {useState} from "react"
import {getTokens, getGasPrice} from "../api/api"
import {motion} from "framer-motion"

export default function Home({tokens, gasPriceInit}) {

  const [nav, useNav] = useState('swap')

  const navHandler = e => {
    const target = e.target.textContent

    target.toLowerCase()
    useNav(target)
  }

  return (
      <Layout gasPriceInit={gasPriceInit} navHandler={navHandler} btnStyles={nav === 'swap'}>
        {
          nav === 'swap' && (
              <motion.div
                      initial={{opacity: 0.15}}
                      animate={{opacity: 0.9}}
                      exit={{opacity: 0}}
                      transition={{duration: 1}}
                  >
                <Swap tokens={tokens} />
              </motion.div>
          )
        }
        {
          nav === 'pool' && (
              <motion.div
                      initial={{opacity: 0.15}}
                      animate={{opacity: .9}}
                      exit={{opacity: 0}}
                      transition={{duration: 1}}
                  >
                <Pool />
              </motion.div>
          )
        }
      </Layout>
  )
}

export async function getServerSideProps() {
  const {fastest} = await getGasPrice()
  const gasPriceInit = fastest / 10

  const {tokens} = await getTokens()

  tokens.push({
    "chainId": 1,
    "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "name": "Ethereum",
    "symbol": "ETH",
    "decimals": 18,
    "logoURI": "https://tokens.1inch.exchange/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png"
  })

  return {
    props: {
      tokens: tokens,
      gasPriceInit
    }
  }
}