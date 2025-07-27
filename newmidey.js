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


const modal = document.getElementById('custom-modal');
const modalMessage = document.getElementById('modal-message');
const closeSpan = document.getElementsByClassName('close')[0];
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

    function showModal (message){
      modal.style.display = 'block';
      modalMessage.innerText = message;
    }
    closeSpan.onclick = function(){
      modal.style.display = 'none';
    }
    
    window.onclick = function(event) {
      if (event.target == modal){
        modal.style.display = 'none';
      }
    }
    showModal ('Item has been added to cart')

  });
});

