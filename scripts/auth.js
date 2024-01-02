import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyALC8nAlW2j15GENHOCSyM1ih3MYDextMk",
  authDomain: "auth-32b7a.firebaseapp.com",
  projectId: "auth-32b7a",
  storageBucket: "auth-32b7a.appspot.com",
  messagingSenderId: "634941183851",
  appId: "1:634941183851:web:eb0af903e48bdbe6d91e2e",
  measurementId: "G-PZMJ2FY517",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-tag");
googleLogin.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
});
