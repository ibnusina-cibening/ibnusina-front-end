import React from 'react';
// import ReactDOM from 'react-dom';
// import GoogleLogin from 'react-google-login';
// or
import { refreshTokenSetup } from '../../lib/refreshToken';
import { GoogleLogin, GoogleLogout, useGoogleLogout, useGoogleLogin } from 'react-google-login';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const responseGoogle = (response) => {
  console.log(response);
}

const logout = () => {
  console.log('okeh');
}

function Login() {
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  )
}


function Logout() {
  return (
    <GoogleLogout
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={logout}
    > 
    </GoogleLogout>
  )
}

function LoginHooks() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className="button">
      <img src="images/google.svg" alt="google login" className="icon"></img>
      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Login />
      <Logout />
    </div>)
}
// export default App;

