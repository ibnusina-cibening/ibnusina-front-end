export default async function postData() {
    const getData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': 'Bearear token',
      },
      body: JSON.stringify({
        query
      })
    };
    const response = await fetch('https://3t2zg4dxxl.execute-api.us-east-1.amazonaws.com/dev/graphql', getData);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const post = await response.json();
    // console.log(post);
    return post.data.loadPosts.postResult.map(d => {
        // console.log(d.slug);
        return {
          params: {
            slug:d.slug
          }
        }
      })
  }
  const query = `
  query{
    loadPosts(limit:5){
      postResult{
        slug
      }
    }
  }
    `;