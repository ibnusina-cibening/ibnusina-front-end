// export const LOGIN = `
// query login($username: String!, $password: String!){
//   login(username: $username, password: $password)
// }
// `

export const LOGIN = `
  query getLogin($username: String!, $password: String!){
    getLogin(username:$username,password:$password){
      token
      myData {
        id
        callName
        role
        avatar
      }
    }
  }
`