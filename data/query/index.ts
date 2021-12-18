import postList from './postList';
import postContent from './postContent';
import metaPost from './metaPost';
import getComment from './getComment';
import addComment from './addComment';
import editComment from './editComment';
import deleteComment from './deleteComment';
import actionToPost from './actionToPost'

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'authorization': 'Bearear token'
  };

const url = process.env.NEXT_PUBLIC_GRAPH_URL;
export {
    postList, 
    postContent, 
    metaPost,
    getComment,  
    actionToPost,
    headers, 
    url,
    addComment,
    editComment,
    deleteComment
  };