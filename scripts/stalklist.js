import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  onSnapshot,
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
import { app } from "./auth.js";
// const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
// db.settings({ timestampsInSnapshots: true });

import { auth } from "./auth.js";
import { nameInput } from "./search.js";
import { handle, imageUrl } from "./search.js";

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
// function deleteSomething(a, b, c) {
//   let docRef = doc(a, b, c);
//   deleteDoc(docRef);
// }
//firebase
const colRef = collection(db, "StalkList");

// const userUid = userUid();
const userUid = localStorage.getItem("userUid");
// console.log(userUid);

const addToStalkList = document.querySelector("#addToStalkList");
// console.log(addToStalkList);

let jsFollowerCard = document.querySelector("#js-follower-card");

onSnapshot(colRef, (snapshot) => {
  let stalkList = [];
  snapshot.docs.forEach((doc) => {
    stalkList.push({ ...doc.data(), id: doc.id });
  });
  // console.log(stalkList);
  const filteredObj = stalkList.filter((list) => {
    return list.UID === `${userUid}`;
  });
  // console.log(filteredObj);

  filteredObj.forEach((element) => {
    const div1 = document.createElement("div");
    div1.innerHTML = `
        <div class="follower-card col-sm" data-id='${element.id}' id='card'>
          <div>
            <img class="profile-picture" src='${element.ProfilePhotoURL}'alt="" />
          </div>
          <div>
            <p class="profile-name" style="margin-bottom: 0">
              ${element.UserName}
            </p>
            <div
              style="
                display: flex;
                justify-content: center;
                flex-direction: column;
              "
            >
              <button class="follow-button" id='js-view-profile-button' onclick='window.open("https://codeforces.com/profile/${element.UserName}", "_blank")
              '>View Profile</button>
              
            </div>
          </div>
        </div>`;
    jsFollowerCard.appendChild(div1);
  });
});

{
  /* <button class="follow-button" style="background-color: red" id="jsRemoveButton">
  Remove
</button>; */
}
// let removeButton = document.querySelectorAll("#jsRemoveButton");
// // let card = document.querySelectorAll("#card");
// // let id = card.getAttribute("data-id");

// removeButton.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let id = e.target.getAttribute("data-id");

//   console.log(id);
//   let docRef = doc(db, "StalkList", id);
//   deleteDoc(docRef);
// });
// getDocs(colRef)
//   .then((snapshot) => {
//     let stalkList = [];
//     snapshot.docs.forEach((doc) => {
//       stalkList.push({ ...doc.data() });
//     });
//     console.log(stalkList);
//     const filteredObj = stalkList.filter((list) => {
//       return list.UID === `${userUid}`;
//     });
//     const div1 = document.createElement("div");

//     filteredObj.forEach((item) => {
//       div1.innerHTML = `
//         <div class="follower-card">
//           <div>
//             <img class="profile-picture" src='${item.ProfilePhotoURL}'alt="" />
//           </div>
//           <div>
//             <p class="profile-name" style="margin-bottom: 0">
//               ${item.UserName}
//             </p>
//             <div
//               style="
//                 display: flex;
//                 justify-content: center;
//                 flex-direction: column;
//               "
//             >
//               <button class="follow-button">View Profile</button>
//               <button class="follow-button" style="background-color: red">
//                 Remove
//               </button>
//             </div>
//           </div>
//         </div>`;
//       // console.log(filteredObj);
//       // console.log(jsFollowerCard);
//       jsFollowerCard.appendChild(div1);
//     });
//   })
//   .then(() => {})
//   .catch((err) => {
//     console.log(err.message);
//   });
