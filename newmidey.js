// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".product button");

// Load cart from localStorage or create new
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart icon display
let cartIcon = document.createElement("a");
cartIcon.href = "newmideycart.html";
cartIcon.id = "cart-icon";
cartIcon.classList.add('cart-icn');
cartIcon.textContent = `🛒 ${cartItems.length}`;
document.body.appendChild(cartIcon);

// Style it


// Add to cart function
addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const product = button.parentElement;
    const name = product.querySelector("h3").textContent;
    const price = product.querySelector("p").textContent;
    const image = product.querySelector("img").src;

    cartItems.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cartItems));

    cartIcon.textContent = `🛒 ${cartItems.length}`;
  });
});
