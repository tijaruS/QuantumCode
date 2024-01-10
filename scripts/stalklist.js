import { auth } from "./auth.js";

auth.onAuthStateChanged(function (user) {
  if (user) {
    document.querySelector("#ifLoggedIn").style.display = "block";
    if (user.displayName === null) {
      user.email = user.email.split("@")[0];
      document.getElementById("userName").textContent = `${user.email}`;
    } else {
      document.getElementById("userName").textContent = user.displayName;
    }
  } else {
    document.querySelector("#ifLoggedOut").style.display = "block";
  }
});

console.log(userId);
