import { GraphQLClient } from 'graphql-request';
import { postList, postContent, } from '../query';
const url = process.env.GRAPH_URL!;

export async function fetchPostList() {
  const headers = {
    Authorization: ''
  }
  const client = new GraphQLClient(url, { headers });
  const res = await client.request(postList);
  return res;
}
export async function fetchPostContent(slug: String) {
  const headers = {
    Authorization: ''
  }
  const client = new GraphQLClient(url);
  const res = await client.request(postContent, { slug }, headers);
  return res;
}

export async function fetchAllPostId() {
  const headers = {
    Authorization: ''
  }
  const client = new GraphQLClient(url, { headers });
  const res = await client.request(postList);
  return res.loadPosts.postResult.map((d: { slug: string; }) => {
    return {
      params: {
        slug: d.slug
      }
    }
  })
}