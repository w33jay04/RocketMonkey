
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh49Hc-A4bXb3rfvWnABmKpWlZRehelqg",
  authDomain: "retro-rocket-store.firebaseapp.com",
  projectId: "retro-rocket-store",
  storageBucket: "retro-rocket-store.firebasestorage.app",
  messagingSenderId: "661648585152",
  appId: "1:661648585152:web:b24ea6afb3208040f8d825"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const adminPanel = document.getElementById("admin-panel");
  const loginSection = document.getElementById("admin-login");
  const productForm = document.getElementById("product-form");
  const productList = document.getElementById("product-list");

  const USERNAME = "admin";
  const PASSWORD = "rocket123";

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (user === USERNAME && pass === PASSWORD) {
      loginSection.style.display = "none";
      adminPanel.style.display = "block";
      loadProducts();
    } else {
      alert("Invalid login.");
    }
  });

  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const image = document.getElementById("product-img").value;
    try {
      await addDoc(collection(db, "products"), {
        name,
        price,
        image
      });
      alert("Product added!");
      productForm.reset();
      loadProducts();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  });

  async function loadProducts() {
    productList.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      const p = doc.data();
      const li = document.createElement("li");
      li.textContent = `${p.name} - $${p.price.toFixed(2)}`;
      productList.appendChild(li);
    });
  }
});
