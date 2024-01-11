import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

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
const analytics = getAnalytics(app);
const db = getFirestore(app);
// db.settings({ timestampsInSnapshots: true });

import { auth } from "./auth.js";
import { nameInput } from "./search.js";

auth.onAuthStateChanged(function (user) {
  if (user) {
    document.querySelector("#ifLoggedIn").style.display = "block";
    // localStorage.setItem("userUid", user.uid);

    if (user.displayName === null) {
      user.email = user.email.split("@")[0];
      document.getElementById("userName").textContent = `${user.email}`;
    } else {
      document.getElementById("userName").textContent = user.displayName;
    }
  } else {
    userUid = null;
    document.querySelector("#ifLoggedOut").style.display = "block";
  }
});

const colRef = collection(db, "StalkList");

// const userUid = userUid();
// const userUid = localStorage.getItem("userUid");
// console.log(userUid);

const addToStalkList = document.querySelector("#addToStalkList");
const addFriend = document.querySelector("#addFriend");
if (addToStalkList != null) {
  addToStalkList.addEventListener("click", (e) => {
    e.preventDefault();
  });
}
