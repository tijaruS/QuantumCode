import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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
import {
  ref,
  getDatabase,
  set,
  onValue,
  push,
  query,
  orderByChild,
  equalTo,
  child,
  update,
  get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

const db = getFirestore(app);
// db.Settings({ timestampsInSnapshots: true });
export const rdb = getDatabase();
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
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
      })
      .then(() => {})
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
        localStorage.removeItem("userEmail");
        localStorage.removeItem("displayName");
        localStorage.removeItem("userPhotoUrl");
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
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userPhotoUrl", user.photoURL);
    localStorage.setItem("displayName", user.displayName);

    console.log(user);
    // console.log(user.uid);
    const userUid = localStorage.getItem("userUid");
    const colRef1 = doc(db, "UserInfo", userUid);

    let collegeName = localStorage.getItem("collegeName");

    const emailID = localStorage.getItem("emailID");
    let userID = localStorage.getItem("userID");
    console.log(userUid, collegeName, emailID, userID);
    const colDb = ref(rdb, "users/");
    onValue(colDb, (snapshot) => {
      let userExist = false;
      snapshot.forEach((data) => {
        let use = data.val();
        if (use.UID === user.uid) {
          userExist = true;
          return true;
        }
      });
      if (!userExist) {
        if (userID === null) {
          if (user.displayName === null) {
            userID = user.email.split("@")[0];
          } else {
            userID = user.displayName;
          }
        }
        if (collegeName === null) {
          collegeName = "Not Available";
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
      }
    });

    // setDoc(colRef1, {
    //   UID: userUid,
    //   UserID: userID,
    //   Email: emailID,
    //   College: collegeName,
    // });

    showUI(user);

    showProfile(user);
    notificationCount();
  } else {
    if (window.location.pathname === "/signin.html") {
      return;
    } else if (window.location.pathname === "/signup.html") {
      return;
    } else {
      showUI();
    }
    showProfile();
  }
});
const userUid = localStorage.getItem("userUid");
const collegeName = localStorage.getItem("collegeName");
const emailID = localStorage.getItem("emailID");
const userID = localStorage.getItem("userID");
const firebaseDisplayName = localStorage.getItem("displayName");
const firebaseUserPhotoUrl = localStorage.getItem("userPhotoUrl");
console.log(userUid, collegeName, emailID, userID, firebaseDisplayName);

if (
  window.location.pathname != "/signin.html" &&
  window.location.pathname != "/signup.html"
) {
  const userListBtn = document.getElementById("userListBtn");
  userListBtn.addEventListener("click", (e) => {
    showUserList();
  });
}
if (
  window.location.pathname != "/signin.html" &&
  window.location.pathname != "/signup.html"
) {
  const firendListBtn = document.getElementById("firendListBtn");
  firendListBtn.addEventListener("click", (e) => {
    showFriendList();
  });
}
const currnetUserEmail = localStorage.getItem("userEmail");
// console.log(currnetUserEmail);
// console.log(localStorage.getItem("userUid"));
function showUserList() {
  let html = "";
  const colDb = ref(rdb, "users/");

  const notificationRef = ref(rdb, "notifications/");
  // let notificationRef = firebase.database().ref("notifications");
  onValue(colDb, (snapshot) => {
    if (snapshot.hasChildren()) {
      html = `<form class="d-flex mb-2" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      </form>`;
      document.querySelector("#populateUserList").innerHTML = html;
    }

    snapshot.forEach((data) => {
      let use = data.val();
      // console.log(use.email);

      const q = query(
        notificationRef,
        orderByChild("SendTo"),
        equalTo(data.key)
      );

      const qt = query(
        notificationRef,
        orderByChild("SendFrom"),
        equalTo(data.key)
      );
      if (use.Email != currnetUserEmail) {
        onValue(q, (snapshot) => {
          const val = snapshot.val();
          // console.log(snapshot.val());
          // console.log(val);
          // console.log(Object.values(snapshot.val()).length);

          if (
            snapshot.size > 0 &&
            Object.values(val)[0].SendFrom === localStorage.getItem("userUid")
          ) {
            html = `
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
                <button class="btn btn-default" ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
</svg>Sent</button>
              </div>
      </div>
      `;
            document.querySelector("#populateUserList").innerHTML += html;
          } else {
            onValue(qt, (snapshot) => {
              const valt = snapshot.val();
              if (
                snapshot.size > 0 &&
                Object.values(valt)[0].SendTo ===
                  localStorage.getItem("userUid")
              ) {
                html = `
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
                <button class="btn btn-default"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
</svg>Pending</button>
              </div>
      </div>
      `;
                document.querySelector("#populateUserList").innerHTML += html;
              } else {
                html = `
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
                <button class="btn btn-primary addFriendBtn" data-key='${data.key}'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
            </svg>Add friend</button>
                          </div>
                  </div>
      `;
                document.querySelector("#populateUserList").innerHTML += html;

                let buttons = document.querySelectorAll(".addFriendBtn");

                buttons.forEach((button) => {
                  button.addEventListener("click", function () {
                    // Retrieve the data-key value and pass it to sendAddFriendReq
                    let key = this.getAttribute("data-key");
                    sendAddFriendReq(key);
                    console.log(key);
                    window.location.reload();
                  });
                });
              }
            });
            //         html += `
            //       <div style='display:flex;align-items:center;margin-bottom:10px'>
            //        <div class="userDP">
            //                 <img
            //                   class="rounded-5"
            //                   src="${use.profilePhoto}"
            //                   alt=""
            //                   height="40px"
            //                 />
            //               </div>
            //               <div class="userProfileName" style="margin-left:10px">
            //                 <h3 style="font-size: 20px; margin-top: 5px">${use.UserID}</h3>
            //               </div>
            //               <div class="ms-auto">
            //                 <button class="btn btn-primary addFriendBtn" data-key='${data.key}'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
            //   <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            //   <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
            // </svg>Add friend</button>
            //               </div>
            //       </div>
            //       `;
          }
        });
      }
    });
  });
}

function sendAddFriendReq(key) {
  let notification = {
    SendTo: key,
    SendFrom: localStorage.getItem("userUid"),
    name: localStorage.getItem("displayName"),
    photoURL: localStorage.getItem("userPhotoUrl"),
    date: new Date().toLocaleString(),
    status: "pending",
  };
  push(ref(rdb, "notifications/"), notification);
}

function notificationCount() {
  const db = getDatabase();
  const notiRef = query(
    ref(db, "notifications/"),
    orderByChild("SendTo"),
    equalTo(localStorage.getItem("userUid"))
  );

  onValue(notiRef, (snapshot) => {
    if (snapshot.exists()) {
      let notiArray = Object.values(snapshot.val()).filter(
        (n) => n.status === "pending"
      );
      document.getElementById("notification").innerHTML = notiArray.length;
    } else {
      console.log("No data available");
    }
  });
}
// function notificationCount() {
//   let dbRef = ref(rdb, "notifications/");
//   const q = query(
//     dbRef,
//     orderByChild("SendTo"),
//     equalTo(localStorage.getItem("userUid"))
//   );
//   onValue(q, (snapshot) => {
//     const count = snapshot.size;
//     const notificationElement = document.querySelector("#notification");
//     if (notificationElement) {
//       notificationElement.innerHTML = count;
//     }
//   });
//   // if (document.querySelector("#notification") != null) {
//   //   document.querySelector("#notification").innerHTML = count;
//   // }
// }

if (
  window.location.pathname != "/signin.html" &&
  window.location.pathname != "/signup.html"
) {
  const notificationBtn = document.querySelector(".notificationBtn");
  notificationBtn.addEventListener("click", (e) => {
    populateNotificationList();
  });
}

function populateNotificationList() {
  let html = "";
  const colDb = ref(rdb, "users/");
  const notificationRef = ref(rdb, "notifications/");
  const q = query(
    notificationRef,
    orderByChild("SendTo"),
    equalTo(localStorage.getItem("userUid"))
  );
  // let notificationRef = firebase.database().ref("notifications");
  onValue(q, (snapshot) => {
    if (snapshot.hasChildren()) {
      html = `<form class="d-flex mb-2" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      </form>`;
    }

    snapshot.forEach((data) => {
      let use = data.val();
      // console.log(use.email);

      // console.log(snapshot.val());
      // console.log(val);
      // console.log(Object.values(snapshot.val()).length);
      if (use.status === "pending") {
        html += `
      <div style='display:flex;align-items:center;margin-bottom:10px'>
       <div class="userDP">
                <img
                  class="rounded-5"
                  src="${use.photoURL}"
                  alt=""
                  height="40px"
                />
              </div>
              <div class="userProfileName" style="margin-left:10px">
                <h3 style="font-size: 20px; margin-top: 5px">${use.name}</h3>
              </div>
              <div class="ms-auto">
              <button class="btn btn-success" id='acceptBtn' data-key='${data.key}' ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
</svg>Accept</button>
              <button class="btn btn-danger" id='rejectBtn' data-key='${data.key}')"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill-x" viewBox="0 0 16 16">
  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708"/>
</svg>Reject</button>

              </div>
      </div>
      `;
      }
      document.querySelector("#populateNotificationList").innerHTML = html;
      let rejectButtons = document.querySelectorAll("#rejectBtn");
      let acceptButtons = document.querySelectorAll("#acceptBtn");

      rejectButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Retrieve the data-key value and pass it to sendAddFriendReq
          let key = this.getAttribute("data-key");
          Reject(key);
          console.log(key);
          window.location.reload();
        });
      });
      acceptButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Retrieve the data-key value and pass it to sendAddFriendReq
          let key = this.getAttribute("data-key");
          Accept(key);
          console.log(key);
          window.location.reload();
        });
      });
    });
  });
}

function Reject(key) {
  const db = getDatabase();
  const notiRef = ref(db, "notifications/" + key);

  get(notiRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let obj = snapshot.val();
        obj.status = "Reject";

        update(notiRef, obj)
          .then(() => {
            // do something
            populateNotificationList();
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function Accept(key) {
  const db = getDatabase();
  const notiRef = ref(db, "notifications/" + key);

  get(notiRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let obj = snapshot.val();
        obj.status = "accept";

        update(notiRef, obj);
        const friendListRef = ref(db, "friendlist");

        push(friendListRef, {
          friendId: obj.SendFrom,
          userId: obj.SendTo,
        })
          .then((snapshot) => {
            // The unique key is available as snapshot.key
            // console.log("Unique key: ", snapshot.key);
          })
          .catch((error) => {
            console.error("Error: ", error);
          });

        // do something
        populateNotificationList();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function showFriendList() {
  const db = getDatabase();
  const friendListRef = ref(db, "friendlist");

  onValue(friendListRef, (snapshot) => {
    document.getElementById(
      "populateFriendList"
    ).innerHTML = `<li class="list-group-item" style="background-color:#f8f8f8;">
                            <input type="text" placeholder="Search" class="form-control form-rounded" />
                        </li>`;
    snapshot.forEach((childSnapshot) => {
      let lst = childSnapshot.val();
      let friendKey = "";
      if (lst.friendId === localStorage.getItem("userUid")) {
        friendKey = lst.userId;
      } else if (lst.userId === localStorage.getItem("userUid")) {
        friendKey = lst.friendId;
      }

      if (friendKey !== "") {
        const userRef = ref(db, "users/" + friendKey);
        onValue(userRef, (userSnapshot) => {
          let user = userSnapshot.val();
          document.getElementById(
            "populateFriendList"
          ).innerHTML += ` <div style='display:flex;align-items:center;margin-bottom:10px'>
       <div class="userDP">
                <img
                  class="rounded-5"
                  src="${user.profilePhoto}"
                  alt=""
                  height="40px"
                />
              </div>
              <div class="userProfileName" style="margin-left:10px">
                <h3 style="font-size: 20px; margin-top: 5px">${user.UserID}</h3>
              </div>
              
      </div>
      `;
        });
      }
    });
  });
}
