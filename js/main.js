let signInEmail = document.getElementById("signinEmail");
let signInPassword = document.getElementById("signinPassword");
let signUpName = document.getElementById("signupName");
let signUpEmail = document.getElementById("signupEmail");
let signUpPassword = document.getElementById("signupPassword");
let signUpBtn = document.getElementById("signup");
let logInBtn = document.getElementById("login");
let message = document.getElementById("incorrect");
let logOut = document.getElementById("logout");
let loginName = "";
let userIndex = 0;
let userList = [];
if (localStorage.getItem("user") != null)
  userList = JSON.parse(localStorage.getItem("user"));

function addingUser() {
  if (
    signUpName.value == "" ||
    signUpEmail.value == "" ||
    signUpPassword.value == ""
  ) {
    message.innerHTML = "All inputs is required";
    message.classList.replace("d-none", "d-block");
    message.classList.replace("text-success", "text-danger");
    return;
  } else if (emailCheck(signUpEmail.value) == true) {
    message.innerHTML = "email already exists";
    message.classList.replace("d-none", "d-block");
    message.classList.replace("text-success", "text-danger");
  } else {
    user = {
      name: signUpName.value,
      email: signUpEmail.value,
      pass: signUpPassword.value,
    };
  }
  userList.push(user);
  localStorage.setItem("user", JSON.stringify(userList));
  clearData();
  message.innerHTML = "Success";
  message.classList.replace("d-none", "d-block");
  message.classList.replace("text-danger", "text-success");
}
function clearData() {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  message.classList.replace("d-block", "d-none");
}
function emailCheck(x) {
  for (let index = 0; index < userList.length; index++) {
    if (userList[index].email == x) return true;
  }
}
function loginCheck() {
  for (let index = 0; index < userList.length; index++) {
    if (
      userList[index].email == signInEmail.value &&
      userList[index].pass == signInPassword.value
    ) {
      console.log(userIndex);
      userName = userList[index].name;
      localStorage.setItem("loginName", userName);
      return true;
    }
  }
}
function login() {
  if (loginCheck() == true) {
    window.location.href = "home.html";
  } else {
    message.innerHTML = "incorrect email or password";
    message.classList.replace("d-none", "d-block");
    message.classList.replace("text-success", "text-danger");
  }
  clearData();
}
function home() {
  loginName = localStorage.getItem("loginName");
  console.log(loginName);
  document.getElementById("username").innerHTML = "Welcome " + loginName;
}
function logout() {
  window.location.href = "signup.html";
}

let url = "";
let path = location.pathname.split("/");
url = path[path.length - 1];
console.log(url);
if (url == "signup.html") {
  signUpBtn.addEventListener("click", function () {
    addingUser();
  });
} else if (url == "index.html") {
  logInBtn.addEventListener("click", function () {
    login();
  });
} else if (url == "home.html") {
  logOut.addEventListener("click", function () {
    logout();
  });
  home();
}
