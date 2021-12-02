import postList from './postList';
import postContent from './postContent';
import metaPost from './metaPost';
import fLogin from './fLogin';

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'authorization': 'Bearear token'
  };

const url = process.env.NEXT_PUBLIC_GRAPH_URL;
export {postList, postContent, metaPost, fLogin, headers, url};