import Layout from "../components/Layout"
import {getTokens} from "./api/api"

export default function Home({tokens}) {

  const [nav, useNav] = useState('Swap')

  const navHandler = e => {
    const target = e.target.textContent

    useNav(target)
  }

  return (
      <Layout navHandler={navHandler} btnStyles={nav === 'Swap'}>
        {
          nav === 'Swap' && (
            <Swap tokens={tokens} />
          )
        }
      </Layout>
  )
}

export async function getServerSideProps() {
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
      tokens: tokens
    }
  }
}