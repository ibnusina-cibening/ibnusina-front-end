import { useSession, signOut, signIn } from 'next-auth/react';
import { useState } from 'react';
import {Button} from '@mui/material';

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
                session ? <Button size ={'medium'}  variant = "contained" sx={{ position: 'relative', right: 0 }} onClick={() => {
                    signOut({ redirect: false, callbackUrl: 'http://localhost:3000' });
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