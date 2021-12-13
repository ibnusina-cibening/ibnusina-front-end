import { gql } from 'graphql-request';

const getComment = gql`
query getCommentByPostId($postId:ID!, $next:Int, $isParent: Boolean!, $commentParentId: String, $limit:Int!){
  getCommentByPostId(postId:$postId, next: $next, isParent:$isParent, commentParentId:$commentParentId, limit:$limit) {
    nextTimeStamp
    results {
      id
      createdAt
      postId
      children
      userId
      content
      updatedAt
      parentId
      numofchildren
      identity {
        avatar
        callName
      }
    }
  }
  }
`;
export default getComment;