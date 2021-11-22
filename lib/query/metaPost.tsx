const getMetaPost = `
query getMetaPostCount ($slug:String!){
    getMetaPostCount(slug:$slug){
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