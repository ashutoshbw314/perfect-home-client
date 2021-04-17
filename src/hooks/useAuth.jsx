// The following codes is inspired by https://usehooks.com/useAuth/

import React, { useState, useEffect, useContext, createContext } from "react";
import {checkAdmin} from '../API/API';
import firebase from '../firebase';

const authContext = createContext();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const fbAuthProvider = new firebase.auth.FacebookAuthProvider();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

const storeAuthToken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    // Send token to your backend via HTTPS
    // ...
    sessionStorage.setItem("token", idToken);
  }).catch(function(error) {
    // Handle error
  });
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signIn = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        storeAuthToken();
        return response.user;
      });
  };

  const rememberMe = (yesOrNo) => {
    return firebase.auth().setPersistence(yesOrNo ? firebase.auth.Auth.Persistence.LOCAL : 
                                                    firebase.auth.Auth.Persistence.SESSION);
  }

  const signUp = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        sendEmailVerification();
        return response.user;
      });
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut();
  };

  const sendPasswordResetEmail = email => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const sendEmailVerification = () => {
    return firebase.auth().currentUser
      .sendEmailVerification();
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  const signInWithGoogle = () => {
    return firebase.auth()
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        return result.user;
      })
  };
  
  const signInWithFacebook = () => {
    return firebase.auth()
      .signInWithPopup(fbAuthProvider)
      .then((result) => {
        return result.user;
      })
  };

  const socialSignIn = media => {
    if (media == 'google') return signInWithGoogle();
    else if (media == 'facebook') return signInWithFacebook();
    else return null;
  }

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      document.body.classList.remove('loading');
      if (user) {
        const isAdmin = await checkAdmin(user.email);
        user.isAdmin = isAdmin;
      }
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signIn,
    rememberMe,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
    socialSignIn
  };
}

