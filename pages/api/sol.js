import {ChainId, Token, WETH, Fetcher, Route} from '@uniswap/sdk'
import {ethers} from "ethers"

const network = "homestead"

const provider = ethers.getDefaultProvider(network, {
  alchemy: process.env.ALCHEMY_API
})

export async function getPrice(addr1, addr2, dec1, dec2) {

  let price1
  let price2

  if (addr1 == addr2) {
      return [1, 1]
  } else if (addr1 === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' || addr1 === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
    price1 = 1
    price2 = await getTokenPrice(addr2, dec2)
  } else if (addr2 === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' || addr2 === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
    price1 = await getTokenPrice(addr1, dec1)
    price2 = 1
  } else {
    price1 = await getTokenPrice(addr1, dec1)
    price2 = await getTokenPrice(addr2, dec2)
  }

  return [price1 / price2, price2 / price1]
}

async function getTokenPrice(addr, dec) {
  const token = new Token(ChainId.MAINNET, addr, dec)
  const pair = await Fetcher.fetchPairData(token, WETH[ChainId.MAINNET], provider)

  const route = new Route([pair], WETH[ChainId.MAINNET])

  return route.midPrice.toSignificant(6)
}


