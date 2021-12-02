import { gql } from 'graphql-request'; 


const fLogin = gql`
mutation fLogin($username:String!, $email:String!, $avatar: String){
  fLogin(username:$username, email:$email, avatar: $avatar){
    token
    myData{
      id
      callName
      role
      avatar
      detail{
        createdAt
        email
        lastLogin
        intro
        mobile
      }
    }
  }
  }
`;
export default fLogin;