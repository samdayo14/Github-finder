// init github
const github = new Github();
// init UI
const ui = new UI();

// Search input
const searchUser = document.getElementById("searchUser");

// Search input event listeners
searchUser.addEventListener("keyup", (e) => {
  // Get input Text
  const userText = e.target.value;

  if (!userText) {
    console.log({ userText });
    // handle the error
    ui.clearProfile();
    return;
  }

  // Make http call
  github.getUser(userText).then((data) => {
    console.log({ data });
    if (
      data.profile.message &&
      data.profile.message.toLowerCase() === "not found"
    ) {
      // show alert
      ui.clearProfile();
      ui.showAlert("User not found", "alert alert-danger");
      return;
    }
    // show profile
    ui.showProfile(data.profile);
    ui.showRepos(data.repos);
  });
});
