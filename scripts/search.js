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
        // console.log(handle);
        const imageUrl = user.titlePhoto;
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
