import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDUK2UwEJM5lITO9inXtVT8rkEwBtvhuCY",
  authDomain: "quantumcode-me.firebaseapp.com",
  projectId: "quantumcode-me",
  storageBucket: "quantumcode-me.appspot.com",
  messagingSenderId: "288891407284",
  appId: "1:288891407284:web:6bf03397bc432e7d3e00e1",
  measurementId: "G-ZKRYZJE51V",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
//sign in
// const signInForm = document.querySelector("#signInForm");
// console.log(signInForm);
// signInForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const email = signInForm["loginEmail"].value;
//   const password = signInForm["loginPassword"].value;
//   // console.log(email, password);
//   signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;

//       window.location.href = "index.html";
//       console.log(user);
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorMessage);
//     });
// });
//sign up
// const signUpForm = document.querySelector("#signUpForm");
// console.log(signUpForm);
// signUpForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const email = signUpForm["floatingInput"].value;
//   const password = signUpForm["floatingPassword"].value;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;

//       signUpForm.reset();
//       window.location.href = "index.html";

//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(error);
//       // ..
//     });
// });
// firebase.auth().onAuthStateChanged(function (user) {
//   if (user) {
//     // The user is signed in.
//     // Redirect the user to the appropriate page.
//     window.location.href = "index.html";
//   } else {
//     // The user is not signed in.
//     // Redirect the user to the sign-in page.
//     window.location.href = "signup.html";
//   }
// });

// signOut;
// const signOut = document.querySelector("#signOut");

// signOut.addEventListener("click", (e) => {
//   e.preventDefault();
//   auth
//     .signOut()
//     .then(() => {
//       // Sign-out successful.
//       console.log("signed out");
//     })
//     .catch((error) => {
//       // An error happened.
//     });
// });

//whether the user is log in or not
// auth.onAuthStateChanged(function (user) {
//   if (user) {
//     // User is signed in.
//     // Redirect the user to the appropriate page.
//     console.log("user is signed in");
//     console.log(user);
//   } else {
//     // No user is signed in.
//     // Redirect the user to the sign-in page.
//     console.log("user is not signed in");
//   }
// });

//google login

// auth.languageCode = "en";
// const analytics = getAnalytics(app);
// const provider = new GoogleAuthProvider();

// const googleLogin = document.getElementById("google-login-tag");
// googleLogin.addEventListener("click", () => {
//   signInWithRedirect(auth, provider)
//     .then((result) => {
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       const user = result.user;
//       console.log(user);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       const email = error.email;
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       console.log(errorCode, errorMessage, email, credential);
//     });
// });
