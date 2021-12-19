import { GraphQLClient } from 'graphql-request';
import { getComment, addComment, editComment, deleteComment} from '../query';
const url = process.env.NEXT_PUBLIC_GRAPH_URL!;

export async function fetchComment(postId: string, 
    next: number | null, 
    isParent: boolean, 
    commentParentId: string, 
    limit: number) {
    console.log('hi dari fetchComent');
    // const url = await process.env.NEXT_PUBLIC_GRAPH_URL;
    const headers = {
        Authorization: ''
    }
    const client = new GraphQLClient(url);
    const res = await client.request(getComment, { postId, next, isParent, commentParentId, limit }, headers);
    const data = await res;
    return data;
}

export async function addCommentToList({ postId, content, parentUserId, parentCommentId, token }:{
    postId:string, 
    content:string, 
    parentUserId:string, 
    parentCommentId:string, 
    token:string}) {
    console.log('hai dari addCommenttoList');
    // const url = await process.env.NEXT_PUBLIC_GRAPH_URL;
    const headers = {
        Authorization: token
    }
    const client = new GraphQLClient(url);
    const res = await client.request(addComment, { postId, content, parentUserId, parentCommentId }, headers);
    const data = await res;
    return data;
}

export async function editCommentary ({token, commentId, content}:{token:string, commentId:string, content:string}){
    // const url = await process.env.NEXT_PUBLIC_GRAPH_URL;
    // const url = "http://localhost:4000/"
    const headers = {
        Authorization: token
    }
    const client = new GraphQLClient(url);
    const res = await client.request(editComment, {commentId, content }, headers);
    const data = await res;
    return data;
}

export async function removeComment ({token, postId, commentId, userId, parentUserId}:{
    token:string,
    postId:string,
    commentId:string,
    userId:string,
    parentUserId:string
}){
    // const url = await process.env.NEXT_PUBLIC_GRAPH_URL;
    // const url = "http://localhost:4000/"
    const headers = {
        Authorization: token
    }
    const client = new GraphQLClient(url);
    const res = await client.request(deleteComment, {postId, commentId, userId, parentUserId}, headers);
    const data = await res;
    return data;
}