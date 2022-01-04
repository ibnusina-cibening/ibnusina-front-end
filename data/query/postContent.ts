const getPostContent = `
  query getPostContent ($slug:String!) {
    postBySlug(slug:$slug){
      id
      slug
      title
      content
      imageUrl
      author{
        callName
        avatar
      }
      meta{
        commentCount
        viewCount
        shareCount
        
      }
    }
  }
  `;

  export default getPostContent;