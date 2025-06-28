
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

  productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const image = document.getElementById("product-img").value;
    const product = { name, price, image };

    const products = JSON.parse(localStorage.getItem("retroRocketAdminProducts") || "[]");
    products.push(product);
    localStorage.setItem("retroRocketAdminProducts", JSON.stringify(products));
    productForm.reset();
    loadProducts();
  });

  function loadProducts() {
    const products = JSON.parse(localStorage.getItem("retroRocketAdminProducts") || "[]");
    productList.innerHTML = "";
    products.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.name} - $${p.price.toFixed(2)}`;
      productList.appendChild(li);
    });
  }
});
