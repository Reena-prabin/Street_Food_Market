import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  signOut as fbSignOut,
  onAuthStateChanged
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

const FOOD_ITEMS = [
  { id: 1, name: "Masala Dosa", price: 60 },
  { id: 2, name: "Pani Puri", price: 35 },
  { id: 3, name: "Vada Pav", price: 25 },
  { id: 4, name: "Chole Bhature", price: 75 },
  { id: 5, name: "Egg Roll", price: 50 },
  { id: 6, name: "Samosa", price: 15 }
];
let cart = [];

function renderItems() {
  const ul = document.getElementById("itemList");
  ul.innerHTML = "";
  FOOD_ITEMS.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} <b>₹${item.price}</b></span>
      <button onclick="window.addToCart(${item.id})">Add to Cart</button>
    `;
    ul.appendChild(li);
  });
}

function addToCart(id) {
  const item = FOOD_ITEMS.find(x => x.id === id);
  const found = cart.find(x => x.id === id);
  if (found) found.qty += 1;
  else cart.push({ ...item, qty: 1 });
  renderCart();
}

function renderCart() {
  const ul = document.getElementById("cartList");
  ul.innerHTML = "";
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} ×${item.qty} <b>₹${item.price * item.qty}</b></span>
      <button class="qty-btn" onclick="window.changeQty(${idx}, 1)">+</button>
      <button class="qty-btn" onclick="window.changeQty(${idx}, -1)">-</button>
    `;
    ul.appendChild(li);
  });
  document.getElementById("cartTotal").innerText = total;
}

function changeQty(idx, diff) {
  cart[idx].qty += diff;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  renderCart();
}

function showBill() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  let html = "<ul>";
  let total = 0;
  cart.forEach(item => {
    html += `<li>${item.name} ×${item.qty} = ₹${item.price * item.qty}</li>`;
    total += item.price * item.qty;
  });
  html += `</ul><hr><b>Grand Total: ₹${total}</b>`;
  document.getElementById("billDetails").innerHTML = html;
  document.getElementById("billSection").style.display = "";
}

function resetCart() {
  cart = [];
  renderCart();
  document.getElementById("billSection").style.display = "none";
}

function signOut() {
  fbSignOut(auth).then(() => {
    window.location.href = "index.html"; // go back to login
  });
}

// Only show content if logged in
onAuthStateChanged(auth, user => {
  if (user) {
    renderItems();
    renderCart();
  } else {
    window.location.href = "index.html";
  }
});

// Expose to global
window.addToCart = addToCart;
window.changeQty = changeQty;
window.showBill = showBill;
window.resetCart = resetCart;
window.signOut = signOut;
