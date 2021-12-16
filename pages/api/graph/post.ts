import { gql, GraphQLClient } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next'

const postList = gql`
  query{
    loadPosts(limit:15){
      nextPost
      postResult{
        id
        title
        createdAt
        slug
        author{
          callName
          avatar
        }
        meta{
          viewCount
          commentCount
          shareCount
        }
      }
    }
  }
  `;

const url = process.env.GRAPH_URL!; // hanya diakses di server ( tidak menggunakan prefix NEXT_PUBLIC)
const headers = {
    Authorization: ''
}

type ResponseData = {
    message: object
}

export default async function handler(req: NextApiRequest, res: NextApiResponse <ResponseData>) {
    const client = new GraphQLClient(url, { headers });
    const data = await client.request(postList);
    if (data) {
        res.status(200).json({message: data.loadPosts.postResult});
      } else {
        res.status(401)
      }
      res.end()
}