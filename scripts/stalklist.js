import { auth } from "./auth.js";

auth.onAuthStateChanged(function (user) {
  if (user) {
    document.querySelector("#ifLoggedIn").style.display = "block";
    document.getElementById("userName").textContent = user.displayName;
  } else {
    document.querySelector("#ifLoggedOut").style.display = "block";
  }
});
