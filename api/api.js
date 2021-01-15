import {BigNumber, FixedNumber, ethers} from "ethers"

export async function getTokens() {
  const url = process.env.TOKENS_URL

  const res = await fetch(url)

  return await res.json()
}

export async function connectToMetamask() {
  let isConnect

  try {
    await window.ethereum.request({method: 'eth_requestAccounts'})
    isConnect = true
  } catch (e) {
    if (e.code === 4001) {
      isConnect = false
      console.log('Please connect to your wallet.')
    } else {
      isConnect = false
      console.error(e.message)
    }
  }

  return isConnect
}

export async function getAccount() {
  let accounts

  try {
    accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
  } catch (e) {
    if (e.code === 4001) {
      console.log('Please connect to your wallet.')
    } else {
      console.error(e.message)
    }
  }

  return accounts[0]
}

export async function getBalance() {
  let balance

  const account = await getAccount()
  try {
    balance = await window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
  } catch (e) {
    if (e.code === 4001) {
      console.log('Please connect to your wallet.')
    } else {
      console.error(e.message)
    }
  }

  return balance
}

export async function getERC20Balance(addr) {
  const account = await getAccount()

  if (addr === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
    const bal = await getBalance()

    return FixedNumber.from(BigNumber.from(bal)).divUnsafe(FixedNumber.from(ethers.constants.WeiPerEther)).toString()
  }

  const network = "homestead"
  const provider = ethers.getDefaultProvider(network, {
    alchemy: process.env.ALCHEMY_API
  })

  const abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function transfer(address to, uint amount) returns (boolean)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
  ]

  const erc20 = new ethers.Contract(addr, abi, provider)
  const balance = await erc20.balanceOf(account)

  return FixedNumber.from(BigNumber.from(balance)).divUnsafe(FixedNumber.from(ethers.constants.WeiPerEther)).toString()
}

export async function getGasPrice() {
  const url = process.env.GAS_URL

  const res = await fetch(url)
  return await res.json()
}

export async function getIpAndLocation() {
  const url = process.env.IP_URL

  const res = await fetch(url)
  return res.json()
}