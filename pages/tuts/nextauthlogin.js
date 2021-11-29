import { signIn } from 'next-auth/client'
import { useSession } from 'next-auth/client'
import React from 'react'
import Image from 'next/image'

// export default function AccessDenied () {
//   return (
//     <>
//       <h1>Access Denied</h1>
//       <p>
//         <a href="/api/auth/signin"
//            onClick={(e) => {
//            e.preventDefault()
//            signIn()
//         }}>You must be signed in to view this page</a>
//       </p>
//     </>
//   )
// }

export default function Page () {
  const [ session, loading ] = useSession()
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  // console.log(session);
  if (!session) { return  <p>akses ditolak</p> }

  // If session exists, display content
  return (
    <>
      <h1>Protected Page</h1>
      <p><strong>Welcome {session.user.name}</strong></p>
    </>
  )
}

// referensi : https://dev.to/ndom91/adding-authentication-to-an-existing-serverless-next-js-app-in-no-time-with-nextauth-js-192h
// refresh token : https://next-auth.js.org/tutorials/refresh-token-rotation
// https://next-auth.js.org/getting-started/client#signout