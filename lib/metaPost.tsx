import myQuery from './query';

export default async function metaPost(id:String) {
    const postId = id;
    const query = myQuery.metaPost;
    const headers = myQuery.headers;
    const url = myQuery.url;
    const getData = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables: {"postId":postId},
      })
    };
    const response = await fetch(url, getData);
    if (!response.ok) {
      const message = `terjadi error di metaPost.tsx`;
      throw new Error(message);
    }
    const post = await response.json();
    return post;
  }