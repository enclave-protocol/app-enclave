import Layout from "../components/Layout"
import Swap from "../components/Swap"
import Pool from "../components/Pool"
import {useState} from "react"
import {getTokens, getGasPrice} from "./api/api"

export default function Home({tokens, gasPriceInit}) {

  const [nav, useNav] = useState('Swap')

  const navHandler = e => {
    const target = e.target.textContent

    useNav(target)
  }

  return (
      <Layout gasPriceInit={gasPriceInit} navHandler={navHandler} btnStyles={nav === 'Swap'}>
        {
          nav === 'Swap' && (
            <Swap tokens={tokens} />
          )
        }

        {
          nav === 'Pool' && (
            <Pool />
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