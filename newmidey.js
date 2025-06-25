// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".product button");

// Load cart from localStorage or create new
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart icon display
let cartIcon = document.createElement("a");
cartIcon.href = "newmideycart.html";
cartIcon.id = "cart-icon";
cartIcon.textContent = `🛒 ${cartItems.length}`;
document.body.appendChild(cartIcon);

// Style it
cartIcon.style.position = "fixed";
cartIcon.style.top = "20px";
cartIcon.style.right = "20px";
cartIcon.style.fontSize = "1.2em";
cartIcon.style.backgroundColor = "#111";
cartIcon.style.color = "#fff";
cartIcon.style.padding = "0.5em 1em";
cartIcon.style.borderRadius = "20px";
cartIcon.style.textDecoration = "none";


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
