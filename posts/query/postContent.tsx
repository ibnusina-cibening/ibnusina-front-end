const getPostContent = `
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

  export default getPostContent;