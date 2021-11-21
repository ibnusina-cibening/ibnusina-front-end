export default async function postContent(s:String) {
    const slug = s;
    // console.log(`hallo dari ${s}`);
    const getData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': 'Bearear token',
      },
      body: JSON.stringify({
        query,
        variables: {"slug":slug},
      })
    };
    const response = await fetch('https://3t2zg4dxxl.execute-api.us-east-1.amazonaws.com/dev/graphql', getData);
    // console.log(response);
    if (!response.ok) {
      const message = `terjadi error di postContent.tsx`;
      throw new Error(message);
    }
    const post = await response.json();
    // console.log(post);
    return post;
  }
  
  const query = `
  query getPostContent ($slug:String!) {
    postBySlug(slug:$slug){
      id
      slug
      title
      content
      meta{
        commentCount
        viewCount
        shareCount
        
      }
    }
  }
  `;