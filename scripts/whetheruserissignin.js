import { auth } from "./auth.js";

auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log("user is signed in");
    console.log(user);
    showUI(user);
    showProfile(user);
  } else {
    showUI();
    showProfile();
    console.log("user is not signed in");
  }
});
