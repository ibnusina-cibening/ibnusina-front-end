import { gql } from 'graphql-tag';

export const query = gql`
    query{
        allTag{
        id
        title
        }
        allCategory{
        id
        title
        }
    }`
