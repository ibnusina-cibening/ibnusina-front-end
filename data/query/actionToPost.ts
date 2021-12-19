import { gql } from 'graphql-request';

const actionToPost = gql`
mutation actionToPost($action: ActionType!, $postId: ID!) {
  actionToPost(action: $action, postId: $postId) {
    added
    removed
  }
}
`;
export default actionToPost;