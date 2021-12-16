import { gql } from 'graphql-request';

const addComment = gql`
mutation addComment ($postId: ID!, $content: String!, $parentUserId: ID, $parentCommentId:ID){
  addComment(
    postId: $postId
    content: $content
    parentUserId: $parentUserId
    parentCommentId: $parentCommentId
  ){
    id
    parentId
    content
    children
    numofchildren
    identity{
      callName
      avatar
    }
    createdAt
    postId
    userId
  }
}
`;
export default addComment;