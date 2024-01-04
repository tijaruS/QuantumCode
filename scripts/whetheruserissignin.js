import { auth } from "./auth.js";
auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // Redirect the user to the appropriate page.
    console.log("user is signed in");
    console.log(user);
    showUI(user);
  } else {
    showUI();
    // No user is signed in.
    // Redirect the user to the sign-in page.
    console.log("user is not signed in");
  }
});
