export function normalizeBalance(balance) {
  if (balance.length > 18) {
    const eth = balance.length - 18
    if (eth < 5) {
      return balance.substring(0, eth) + '.' + balance.substring(eth, 5 - eth)
    }
    return balance.substring(0, 5)
  } else {
    return '0.' + balance.substring(0, 4)
  }
}

export function normalizeAddress(addr) {
  return addr.substring(0, 6) + '...' + addr.substring(addr.length - 6, addr.length)
}