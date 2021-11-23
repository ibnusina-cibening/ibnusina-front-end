import useSWR from "swr";
import { request, gql } from 'graphql-request'

const query = gql`
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

async function fetcher(postId) {
  const url = await process.env.NEXT_PUBLIC_GRAPH_URL; // HARUS MENGGUNAKAN PREFIX NEXT_PUBLIC agar berfungsi
  console.log('hi');
  const res = request(url, query, { postId });
  const d = await res;
  return d;
}

const SWRRequest = ({ postId }: { postId: String }) => {
  const { error, data } = useSWR<{
    getMetaPostCount: {
      commentCount: number
      viewCount: number
      shareCount: number
      reaction: {
        meLike: boolean
        meReaction: string
        mood: {
          LIKE: string
          SMILE: string
          SAD: string
          EXCITED: string
          PRAYING: string
        }
      }
    }
  }>([postId], fetcher, { revalidateOnFocus: false });
  const react = data?.getMetaPostCount;

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <small>{react?.viewCount>900? Math.round(react?.viewCount/ 1000).toFixed(1)+" k":react?.viewCount ?? 0}</small>
    </>
  )
}

export default SWRRequest;

// referensi belum dibaca lengkap:
//https://dev.to/aryanjnyc/i-migrated-away-from-apollo-client-to-vercel-swr-and-prisma-graphql-request-and-you-can-too-245b