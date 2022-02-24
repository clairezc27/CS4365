import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
    apiKey: "AIzaSyA9fhIr2j19riVzjApBZeM6MO_2EMOU5SY",
    authDomain: "my-sous-chef-1cae3.firebaseapp.com",
    projectId: "my-sous-chef-1cae3",
    storageBucket: "my-sous-chef-1cae3.appspot.com",
    messagingSenderId: "640918035261",
    appId: "1:640918035261:web:bcd56b1ce1c9a781820354",
    measurementId: "G-M20WL0H016"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

function Login () {
    let navigate = useNavigate();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      navigate('/search');
      
    }).catch((error) => {
      console.log(error.message);
    });

    return (
        <div>
            <p>Login page</p>
        </div>
    );

}

export default Login;