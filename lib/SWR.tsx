import useSWR from "swr";
// const fetcher = async (
//   input: RequestInfo,
//   init: RequestInit,
//   ...args: any[]
// ) => {
//   const res = await fetch(input, init);
//   return res.json();
// };

import { request } from 'graphql-request'

const fetcher = query => request(process.env.GRAPH_URL, query);
export default function SWRRequest({query, variable}:{query:string, variable:{slug:string}}) {
  // const variables = { code: 14 };
  const { data, error } = useSWR(
    [
      query,
      variable,
    ],
    fetcher
  );
    console.log(data);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}