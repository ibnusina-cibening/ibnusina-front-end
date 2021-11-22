// import fetch from 'isomorphic-unfetch'

export default async function<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  console.log(input, 'aku di sini');
  return res.json()
}