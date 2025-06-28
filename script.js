// script.js

document.addEventListener("DOMContentLoaded", () => {
  const cartKey = "retroRocketCart";
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  const getCart = () => JSON.parse(localStorage.getItem(cartKey)) || [];

  const saveCart = (cart) => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartDisplay();
  };

  window.addToCart = (product, price) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.name === product);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ name: product, price, qty: 1 });
    }
    saveCart(cart);
    alert(`${product} added to cart!`);
  };

  function updateCartDisplay() {
    const cart = getCart();
    if (cartItemsList) {
      cartItemsList.innerHTML = "";
    }
    let total = 0;
    let count = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
      count += item.qty;
      if (cartItemsList) {
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}`;
        cartItemsList.appendChild(li);
      }
    });
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
    if (cartCount) cartCount.textContent = count;
  }

  window.checkout = () => {
    const cart = getCart();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    alert("Thank you for your purchase! (This is a demo checkout.)");
    localStorage.removeItem(cartKey);
    updateCartDisplay();
  };

  updateCartDisplay();
});
