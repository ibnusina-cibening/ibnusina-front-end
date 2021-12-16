import useSWR from "swr";
import { GraphQLClient } from 'graphql-request';
import { metaPost } from './query';
import convertToKilo from 'lib/convertToKilo'; 

async function fetcher(postId: any) {
  const url = await process.env.NEXT_PUBLIC_GRAPH_URL!; // HARUS MENGGUNAKAN PREFIX NEXT_PUBLIC agar berfungsi
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
  const vc = !metaPost?.viewCount?0:metaPost?.viewCount;
  const cc = !metaPost?.commentCount?0:metaPost?.commentCount;
  const sc = !metaPost?.shareCount?0:metaPost?.shareCount;
  return <>
    <div>{convertToKilo({number:vc})} kali dilihat</div>
    <div>{convertToKilo({number:cc})} komentar</div>
    <div>{convertToKilo({number:sc})} kali dibagikan</div>

  </>
}

function ViewReaction({ postId }: { postId: String }) {
  const { metaPost, isLoading, isError } = useMetaPost(postId);
  if (isLoading) return <div>loading</div>
  if (isError) return <div>error</div>
  const reaction = metaPost?.reaction;
  const mood = reaction?.mood;
  const myReaction = reaction?.meReaction;

  const excited = !mood?.EXCITED?0:mood.EXCITED;
  const praying = !mood?.PRAYING?0:mood.PRAYING;
  const sad = !mood?.SAD?0:mood.SAD;
  const smile = !mood?.SMILE?0:mood.SMILE;
  return <div>
    <span role="img" aria-label="excited">😍: {convertToKilo({number:excited})}{myReaction === 'EXCITED' ? " Termasuk kamu" : null}</span>
    <span role="img" aria-label="praying">🙏: {convertToKilo({number:praying})} {myReaction === 'PRAYING' ? " Termasuk kamu" : null}</span>
    <span role="img" aria-label="sad">😥: {convertToKilo({number:sad})} {myReaction === 'SAD' ? " Termasuk kamu" : null}</span>
    <span role="img" aria-label="smile">😀 : {convertToKilo({number:smile})} {myReaction === 'SMILE' ? " Termasuk kamu" : null}</span>
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
  const like = !mood?.LIKE?0:mood.LIKE;
  return <>
    <div>Suka: {convertToKilo({number:like})} {includingYou}</div>
  </>
}




export { ViewStats, ViewReaction, ViewLike };

// referensi belum dibaca lengkap:
//https://dev.to/aryanjnyc/i-migrated-away-from-apollo-client-to-vercel-swr-and-prisma-graphql-request-and-you-can-too-245b