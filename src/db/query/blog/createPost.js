import { gql } from '@apollo/client';

export const mutation = gql`mutation addPost($title: String!, $metaTitle: String!, $summary: String!, $published: Int!, $content: String!, $imageUrl: String!, $tagId: [ID]!, $categoryId: [ID]!){
    addPost(input:{title: $title, metaTitle: $metaTitle, summary: $summary, published: $published, content: $content, imageUrl: $imageUrl, tagId: $tagId, categoryId: $categoryId})
}`




// export default function mutation(){
//     return {
//         mutation: gql`mutation addPost($title: String!, $metaTitle: String!, $summary: String!, $published: Int!, $content: String!, $imageUrl: String!){
//             addPost(input:{title: $title, metaTitle: $metaTitle, summary: $summary, published: $published, content: $content, imageUrl: $imageUrl})
//         }`
//     }
// }