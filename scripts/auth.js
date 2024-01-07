import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
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

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//sign up

const signUpForm = document.querySelector("#signUpForm");
// console.log(signInForm);
if (signUpForm != null) {
  document.querySelector("#signUpForm").oninput = function () {
    let password = document.querySelector("#floatingPassword").value;
    let confirmPassword = document.querySelector(
      "#floatingConfirmPassword"
    ).value;
    if (password != confirmPassword) {
      document.querySelector("#passwordMismatch").style.display = "inline";
      const signUpButton = document.querySelector("#signUpButton");
      signUpButton.disabled = true;
    } else {
      const signUpButton = document.querySelector("#signUpButton");
      signUpButton.disabled = false;
      document.querySelector("#passwordMismatch").style.display = "none";
      signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = signUpForm["floatingInput"].value;
        const password = signUpForm["floatingPassword"].value;
        const confirmPassword = signUpForm["floatingConfirmPassword"].value;
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;

            signUpForm.reset();
            window.location.href = "index.html";
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
          });
      });
    }
  };
}

//sign in
const signInForm = document.querySelector("#signInForm");
if (signInForm != null) {
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signInForm["loginEmail"].value;
    const password = signInForm["loginPassword"].value;
    const signInButton = document.querySelector("#signInButton");
    console.log(email, password);
    signInButton.innerHTML = "Signing In...";
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user);
        // window.location.href = "index.html";
        signInButton.innerHTML = "Sign In";
        // ...
      })
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  });
}

//google sign in
const googleLogin = document.getElementById("google-login-tag");
if (googleLogin != null) {
  googleLogin.addEventListener("click", (e) => {
    e.preventDefault();
    googleLogin.innerHTML = "Signing In...";
    signInWithRedirect(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        // window.location.href = "index.html";
      })
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  });

  auth.onAuthStateChanged(function (user) {
    if (user) {
      window.location.href = "index.html";
    } else {
    }
  });
}

//sign out
if (!window.location.pathname === "/signin.html") {
  signOut.addEventListener("click", (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
        showMenu();
      })
      .catch((error) => {
        // An error happened.
      });
  });
} else if (!window.location.pathname === "/signup.html") {
  signOut.addEventListener("click", (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
        showMenu();
      })
      .catch((error) => {
        // An error happened.
      });
  });
}

//on auth state change
auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log("user is signed in");
    console.log(user);
    showUI(user);

    showProfile(user);
  } else {
    if (window.location.pathname === "/signin.html") {
      return;
    } else if (window.location.pathname === "/signup.html") {
      return;
    } else {
      showUI();
    }
    showProfile();
    console.log("user is not signed in");
  }
});
