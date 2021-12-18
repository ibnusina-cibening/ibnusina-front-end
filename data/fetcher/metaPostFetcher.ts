import { GraphQLClient } from 'graphql-request';
import { metaPost, actionToPost } from '../query';
const url = process.env.NEXT_PUBLIC_GRAPH_URL!;

export async function fetchMetaPost(postId: string, token: string) {
  const client = new GraphQLClient(url);
  console.log('hi dari meta post');
  const requestHeaders = {
    Authorization: token
  }
  const res = client.request(metaPost, { postId }, requestHeaders);
  const d = await res;
  return d;
}

export async function actionToThisPost (action:string, postId: string, token: string) {
  const client = new GraphQLClient(url);
  console.log('hi dari action to post');
  const requestHeaders = {
    Authorization: token
  }
  const res = client.request(actionToPost, {action, postId }, requestHeaders);
  const d = await res;
  return d;
}