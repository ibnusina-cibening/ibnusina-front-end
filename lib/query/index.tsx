import postList from './postList';
import postContent from './postContent';
import metaPost from './metaPost';

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'authorization': 'Bearear token',
  };

const url = process.env.GRAPH_URL;
export default {postList, postContent, metaPost, headers, url};