export async function getTokens() {
  const url = process.env.TOKENS_URL

  const res = await fetch(url)

  return await res.json()
}