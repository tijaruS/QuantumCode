const form = document.querySelector("#search");
if (form != null) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const enteredUsername = usernameInput.value;
    localStorage.setItem("username", enteredUsername);
    location.reload();
    // Perform search or other actions here
  });
}

const usernameInput = document.querySelector("#search-form");
export const nameInput = document.querySelector("#search");
export let handle, imageUrl;
// console.log(usernameInput);
if (usernameInput != null) {
  usernameInput.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log(usernameInput.value);
    fetch(`https://codeforces.com/api/user.info?handles=${nameInput.value}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "FAILED") {
          alert("User with handle not found");
          return;
        }

        const user = data.result[0];
        // console.log(user);
        const handle = user.handle;
        localStorage.setItem("handle", handle);
        // console.log(handle);
        const imageUrl = user.titlePhoto;
        localStorage.setItem("imageUrl", imageUrl);
        const friendOfCount = user.friendOfCount;
        const maxRank = user.maxRank;
        const maxRating = user.maxRating;
        const currentRank = user.rank;
        const currentRating = user.rating;
        const country = user.country;
        const organization = user.organization;
        const contribution = user.contribution;
        const firstName = user.firstName;
        const lastName = user.lastName;
        const lastOnlineTimeSeconds = user.lastOnlineTimeSeconds;
        const lastOnlineTime = new Date(lastOnlineTimeSeconds * 1000);
        const lastOnline = new Date(
          lastOnlineTimeSeconds * 1000
        ).toLocaleString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });
        // console.log(lastOnline);
        const registrationTimeSeconds = user.registrationTimeSeconds;
        const registrationTime = new Date(registrationTimeSeconds * 1000);
        const registrationT = new Date(
          registrationTimeSeconds * 1000
        ).toLocaleString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });
        // console.log(lastOnline);

        document.getElementById("country").textContent = country;
        document.getElementById("avtar-container").src = imageUrl;
        document.getElementById("handle").textContent = handle;
        document.getElementById(
          "friends"
        ).textContent = `${friendOfCount} Users`;
        document.getElementById("maxRank").textContent = maxRank;
        document.getElementById("max-rating").textContent = maxRating;
        document.getElementById("rating").textContent = currentRating;
        document.getElementById("currentRank").textContent = currentRank;
        document.getElementById("currentRank").textContent = currentRank;
        document.getElementById("firstName").textContent = firstName;
        document.getElementById("lastName").textContent = lastName;
        document.getElementById("contribution").textContent = contribution;
        document.getElementById("organization").textContent = organization;
        document.getElementById("lastOnline").textContent = lastOnline;
        document.getElementById("registrationTime").textContent = registrationT;
      });
  });
}
// firestore

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
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
import { app } from "./auth.js";
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
// db.settings({ timestampsInSnapshots: true });
export const colRef = collection(db, "StalkList");

const addToStalkList = document.querySelector("#addToStalkList");
console.log(addToStalkList);
const addFriend = document.querySelector("#addFriend");
const jsFollowerCard = document.querySelector("#js-follower-card");
if (addToStalkList != null) {
  addToStalkList.addEventListener("click", (e) => {
    e.preventDefault();

    const h = localStorage.getItem("handle");
    const i = localStorage.getItem("imageUrl");
    const id = localStorage.getItem("userUid");
    console.log(h, i, id);
    addDoc(colRef, {
      UID: id,
      UserName: h,
      ProfilePhotoURL: i,
    }).then(() => {
      // localStorage.removeItem("handle");
      // localStorage.removeItem("imageUrl");
      // localStorage.removeItem("userUid");
      alert("added to stalklist");
      location.reload();
    });
  });
}
