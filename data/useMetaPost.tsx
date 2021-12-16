import useSWR from "swr";
import { GraphQLClient } from 'graphql-request';
import { metaPost } from './query';
import convertToKilo from '../lib/convertToKilo';

async function fetcher(postId: any) {
  const url = await process.env.NEXT_PUBLIC_GRAPH_URL; // HARUS MENGGUNAKAN PREFIX NEXT_PUBLIC agar berfungsi
  const client = new GraphQLClient(url);
  console.log('hi dari meta post');
  const requestHeaders = {
    Authorization: ''
  }
  const res = client.request(metaPost, { postId }, requestHeaders);
  const d = await res;
  return d;
}

const useMetaPost = (postId: any) => {
  const { error, data } = useSWR<{
    getMetaPostCount: {
      commentCount: number
      viewCount: number
      shareCount: number
      reaction: {
        meLike: boolean
        meReaction: string
        mood: {
          LIKE: number
          SMILE: number
          SAD: number
          EXCITED: number
          PRAYING: number
        }
      }
    }
  }>([postId], fetcher, { revalidateOnFocus: false });
  return {
    metaPost: data?.getMetaPostCount,
    isLoading: !error && !data,
    isError: error
  }
}

function ViewStats({ postId }: { postId: String }) {
  const { metaPost, isLoading, isError } = useMetaPost(postId);
  if (isLoading) return <div>loading</div>
  if (isError) return <div>error</div>
  return <>
    <div>{convertToKilo(metaPost?.viewCount)} kali dilihat</div>
    <div>{convertToKilo(metaPost?.commentCount)} komentar</div>
    <div>{convertToKilo(metaPost?.shareCount)} kali dibagikan</div>

  </>
}

function ViewReaction({ postId }: { postId: String }) {
  const { metaPost, isLoading, isError } = useMetaPost(postId);
  if (isLoading) return <div>loading</div>
  if (isError) return <div>error</div>
  const reaction = metaPost?.reaction;
  const mood = reaction?.mood;
  const myReaction = reaction?.meReaction;
  return <div>
    <span role="img" aria-label="excited">😍: {convertToKilo(mood?.EXCITED)}{myReaction === 'EXCITED' ? " Termasuk kamu" : null}</span>
    <span role="img" aria-label="praying">🙏: {convertToKilo(mood?.PRAYING)} {myReaction === 'PRAYING' ? " Termasuk kamu" : null}</span>
    <span role="img" aria-label="sad">😥: {convertToKilo(mood?.SAD)} {myReaction === 'SAD' ? " Termasuk kamu" : null}</span>
    <span role="img" aria-label="smile">😀 : {convertToKilo(mood?.SMILE)} {myReaction === 'SMILE' ? " Termasuk kamu" : null}</span>
  </div>
}
// referensi emoticon in react: https://medium.com/@seanmcp/%EF%B8%8F-how-to-use-emojis-in-react-d23bbf608bf7
function ViewLike({ postId }: { postId: String }) {
  const { metaPost, isLoading, isError } = useMetaPost(postId);
  if (isLoading) return <div>loading</div>
  if (isError) return <div>error</div>
  const reaction = metaPost?.reaction;
  const mood = reaction?.mood;
  const includingYou = reaction?.meLike ? " termasuk kamu" : null;
  return <>
    <div>Suka: {convertToKilo(mood?.LIKE)} {includingYou}</div>
  </>
}




export { ViewStats, ViewReaction, ViewLike };

// referensi belum dibaca lengkap:
//https://dev.to/aryanjnyc/i-migrated-away-from-apollo-client-to-vercel-swr-and-prisma-graphql-request-and-you-can-too-245b