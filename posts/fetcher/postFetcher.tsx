import { GraphQLClient } from 'graphql-request';
import {postList} from '../query';

export async function fetchPostList () {
    const url = await process.env.NEXT_PUBLIC_GRAPH_URL;
    // const url = "http://localhost:4000/";
    const headers = {
        Authorization: ''
    }
    const client = new GraphQLClient(url, {headers});
    const res = await client.request(postList);
    return res;
}