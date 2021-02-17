export function normalizeBalance(balance) {
  if (balance.length > 18) {
    const enzk = balance.length - 18
    if (enzk < 5) {
      return balance.substring(0, enzk) + '.' + balance.substring(enzk, 5 - enzk)
    }
    return balance.substring(0, 5)
  } else {
    return '0.' + balance.substring(0, 4)
  }
}

export function formatValue(value) {
  return value.replace(',', '.').slice(0, 8)
}

export function normalizeAddress(addr) {
  return addr.substring(0, 6) + '...' + addr.substring(addr.length - 6, addr.length)
}