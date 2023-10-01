import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../Firebase/firebase.init';

const Login = () => {

    const [user, setUser] = useState(null);

    const auth = getAuth(app);
    console.log(app)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();


    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
        .then(result => {
            const loggedInuser = result.user;
            console.log(loggedInuser);
            setUser(loggedInuser);
        })
        .catch(error => {
            console.log(error);
        });
    }


    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const loggedInuserone = result.user;
            console.log(loggedInuserone);
            setUser(loggedInuserone);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleSignOut = () => {
        signOut(auth)
        .then(result => {
            console.log(result);
            setUser(null);

        })
        .catch(error => {
            console.log(error);
        })
    }


    return (
        <div>

            {/* user ? logout : sign in */}

           {
            user ? 
            <button onClick={handleSignOut}>Sign out</button> :
           <div>
            <button onClick={handleGoogleSignIn}>Google login</button>
            <button onClick={handleGithubSignIn}>Github login</button>
            </div>}

         {
           user && <div>
              <h3>User: {user?.displayName}</h3>
              <p>User Email: {user?.email}</p>
              <img src={user?.photoURL} alt="" />
             </div>
         }

        </div>
    );
};

export default Login;