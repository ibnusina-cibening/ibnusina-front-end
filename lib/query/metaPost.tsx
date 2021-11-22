const getMetaPost = `
query getMetaPostCount ($postId:ID!){
    getMetaPostCount(postId:$postId){
      id
      commentCount
      viewCount
      shareCount
      reaction{
        meLike
        meReaction
        mood{
          LIKE
          SMILE
          SAD
          EXCITED
          PRAYING
        }
      }
    }
  }

`;

export default getMetaPost;