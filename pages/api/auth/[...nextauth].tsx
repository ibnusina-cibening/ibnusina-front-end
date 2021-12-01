import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google"

// async function fetcher(postId) {
//   const url = await process.env.NEXT_PUBLIC_GRAPH_URL; // HARUS MENGGUNAKAN PREFIX NEXT_PUBLIC agar berfungsi
//   const client = new GraphQLClient(url)
//   console.log('hi');
//   const requestHeaders = {
//     Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhYjhiMDhlLWMwMzEtNDYyYi1hNTQ1LTVlN2IwMmYyMzg2OSIsInVzZXJuYW1lIjoiam9rbyIsInJvbGUiOiJhZG1pbiIsImF2YXRhciI6Imh0dHBzOi8vdWNhcmVjZG4uY29tLzc3OTJlMTYxLTg2N2EtNDFiYy05ZGNiLTMzOWM4ZWJlOWM3ZS8tL3ByZXZpZXcvNDAweDQwMC8iLCJjYWxsTmFtZSI6Impva28gdGluZ2tpciIsImlhdCI6MTYzNzczMDExOCwiZXhwIjoxNjM3NzY2MTE4fQ.7BcaveQLPAORCaDXvSBZOXIY8hzSvTiERzZSTjh7XBQ'
//   }
//   const res = client.request(metaPost, { postId }, requestHeaders);
//   const d = await res;
//   return d;
// }

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code"
      //   }
      // },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // HANYA BERJALAN SAAT EVENT LOGIN SAJA 
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        // console.log(user, account, profile, email, credentials);
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // DIRENDER SETIAP KALI USER MEMBUKA HALAMAN (WINDOW ON FOCUS)
      return token;
    },
    async session({ session, token, user }) {
      // DIRENDER SETIAP KALI USER MEMBUKA HALAMAN (WINDOW ON FOCUS)
      // console.log('aku dari call back session') 
      // let x = document.cookie;
      // console.log(x);
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

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days 

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  }
}
)

// referensi:

// tema login/logout: https://next-auth.js.org/configuration/pages
// get token : https://blog.srij.dev/nextauth-google-access-token
// TOKEN : https://stackoverflow.com/questions/69155653/how-to-get-current-provider-of-session-in-next-auth