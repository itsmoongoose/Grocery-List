// Define variables
const itemForm = document.querySelector("#item-form");
const itemInputField = document.querySelector("#item-input-field");
const submitBtn = document.querySelector("#submit-btn");
const productDisplayDiv = document.querySelector("#product-list");
const placeholderText = document.querySelector("#placeholder-text");
const productList = [];
let productContainer = "";

// Function -- display product list
function displayProducts() {
    const productUL = document.createElement("ul");
    
    // Loop through product list array and create element for each item
    for (const product of productList) {
        productUL.classList.add("product-ul");
        productContainer = document.querySelector(".product-ul");
        const productName = document.createElement("li");
        productName.textContent = product;
        productUL.appendChild(productName);
    }

    if (productList.length == 1) {
        productDisplayDiv.removeChild(placeholderText); // remove placeholder text
    } else if (productList.length > 1) {
        productDisplayDiv.removeChild(productContainer); // remove old div
    }

    // Add products to page
    productDisplayDiv.appendChild(productUL);
}

// Event Listener for item form
itemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userInput = itemInputField.value;
    const product = userInput.trim();
    itemInputField.value = ""; // clear input field
    productList.push(product); // add product to array

    // Display product list
    displayProducts();
});