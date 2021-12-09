import { gql } from 'graphql-request';

const editComment = gql`
mutation updateComment ($commentId: ID!, $content: String!){
  updateComment( commentId:$commentId, content:$content){
    id
    parentId
    content
    children
    numofchildren
    createdAt
    postId
    userId
  }
}
`;
export default editComment;