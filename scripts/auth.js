import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
  getAuth,
  googleauthprovider,
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
const provider = new googleauthprovider();

const googleLogin = document.getElementById("google-login");
googleLogin.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = googleauthprovider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = googleauthprovider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
});
