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
    const productDiv = document.createElement("div");
    
    // Loop through product list array and create element for each item
    for (const product of productList) {
        productDiv.classList.add("product-div");
        productContainer = document.querySelector(".product-div");
        const productName = document.createElement("p");
        productName.textContent = product;
        productDiv.appendChild(productName);
    }

    if (productList.length == 1) {
        productDisplayDiv.removeChild(placeholderText); // remove placeholder text
    } else if (productList.length > 1) {
        productDisplayDiv.removeChild(productContainer); // remove old div
    }

    // Add products to page
    productDisplayDiv.appendChild(productDiv);
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