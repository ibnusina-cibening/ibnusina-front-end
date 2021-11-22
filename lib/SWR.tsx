import useSWR from "swr";
// import metaPost from "./metaPost";
import metaPost from "../lib/query";
import fetch from "../lib/fetch";
// const fetcher = async (
//   input: RequestInfo,
//   init: RequestInit,
//   ...args: any[]
// ) => {
//   const res = await fetch(input, init);
//   return res.json();
// };

import { request } from 'graphql-request'

// const fetcher = query => request(process.env.GRAPH_URL, query);
// const fetcher = (query, variables) => {
//   console.log(query, variables);
//   return request(process.env.GRAPH_URL, query, variables);
// };

// const query = {query: metaPost.metaPost};
// const getData = async(...args) => {
//   return await fetch(query);
// };
// export default function SWRRequest({postId}:{postId:String}) {
//   const id = postId as string
//   // const variables = { code: 14 };
//   // console.log(process.env.GRAPH_URL)
//   // console.log(variable);
//   // const { data, error } = useSWR(
//   //   [
//   //     query,
//   //     variable,
//   //   ],
//   //   fetcher
//   // );
//   const { data, error } = useSWR(query, getData);
//   if(error) {
//     return <div>Error...</div>
//   }
//   if(!data) {
//     return <div>Loading...</div>
//   }
//     console.log(data);
//   if (error) return <div>failed to load</div>;
//   if (!data) return <div>loading...</div>;
//   return <pre>{JSON.stringify(data, null, 2)}</pre>;
// }

// const fetcher = (query: any, first: string, take: string) => request('localhost:3000/api/graphql', query, { first, take });
const fetcherX = async (query, postId) => {
  console.log(postId);
  console.log(query);
  const x = await request(process.env.GRAPH_URL, query, { postId });
  return x;
} 
// the comment below gives us VSCode syntax highlighting!
const q = metaPost.metaPost;
const query = `
query getMetaPostCount ($postId:ID!){
  getMetaPostCount(postId:$postId){
    id
    commentCount
    viewCount
    shareCount
    reaction{
      meLike
      meReaction
      mood{
        LIKE
        SMILE
        SAD
        EXCITED
        PRAYING
      }
    }
  }
}
`;

const SWRRequest = ({postId}:{postId:String})=>{
  const { data } = useSWR<{
    id: string
    
  }>('postId', fetch)
  console.log('helloo');
  console.log(data);
  return <div>{'hello'}</div>
}

// const SWRRequestXX = ({postId}:{postId:String}) => {
//   // console.log(postId);
//   // console.log(JOB_POST_BY_ID_QUERY);
//   // const id = {"postId":postId}
//   // fetcher(postId);
//   const { data, error } = useSWR([postId], (x)=>fetcher(x));
//   const loading = !data;
//   if (loading) return <div>loading</div>
//   // console.log(data);
//   if (error) return <div>terjadi masalah</div>
//   return <pre>{JSON.stringify(data, null, 2)}</pre>;
// };
  
export default SWRRequest;

// async function fetcher (postId:String) {
//   console.log(postId);
//   // const postId = id;
//   const query = q;
//   const headers = metaPost.headers;
//   const url = process.env.GRAPH_URL;
//   const getData = {
//     method: 'POST',
//     headers,
//     body: JSON.stringify({
//       query,
//       variables: {"postId":postId},
//     })
//   };
//   const response = await fetch(url, getData);
//   if (!response.ok) {
//     const message = `terjadi error di metaPost.tsx`;
//     throw new Error(message);
//   }
//   const post = await response.json();
//   console.log(post);
//   return post;
// }

// referensi belum dibaca lengkap: 
//https://dev.to/aryanjnyc/i-migrated-away-from-apollo-client-to-vercel-swr-and-prisma-graphql-request-and-you-can-too-245b