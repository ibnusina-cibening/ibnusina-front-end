import { useSession, signOut, signIn } from 'next-auth/react';
import { useState } from 'react';

export function Login({ getlogin }) {
    const [login, setIslogin] = useState(true);
    // console.log('hello dari library login')
    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            setIslogin(false);
        }
    });
    const setLogin = (e) => {
        getlogin(e);

    }
    return (
        <>
            {
                session ? <button onClick={() => {
                    signOut({ redirect: false, callbackUrl: 'http://localhost:3000' });
                    setLogin(false);
                }
                }>Sign out</button> :

                    <button onClick={() => {
                        setLogin(true);
                        signIn();
                    }
                    }
                    >Sign in</button>
            }
        </>
    )
}