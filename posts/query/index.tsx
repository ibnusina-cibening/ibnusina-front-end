import postList from './postList';
import postContent from './postContent';
import metaPost from './metaPost';
import fLogin from './fLogin';
import getComment from './getComment';

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
    fLogin, 
    headers, 
    url
  };