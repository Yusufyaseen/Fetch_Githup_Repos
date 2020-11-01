let theInput = document.querySelector(".input");
let getButton = document.querySelector(".getData");
let repoData = document.querySelector(".show_data");
window.onload = () => {
  theInput.focus();
};
getButton.onclick = (e) => {
  e.preventDefault();
  getRepo();
};
// function getRepo() {
//   repoData.innerHTML = !theInput.value
//     ? "<span>Please enter username</span>"
//     : fetch("https://api.github.com/users/ElzeroWebSchool/repos")
//         .then((Response) => Response.json())
//         .then((repo) => {
//           repoData.innerHTML = "";
//           repo.forEach((data) => {
//             let myDiv = document.createElement("div");
//             myDiv.appendChild(document.createTextNode(data.name));
//             let theUrl = document.createElement("a");
//             theUrl.appendChild(document.createTextNode("Visit"));
//             theUrl.href = `https://github.com/ElzeroWebSchool/${data.name}`;
//             theUrl.setAttribute("target", "_blank");
//             myDiv.appendChild(theUrl);
//             repoData.appendChild(myDiv);
//           });
//         });
// }
function getRepo() {
  if (!theInput.value) {
    repoData.innerHTML = "<span class='empty'>Please enter username</span>";
  } else {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        repoData.innerHTML = "";
        let repo = JSON.parse(this.responseText);
        splitRepo(repo);
      } else if (this.status !== 404) {
        repoData.innerHTML =
          "<span  class='errorName'>The username is invalid</span>";
      }
    };
    myRequest.open(
      "GET",
      `https://api.github.com/users/${theInput.value}/repos`,
      true
    );
    myRequest.send();
  }
}
function splitRepo(repo) {
  repo.forEach((data) => {
    let myDiv = document.createElement("div");
    let sName = document.createElement("span");
    sName.appendChild(document.createTextNode(data.name));
    myDiv.appendChild(sName);
    let theUrl = document.createElement("a");
    theUrl.appendChild(document.createTextNode("Visit"));
    theUrl.href = `https://github.com/${theInput.value}/${data.name}`;
    theUrl.setAttribute("target", "_blank");
    myDiv.appendChild(theUrl);
    let stars = document.createElement("span");
    stars.classList = "lastSpan";
    stars.appendChild(
      document.createTextNode(`Stars ${data.stargazers_count}`)
    );
    let date = document.createElement("span");
    date.appendChild(
      document.createTextNode(`Created at : ${data.created_at}`)
    );
    date.classList = "date";
    myDiv.appendChild(stars);
    myDiv.appendChild(date);
    myDiv.classList = "repo_box";
    repoData.appendChild(myDiv);
  });
}
