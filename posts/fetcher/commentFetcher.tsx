import { GraphQLClient } from 'graphql-request';
import { getComment, addComment, editComment} from '../query';

export async function fetchComment(postId, next, isParent, commentParentId, limit) {
    console.log('hi dari fetchComent');
    const url = await process.env.NEXT_PUBLIC_GRAPH_URL;
    // const url = "http://localhost:4000/";
    const headers = {
        Authorization: ''
    }
    const client = new GraphQLClient(url, { headers });
    const res = await client.request(getComment, { postId, next, isParent, commentParentId, limit }, headers);
    const data = await res;
    return data;
}

export async function addCommentToList({ postId, content, parentUserId, parentCommentId, token }) {
    console.log('hai dari addCommenttoList');
    const url = await process.env.NEXT_PUBLIC_GRAPH_URL;
    // const url = "http://localhost:4000/"
    const headers = {
        Authorization: token
    }
    const client = new GraphQLClient(url, { headers });
    const res = await client.request(addComment, { postId, content, parentUserId, parentCommentId }, headers);
    const data = await res;
    return data;
}

export async function editCommentary ({token, commentId, content}){
    const url = await process.env.NEXT_PUBLIC_GRAPH_URL;
    // const url = "http://localhost:4000/"
    const headers = {
        Authorization: token
    }
    const client = new GraphQLClient(url, { headers });
    const res = await client.request(editComment, {commentId, content }, headers);
    const data = await res;
    return data;
}