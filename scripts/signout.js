const signOut = document.querySelector("#signOut");
import { auth } from "./auth.js";

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
