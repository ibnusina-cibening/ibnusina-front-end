import { gql } from 'graphql-tag';

export default function query(q){
  return {
    query: gql`query{
      postBySlug(slug:"${q}"){
        id
        title
        content
        imageUrl
    		author{
          avatar
          callName
        }
        meta{
          commentCount
          shareCount
          viewCount
        }
      }
    }`
  }
}