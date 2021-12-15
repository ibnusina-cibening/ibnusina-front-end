import { gql } from 'graphql-request';

const deleteComment = gql`
mutation deleteComment($postId: ID!, $commentId: ID!, $userId: ID, $parentUserId: ID){
  deleteComment(postId: $postId, commentId: $commentId, userId: $userId, parentUserId: $parentUserId){
    id
  }
}
`;
export default deleteComment;