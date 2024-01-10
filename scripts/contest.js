fetch("https://codeforces.com/api/contest.list")
  .then((response) => response.json())
  .then((data) => {
    // Filter the list of contests to include only the upcoming contests
    const upcomingContests = data.result.filter(
      (contest) =>
        contest.phase == "BEFORE" &&
        (contest.type == "CF" || contest.type == "ICPC")
    );

    // Calculate the remaining time for registration for each contest and add it to the contest object
    upcomingContests.forEach((contest) => {
      const startTime = new Date(contest.startTimeSeconds * 1000);
      const currentTime = new Date();
      const timeDiff = startTime.getTime() - currentTime.getTime();
      const remainingTime =
        timeDiff > 0
          ? Math.floor(timeDiff / (1000 * 60 * 60 * 24)) < 1
            ? Math.floor(timeDiff / (1000 * 60 * 60))
            : Math.floor(timeDiff / (1000 * 60 * 60 * 24))
          : 0;
      contest.remainingTime = remainingTime;
    });

    upcomingContests.reverse();
    // JavaScript code to populate the table
    const tableBody = document.getElementById("upcoming-contests");

    upcomingContests.forEach((contest) => {
      const row1 = document.createElement("tr");
      row1.innerHTML = `
    <td><center>${contest.name}</center></td>
    <td><center>${new Date(contest.startTimeSeconds * 1000).toLocaleString(
      "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }
    )}</center></td>
    <td><center>${Math.floor(contest.durationSeconds / 3600)}h:${
        (contest.durationSeconds % 3600) / 60
      }m</center></td>
    <td><center><button type="button" class="btn btn-success text-wrap" 
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" ${disableButtonIfMoreThanTwoDays(
          contest
        )}>
        ${buttonIcon(contest)}
        ${buttonText(contest)}
        </button></center></td>
`;
      tableBody.appendChild(row1);

      function disableButtonIfMoreThanTwoDays(contest) {
        const startTime = contest.startTimeSeconds * 1000;
        const currentTime = new Date().getTime();
        const difference = startTime - currentTime;
        const differenceInDays = difference / (1000 * 60 * 60 * 24);
        return differenceInDays > 2 ? "disabled" : "";
      }
      function buttonText(contest) {
        const startTime = contest.startTimeSeconds * 1000;
        const currentTime = new Date().getTime();
        const difference = startTime - currentTime;
        const differenceInDays = difference / (1000 * 60 * 60 * 24);
        return differenceInDays > 2 ? "Not Started Yet" : "Register Now";
      }
      function buttonIcon(contest) {
        const startTime = contest.startTimeSeconds * 1000;
        const currentTime = new Date().getTime();
        const difference = startTime - currentTime;
        const differenceInDays = difference / (1000 * 60 * 60 * 24);
        if (differenceInDays > 2) {
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill mx-1" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                  </svg>`;
        }
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill mx-1" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
              </svg>`;
      }
      const button = row1.querySelector("button");
      button.addEventListener("click", () => {
        // console.log(`Button clicked for contest ${contest.id}`);
        // Calculate the start time of the contest in milliseconds
        const startTime = contest.startTimeSeconds * 1000;
        // Calculate the current time in milliseconds
        const currentTime = new Date().getTime();
        // Calculate the difference between the start time and the current time in milliseconds
        const difference = startTime - currentTime;
        // Calculate the difference in days
        const differenceInDays = difference / (1000 * 60 * 60 * 24);
        differenceInDays <= 2
          ? window.open(
              `https://codeforces.com/contestRegistration/${contest.id}`,
              "_blank"
            )
          : null;
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });

fetch("https://codeforces.com/api/contest.list")
  .then((response) => response.json())
  .then((data) => {
    // Filter the list of contests to include only the upcoming contests
    const upcomingContests = data.result.filter(
      (contest) =>
        contest.phase == "FINISHED" &&
        (contest.type == "CF" || contest.type == "ICPC")
    );

    // Calculate the remaining time for registration for each contest and add it to the contest object
    upcomingContests.forEach((contest) => {
      const startTime = new Date(contest.startTimeSeconds * 1000);
      const currentTime = new Date();
      const timeDiff = startTime.getTime() - currentTime.getTime();
      const remainingTime =
        timeDiff > 0
          ? Math.floor(timeDiff / (1000 * 60 * 60 * 24)) < 1
            ? Math.floor(timeDiff / (1000 * 60 * 60))
            : Math.floor(timeDiff / (1000 * 60 * 60 * 24))
          : 0;
      contest.remainingTime = remainingTime;
    });

    // JavaScript code to populate the table
    const tableBody = document.getElementById("finished-contests");

    upcomingContests.forEach((contest) => {
      const row1 = document.createElement("tr");
      row1.innerHTML = `
    <td><center>${contest.name}</center></td>
    <td><center>${new Date(contest.startTimeSeconds * 1000).toLocaleString(
      "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }
    )}</center></td>
    <td><center>${Math.floor(contest.durationSeconds / 3600)}h:${
        (contest.durationSeconds % 3600) / 60
      }m</center></td>
    <td><center><button type="button" class="btn btn-secondary text-wrap" 
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" ${disableButtonIfMoreThanTwoDays(
          contest
        )}>
        ${buttonIcon(contest)}
        ${buttonText(contest)}
        </button></center></td>
`;
      tableBody.appendChild(row1);

      function disableButtonIfMoreThanTwoDays(contest) {
        const startTime = contest.startTimeSeconds * 1000;
        const currentTime = new Date().getTime();
        const difference = startTime - currentTime;
        const differenceInDays = difference / (1000 * 60 * 60 * 24);
        return differenceInDays > 2 ? "disabled" : "";
      }
      function buttonText(contest) {
        const startTime = contest.startTimeSeconds * 1000;
        const currentTime = new Date().getTime();
        const difference = startTime - currentTime;
        const differenceInDays = difference / (1000 * 60 * 60 * 24);
        return differenceInDays > 2
          ? "Not Started Yet"
          : "Registration Closed view standings";
      }
      function buttonIcon(contest) {
        const startTime = contest.startTimeSeconds * 1000;
        const currentTime = new Date().getTime();
        const difference = startTime - currentTime;
        const differenceInDays = difference / (1000 * 60 * 60 * 24);
        if (differenceInDays > 2) {
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill mx-1" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                  </svg>`;
        }
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill mx-1" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
              </svg>`;
      }
      const button = row1.querySelector("button");
      button.addEventListener("click", () => {
        // console.log(`Button clicked for contest ${contest.id}`);
        // Calculate the start time of the contest in milliseconds
        const startTime = contest.startTimeSeconds * 1000;
        // Calculate the current time in milliseconds
        const currentTime = new Date().getTime();
        // Calculate the difference between the start time and the current time in milliseconds
        const difference = startTime - currentTime;
        // Calculate the difference in days
        const differenceInDays = difference / (1000 * 60 * 60 * 24);
        differenceInDays <= 2
          ? window.open(
              `https://codeforces.com/contest/${contest.id}/standings`,
              "_blank"
            )
          : null;
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });

import { auth } from "../scripts/auth.js";

auth.onAuthStateChanged(function (user) {
  if (user) {
    const pastContests = document.querySelector("#pastContests");
    pastContests.style.display = "block";
    document.querySelector("#text").style.display = "none";
  } else {
    const pastContests = document.querySelector("#pastContests");
    pastContests.style.display = "none";
    document.querySelector("#text").style.display = "block";
  }
});
