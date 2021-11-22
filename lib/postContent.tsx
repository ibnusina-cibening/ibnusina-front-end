import myQuery from './query';

export default async function postContent(s:String) {
    const slug = s;
    const query = myQuery.postContent;
    const headers = myQuery.headers;
    const url = myQuery.url;
    const getData = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables: {"slug":slug},
      })
    };
    const response = await fetch(url, getData);
    if (!response.ok) {
      const message = `terjadi error di postContent.tsx`;
      throw new Error(message);
    }
    const post = await response.json();
    return post;
  }