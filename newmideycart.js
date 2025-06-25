const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.getElementById("cart-items");
const emptyMessage = document.getElementById("empty-message");

if (cartItems.length === 0) {
  emptyMessage.style.display = "block";
} else {
  emptyMessage.style.display = "none";
  cartItems.forEach((item, index) => {
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
            <span class="qty" id="qty-${index}">1</span>
            <button class="increase" data-index="${index}">+</button>
          </div>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      </div>
    `;

    cartList.appendChild(li);
  });

  // Quantity control logic (basic)
  document.querySelectorAll(".increase").forEach(btn =>
    btn.addEventListener("click", e => {
      const i = e.target.dataset.index;
      const qtySpan = document.getElementById(`qty-${i}`);
      qtySpan.textContent = parseInt(qtySpan.textContent) + 1;
    })
  );

  document.querySelectorAll(".decrease").forEach(btn =>
    btn.addEventListener("click", e => {
      const i = e.target.dataset.index;
      const qtySpan = document.getElementById(`qty-${i}`);
      const current = parseInt(qtySpan.textContent);
      if (current > 1) qtySpan.textContent = current - 1;
    })
  );

  // Remove button logic
  document.querySelectorAll(".remove-btn").forEach(btn =>
    btn.addEventListener("click", e => {
      const i = e.target.dataset.index;
      cartItems.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      location.reload();
    })
  );
}
