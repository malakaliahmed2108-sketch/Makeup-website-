// USERS STORAGE
let users = JSON.parse(localStorage.getItem('makeupGlamUsers')) || [];

// SWITCH TABS
function switchTab(tab) {
  const tabs = document.querySelectorAll('.tab');
  const forms = document.querySelectorAll('.form-content');

  tabs.forEach(t => t.classList.remove('active'));
  forms.forEach(f => f.classList.remove('active'));

  hideMessages();

  if (tab === 'signin') {
    tabs[0].classList.add('active');
    document.getElementById('signin-form').classList.add('active');
  } else {
    tabs[1].classList.add('active');
    document.getElementById('signup-section').classList.add('active');
  }
}

// TOGGLE PASSWORD
function togglePassword(id) {
  const input = document.getElementById(id);
  const icon = input.parentElement.querySelector('.password-toggle');

  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

// MESSAGES
function showSuccess(msg) {
  hideMessages();
  let box = document.getElementById("success-message");
  box.textContent = msg;
  box.classList.add("show");
}

function showError(msg) {
  hideMessages();
  let box = document.getElementById("error-message");
  box.textContent = msg;
  box.classList.add("show");
}

function hideMessages() {
  document.getElementById("success-message").classList.remove("show");
  document.getElementById("error-message").classList.remove("show");
}

// SIGN IN
function handleSignIn(e) {
  e.preventDefault();

  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  const user = users.find(u => u.email === email);

  if (!user) {
    showError("Account not found! Please sign up first.");
    return;
  }

  if (user.password !== password) {
    showError("Incorrect password!");
    return;
  }

  showSuccess(`Welcome back, ${user.name}!`);
  localStorage.setItem("currentUser", JSON.stringify(user));

  setTimeout(() => window.location.href = "index.html", 1500);
}

// SIGN UP
function handleSignUp(e) {
  e.preventDefault();

  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;

  if (password !== confirm) {
    showError("Passwords do not match!");
    return;
  }

  if (users.find(u => u.email === email)) {
    showError("Email already registered!");
    return;
  }

  const newUser = {
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem("makeupGlamUsers", JSON.stringify(users));

  showSuccess(`Welcome, ${name}! Please sign in.`);

  document.getElementById("signup-form").reset();

  setTimeout(() => {
    switchTab("signin");
    document.getElementById("signin-email").value = email;
  }, 1500);
}

// SOCIAL LOGIN
function socialLogin(provider) {
  showSuccess("Signing in with " + provider);

  const user = {
    name: provider + " User",
    email: provider + "@demo.com"
  };

  localStorage.setItem("currentUser", JSON.stringify(user));
  setTimeout(() => window.location.href = "index.html", 1500);
}
