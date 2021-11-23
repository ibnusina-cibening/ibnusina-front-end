import useSWR from "swr";
// import metaPost from "../lib/query";
import fetch from "../lib/fetch";
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

const SWRRequest = ({ postId }: { postId: String }) => {
  const url = "https://3t2zg4dxxl.execute-api.us-east-1.amazonaws.com/dev/graphql";
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': 'Bearear token'
    },
    body: JSON.stringify({
      query,
      variables: { "postId": postId }
    })
  };
  const { data, error} = useSWR([url, params], fetch);
  // const d = JSON.stringify(data);
  // console.log(data);
  // const react = d?.getMetaPostCount;
  // console.log(data);
  console.log(data);
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <small>{"react?.viewCount"}</small>
    </>
  )
}

export default SWRRequest;

// referensi belum dibaca lengkap:
//https://dev.to/aryanjnyc/i-migrated-away-from-apollo-client-to-vercel-swr-and-prisma-graphql-request-and-you-can-too-245b