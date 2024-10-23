const header = document.querySelector("header");// search for the header in the html doc , the variable will be used to manipulate the header style

window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",this.window.scrollY > 0);
})//#code to execute when the user scrolls

// Define cart and total
let cart = [];
let total = 0;

// Select all the 'Add to Cart' buttons
const addToCartButtons = document.querySelectorAll('.add-cart');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Loop through each "Add to Cart" button and add event listener
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Get the closest product details
        const product = this.closest('.row');
        const itemName = product.querySelector('h4').textContent;  // Get product name
        const itemPrice = parseFloat(product.querySelector('.item-price').textContent.replace('$', ''));  // Get price

        // Add product to the cart array
        cart.push({ name: itemName, price: itemPrice });

        // Update the cart display
        const listItem = document.createElement('li');
        listItem.textContent = `${itemName} - $${itemPrice.toFixed(2)}`;
        cartItemsList.appendChild(listItem);

        // Update the total price
        total += itemPrice;
        totalPriceElement.textContent = total.toFixed(2);

        alert(`${itemName} has been added to your cart!`);
    });
});

// Display the cart when the cart icon is clicked
document.getElementById('cart-button').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the default link behavior
    document.getElementById('cart-container').style.display = 'block';  // Show the cart
});

// Close the cart when the "Close" button is clicked
document.getElementById('close-cart-button').addEventListener('click', () => {
    document.getElementById('cart-container').style.display = 'none';
});

// Handle the checkout process
document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length > 0) {
        alert(`Checkout successful! Your total is $${totalPriceElement.textContent}`);
        cart = [];  // Clear the cart
        cartItemsList.innerHTML = '';  // Clear the cart display
        total = 0;  // Reset total price
        totalPriceElement.textContent = total.toFixed(2);
    } else {
        alert('Your purchase has been processed.');
    }
});

// Remove items from cart by clicking on them
cartItemsList.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        const productName = e.target.textContent.split(' - ')[0];  // Get item name
        const product = cart.find(item => item.name === productName);
        if (product) {
            total -= product.price;  // Subtract the price
            cart = cart.filter(item => item.name !== productName);  // Remove from cart array
            e.target.remove();  // Remove the list item from UI
            totalPriceElement.textContent = total.toFixed(2);  // Update total price
        }
    }
});