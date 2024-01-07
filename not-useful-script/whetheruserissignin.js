import { auth } from "../scripts/auth.js";

auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log("user is signed in");
    console.log(user);
    showUI(user);
    // if (showProfile != undefined) {
    //   showProfile(user);
    // }
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
