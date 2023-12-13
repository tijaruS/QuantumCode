// Add the following code to handle login functionality

function performLogin() {
  // Get input values
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simulate authentication (replace this with actual authentication logic)
  if (username === "example" && password === "password") {
    // Successful login, redirect or perform further actions
    alert("Login successful! Redirecting...");
    // Add your redirection logic here
  } else {
    // Display error message
    document.getElementById("loginError").textContent =
      "Invalid username or password";
  }
}
// Add the following code to handle login with Google and GitHub

// Google Sign-in
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  signInWithProvider(provider);
}

// GitHub Sign-in
function signInWithGitHub() {
  const provider = new firebase.auth.GithubAuthProvider();
  signInWithProvider(provider);
}

// Generic function to sign in with a given provider
function signInWithProvider(provider) {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // Successful login, redirect or perform further actions
      console.log(result.user);
      alert("Login successful! Redirecting...");
      // Add your redirection logic here
    })
    .catch((error) => {
      // Display error message
      document.getElementById("loginError").textContent = error.message;
    });
}
// You can add JavaScript functionality for the user profile here
// For example, fetching and displaying user information

// Mock user data (replace this with your actual user data logic)
const mockUserData = {
  username: "JohnDoe",
  email: "john@example.com",
  // Add more user profile data as needed
};

// Function to display user profile information
function displayUserProfile() {
  const profileInfo = document.getElementById("profile-info");

  // Create HTML to display user profile
  const profileHTML = `
      <p><strong>Username:</strong> ${mockUserData.username}</p>
      <p><strong>Email:</strong> ${mockUserData.email}</p>
      <!-- Add more profile information as needed -->
  `;

  // Set the inner HTML of the profile-info div
  profileInfo.innerHTML = profileHTML;
}

// Call the function to display user profile when the page loads
displayUserProfile();
