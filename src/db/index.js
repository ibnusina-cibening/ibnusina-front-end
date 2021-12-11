import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: `https://tctshv3433.execute-api.us-east-1.amazonaws.com/test/graphql`,
    cache: new InMemoryCache({addTypename: false}),
});

export { gql } from '@apollo/client';
export default client;
export {default as QueryPosts} from './query/blog/loadPosts';
export {default as QueryDetailPosts} from './query/blog/detail';