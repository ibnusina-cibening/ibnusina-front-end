import { gql } from 'graphql-tag';

const query = {
  query: gql`query {
    loadPosts(limit: 10, timeStamp: "") {
      nextPost
      postResult {
        id
        title
        imageUrl
        author{
          callName
          avatar
        }
        summary
        slug
        meta {
          commentCount
          viewCount
          shareCount
        }
      }
    }
  } 
  `
};

export default query 