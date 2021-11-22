import myquery from './query';
export default async function postData() {
    const query = myquery.postList;
    const headers = myquery.headers
    const url = myquery.url;
    const getData = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query 
      })
    };
    const response = await fetch(url, getData);
    if (!response.ok) {
      const message = `terjadi masalah di all post id`;
      throw new Error(message);
    }
    const post = await response.json();
    return post.data.loadPosts.postResult.map(d => {
        return {
          params: {
            slug:d.slug
          }
        }
      })
  }