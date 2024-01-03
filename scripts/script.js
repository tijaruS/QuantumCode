let subMenu = document.querySelector("#subMenu");
function showMenu() {
  subMenu.classList.toggle("open-menu");
}
const showWhenLoggedIn = document.querySelectorAll("#showWhenLoggedIn");
const showWhenLoggedout = document.querySelectorAll("#showWhenLoggedOut");
let userName = document.querySelector("#user-name");
const profilePhoto1 = document.querySelector(".avatar1");
const profilePhoto2 = document.querySelector(".avatar2");

const UI = (user) => {
  if (user) {
    //account info

    // userName.textContent = `${user.email}`;
    if (user.displayName === null) {
      user.email = user.email.split("@")[0];
      userName.textContent = `${user.email}`;
    } else {
      userName.textContent = `${user.displayName}`;
    }
    if (user.photoURL === null) {
      profilePhoto1.src =
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1704153600&semt=ais";
    } else {
      profilePhoto1.src = `${user.photoURL}`;
    }
    if (user.photoURL != null) {
      profilePhoto2.src = `${user.photoURL}`;
    } else {
      profilePhoto2.src =
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1704153600&semt=ais";
    }
    showWhenLoggedIn.forEach((item) => (item.style.display = "block"));
    showWhenLoggedout.forEach((item) => (item.style.display = "none"));
  } else {
    showWhenLoggedIn.forEach((item) => (item.style.display = "none"));
    showWhenLoggedout.forEach((item) => (item.style.display = "block"));
  }
};
