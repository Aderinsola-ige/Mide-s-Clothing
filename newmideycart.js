const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.getElementById("cart-items");
const emptyMessage = document.getElementById("empty-message");

if (cartItems.length === 0) {
  emptyMessage.style.display = "block";
} else {
  emptyMessage.style.display = "none";

  cartItems.forEach((item, index) => {
    // Ensure quantity is tracked
    if (!item.quantity) item.quantity = 1;

    const li = document.createElement("li");
    li.classList.add("cart-item");

    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = cartItems.length;
    }

    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-image" />
      <div class="item-details">
        <h3 class="item-name">${item.name}</h3>
        <p class="item-price">${item.price}</p>
        <div class="item-controls">
          <div class="quantity">
            <button class="decrease" data-index="${index}">-</button>
            <span class="qty" id="qty-${index}">${item.quantity}</span>
            <button class="increase" data-index="${index}">+</button>
          </div>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      </div>
    `;

    cartList.appendChild(li);
  });

  // Handle quantity increase
  document.querySelectorAll(".increase").forEach(btn =>
    btn.addEventListener("click", e => {
      const i = e.target.dataset.index;
      cartItems[i].quantity += 1;
      document.getElementById(`qty-${i}`).textContent = cartItems[i].quantity;
      localStorage.setItem("cart", JSON.stringify(cartItems));
      updateCartTotal();
    })
  );

  // Handle quantity decrease
  document.querySelectorAll(".decrease").forEach(btn =>
    btn.addEventListener("click", e => {
      const i = e.target.dataset.index;
      if (cartItems[i].quantity > 1) {
        cartItems[i].quantity -= 1;
        document.getElementById(`qty-${i}`).textContent = cartItems[i].quantity;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateCartTotal();
      }
    })
  );

  // Handle item removal
  document.querySelectorAll(".remove-btn").forEach(btn =>
    btn.addEventListener("click", e => {
      const i = e.target.dataset.index;
      cartItems.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      location.reload(); // re-render the cart
    })
  );

  // Initial total calculation
  updateCartTotal();
}

// Function to update the cart total 
function updateCartTotal() {
  const cartTotalEl = document.getElementById("cart-total");
  let total = 0;

  cartItems.forEach(item => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    total += price * (item.quantity || 1);
  });

  if (cartTotalEl) {
    cartTotalEl.textContent = total.toFixed(2);
  };
};
document.getElementById("checkout-btn").addEventListener("click", () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems.length === 0) {
    alert("Your cart is empty.");
    return;
  };

  let total = 0;
  cartItems.forEach(item => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    const quantity = item.quantity || 1;
    total += price * quantity;
  });

  const handler = PaystackPop.setup({
    key: 'pk_test_24a8e9631950ef62c13aa73b96bdfc5dfdb86b54', 
    email: "test@example.com", 
    amount: total * 100, 
    currency: "NGN",
    ref: '' + Math.floor(Math.random() * 1000000000 + 1),
    callback: function (response) {

      // Redirect to confirmation page
      localStorage.removeItem("cart"); // Clear the cart
      window.location.href = "thankyou.html?ref=" + response.reference;
    },
    onClose: function () {
      alert("Transaction was cancelled.");
    }
  });

  handler.openIframe();
});
