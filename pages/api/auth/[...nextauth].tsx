import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import { GraphQLClient } from 'graphql-request';
import { fLogin } from '../../../posts/query'

async function fetcher(name, email, picture) {
  const url = await process.env.NEXT_PUBLIC_GRAPH_URL; // HARUS MENGGUNAKAN PREFIX NEXT_PUBLIC agar berfungsi
  const headers = {
    Authorization: ''
  }
  const variables = { username: name, email, avatar: picture }
  const client = new GraphQLClient(url, { headers });
  const res = client.request(fLogin, variables);
  const data = await res;
  return data.fLogin;
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
      async profile(profile) {
        const { name, email, picture } = profile;
        const fLogin = await fetcher(name.replace(/\s/g, "").toLowerCase(), email, picture);
        return {
          id: fLogin?.myData.id,
          token: fLogin?.token,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: fLogin?.myData.role
        }
      },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // HANYA BERJALAN SAAT EVENT LOGIN SAJA 
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        console.log(user);
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // DIRENDER SETIAP KALI USER MEMBUKA HALAMAN (WINDOW ON FOCUS) atau berinterak
      return token;
    },
    async session({ session, token, user }) {
      // DIRENDER SETIAP KALI USER MEMBUKA HALAMAN (WINDOW ON FOCUS) atau berinteraksi
      // session.id = 'asdjflwkjeje';
      return session
    }
  },
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    // strategy: "database",
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days 

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: "kKtIBqL3zsXOK2CBBfBvWFUcxc/CoFFmYpyvtDQJ3EM="
}
)

// referensi:

// tema login/logout: https://next-auth.js.org/configuration/pages
// get token : https://blog.srij.dev/nextauth-google-access-token
// TOKEN : https://stackoverflow.com/questions/69155653/how-to-get-current-provider-of-session-in-next-auth


// custom session : https://github.com/nextauthjs/next-auth/discussions/859
// typeORM adapter : https://typeorm.io/#/connection-options/postgres--cockroachdb-connection-options

// https://github.com/nextauthjs/adapters/blob/canary/packages/typeorm-legacy/docs/tutorials/typeorm-custom-models.md