import { useSession, signOut, signIn } from 'next-auth/react';
import { useState } from 'react';
import {Button} from '@mui/material';

export function Login({ getLogin }:{getLogin:any}) {
    const [login, setIslogin] = useState(true);
    // console.log('hello dari library login')
    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            setIslogin(false);
        }
    });
    const setLogin = (e: boolean) => {
        getLogin(e);

    }
    const theUrl = process.env.NODE_ENV !== 'production'? 'http://localhost:3000': 'https://ibs-web-dev.vercel.app';
    return (
        <>
            {
                session ? <Button size ={'medium'}  variant = "contained" sx={{ position: 'relative', right: 0 }} onClick={() => {
                    signOut({ redirect: false, callbackUrl: theUrl });
                    setLogin(false);
                }
                }>Sign out</Button> :

                    <Button size ={'medium'} variant = "contained" sx={{ position: 'relative', right: 0 }} onClick={() => {
                        setLogin(true);
                        signIn();
                    }
                    }
                    >Sign in</Button>
            }
        </>
    )
}