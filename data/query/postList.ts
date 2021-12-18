import { gql } from 'graphql-request';

const postList = gql`
query{
  loadPosts(limit:15){
    nextPost
    postResult{
      id
      title
      createdAt
      slug
      author{
        callName
        avatar
      }
      meta{
        viewCount
        commentCount
        shareCount
      }
    }
  }
}
  `;

export default postList;