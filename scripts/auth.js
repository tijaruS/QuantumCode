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
  databaseURL:
    "https://quantumcode-me-default-rtdb.asia-southeast1.firebasedatabase.app/",
  authDomain: "quantumcode-me.firebaseapp.com",
  projectId: "quantumcode-me",
  storageBucket: "quantumcode-me.appspot.com",
  messagingSenderId: "288891407284",
  appId: "1:288891407284:web:6bf03397bc432e7d3e00e1",
  measurementId: "G-ZKRYZJE51V",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
//firebase

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
  ref,
  getDatabase,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
const analytics = getAnalytics(app);
const db = getFirestore(app);
// db.Settings({ timestampsInSnapshots: true });
const rdb = getDatabase();
//sign up

export const signUpForm = document.querySelector("#signUpForm");
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
      // signUpForm.addEventListener("submit", (e) => {
      //   e.preventDefault();
      //   const college = signUpForm["floatingCollegeName"].value;
      //   const email = signUpForm["floatingInput"].value;
      //   const UserName = signUpForm["floatingUserName"].value;
      //   const password = signUpForm["floatingPassword"].value;
      //   const confirmPassword = signUpForm["floatingConfirmPassword"].value;
      //   signUpButton.innerHTML = "Signing Up...";
      //   addDoc(colRef1, {
      //     UserID: UserName,
      //     Email: email,
      //     College: college,
      //   });
      // });

      signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const college = signUpForm["floatingCollegeName"].value;
        const email = signUpForm["floatingInput"].value;
        const UserName = signUpForm["floatingUserName"].value;
        const password = signUpForm["floatingPassword"].value;
        const confirmPassword = signUpForm["floatingConfirmPassword"].value;
        signUpButton.innerHTML = "Signing Up...";

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("collegeName", college);
            localStorage.setItem("userID", UserName);
            localStorage.setItem("emailID", email);
            localStorage.setItem("userUid", user.uid);
          })
          .then(() => {})
          .then(() => {
            // signUpForm.reset();
            // window.location.href = "index.html";
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
          })
          .finally(() => {});
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
    // console.log(email, password);
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
const signOut = document.querySelector("#signOut");
if (
  window.location.pathname != "/signin.html" &&
  window.location.pathname != "/signup.html"
) {
  signOut.addEventListener("click", (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
        showMenu();
      })
      .then(() => {
        window.location.href = "index.html";
        localStorage.removeItem("userUid");
        localStorage.removeItem("handle");
        localStorage.removeItem("imageUrl");
        localStorage.removeItem("collegeName");
        localStorage.removeItem("userID");
        localStorage.removeItem("emailID");
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
    localStorage.setItem("userUid", user.uid);

    console.log(user);
    // console.log(user.uid);
    const userUid = localStorage.getItem("userUid");
    const colRef1 = doc(db, "UserInfo", userUid);

    const collegeName = localStorage.getItem("collegeName");
    const emailID = localStorage.getItem("emailID");
    let userID = localStorage.getItem("userID");
    // console.log(userUid, collegeName, emailID, userID);
    const colDb = ref(rdb, "users/");
    onValue(colDb, (snapshot) => {
      snapshot.forEach((data) => {
        let use = data.val();
        if (use.email != user.email) {
          if (userID === null) {
            userID = user.displayName;
          }
          // if (user.photoURL === null) {
          //   user.photoURL =
          //     "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1704153600&semt=ais";
          // }
          set(ref(rdb, "users/" + user.uid), {
            UID: user.uid,
            UserID: userID,
            Email: user.email,
            College: collegeName,
            profilePhoto:
              user.photoURL ||
              "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1704153600&semt=ais",
          });
        } else {
          return;
        }
      });
    });

    // setDoc(colRef1, {
    //   UID: userUid,
    //   UserID: userID,
    //   Email: emailID,
    //   College: collegeName,
    // });

    showUI(user);

    showProfile(user);

    // const pastContests = document.querySelector("#pastContests");
    // pastContests.style.display = "block";
    // document.querySelector("#text").style.display = "none";
  } else {
    if (window.location.pathname === "/signin.html") {
      return;
    } else if (window.location.pathname === "/signup.html") {
      return;
    } else {
      showUI();
    }
    showProfile();

    // const pastContests = document.querySelector("#pastContests");
    // pastContests.style.display = "none";
    // document.querySelector("#text").style.display = "block";
  }
});
const userUid = localStorage.getItem("userUid");
const collegeName = localStorage.getItem("collegeName");
const emailID = localStorage.getItem("emailID");
const userID = localStorage.getItem("userID");
// if (
//   userUid != null ||
//   collegeName != null ||
//   emailID != null ||
//   userID != null
// ) {
// console.log(userUid);
// console.log(collegeName);
// console.log(emailID);
// console.log(userID);
// }
// console.log(userUid);
if (
  window.location.pathname != "/signin.html" &&
  window.location.pathname != "/signup.html"
) {
  const userListBtn = document.getElementById("userListBtn");
  userListBtn.addEventListener("click", (e) => {
    showUserList();
  });
}

function showUserList() {
  document.querySelector("#populateUserList").innerHTML = `
  <div class="spinner-border text-primary mx-auto" role="status">
</div>`;
  let html = "";
  const colDb = ref(rdb, "users/");
  onValue(colDb, (snapshot) => {
    snapshot.forEach((data) => {
      let use = data.val();
      // console.log(use);
      html += `
      <div style='display:flex;align-items:center;margin-bottom:10px'>
       <div class="userDP">
                <img
                  class="rounded-5"
                  src="${use.profilePhoto}"
                  alt=""
                  height="40px"
                />
              </div>
              <div class="userProfileName" style="margin-left:10px">
                <h3 style="font-size: 20px; margin-top: 5px">${use.UserID}</h3>
              </div>
              <div class="ms-auto">
                <button class="btn btn-primary">Add friend</button>
              </div>
      </div>
      `;
      document.querySelector("#populateUserList").innerHTML = html;
    });
  });
}
