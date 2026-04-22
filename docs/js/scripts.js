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
        const listItem = document.createElement("li");
        const inputCheckbox = document.createElement("input");
        inputCheckbox.type = "checkbox";
        inputCheckbox.id = `checkbox${productList.indexOf(product)}`;
        const productName = document.createElement("label");
        productName.htmlFor = `checkbox${productList.indexOf(product)}`;
        productName.textContent = product;
        listItem.appendChild(inputCheckbox); // <input> goes inside <li>
        listItem.appendChild(productName); // <label> goes inside <li>
        productUL.appendChild(listItem); // <li> goes inside <ul>
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