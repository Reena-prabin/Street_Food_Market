import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHz6W0Bw2ztMXLm2L7uug3vRu8us4OAQ8",
  authDomain: "streetfoodmarket-ce8cf.firebaseapp.com",
  projectId: "streetfoodmarket-ce8cf",
  storageBucket: "streetfoodmarket-ce8cf.appspot.com",
  messagingSenderId: "302629421071",
  appId: "1:302629421071:web:da83dac490093ea3c8a37a",
  measurementId: "G-CH20YD6727"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function signUp() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  if (!email || !password) {
    alert("Please enter email and password!");
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Signed up successfully! Please login."))
    .catch(err => alert(err.message));
}

function signIn() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  if (!email || !password) {
    alert("Please enter email and password!");
    return;
  }
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
}

window.signUp = signUp;
window.signIn = signIn;
