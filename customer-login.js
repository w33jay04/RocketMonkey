
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBh49Hc-A4bXb3rfvWnABmKpWlZRehelqg",
  authDomain: "retro-rocket-store.firebaseapp.com",
  projectId: "retro-rocket-store",
  storageBucket: "retro-rocket-store.firebasestorage.app",
  messagingSenderId: "661648585152",
  appId: "1:661648585152:web:b24ea6afb3208040f8d825"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const status = document.getElementById("status");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, pass)
    .then(() => {
      status.textContent = "Login successful!";
    })
    .catch((error) => {
      status.textContent = "Login failed: " + error.message;
    });
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("reg-email").value;
  const pass = document.getElementById("reg-password").value;
  createUserWithEmailAndPassword(auth, email, pass)
    .then(() => {
      status.textContent = "Registration successful!";
    })
    .catch((error) => {
      status.textContent = "Registration failed: " + error.message;
    });
});
