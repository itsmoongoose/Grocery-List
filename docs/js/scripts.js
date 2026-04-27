// Define variables
const itemForm = document.querySelector("#item-form");
const itemInputField = document.querySelector("#item-input-field");
const submitBtn = document.querySelector("#submit-btn");
const productDisplayDiv = document.querySelector("#product-list");
const placeholderText = document.querySelector("#placeholder-text");
let placeholderTextVis = true;
const clrSelectBtn = document.querySelector("#clr-select");
const clrAllBtn = document.querySelector("#clr-all");
const productList = [];

// Function -- display product list
function displayProducts() {
    const productUL = document.createElement("ul");
    productUL.classList.add("product-ul");
    const productContainer = document.querySelector(".product-ul");
    
    // Loop through product list array and create element for each item
    for (const product of productList) {
        const listItem = document.createElement("li");
        const inputCheckbox = document.createElement("input");
        inputCheckbox.type = "checkbox";
        inputCheckbox.id = `checkbox${productList.indexOf(product)}`;
        inputCheckbox.value = product;
        const productName = document.createElement("label");
        productName.htmlFor = `checkbox${productList.indexOf(product)}`;
        productName.textContent = product;
        listItem.appendChild(inputCheckbox); // <input> goes inside <li>
        listItem.appendChild(productName); // <label> goes inside <li>
        productUL.appendChild(listItem); // <li> goes inside <ul>
    }

    if (productList.length == 1 && placeholderTextVis) {
        productDisplayDiv.removeChild(placeholderText); // remove placeholder text
        placeholderTextVis = false;
    } else {
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

// Event Listener for clear selected items button
clrSelectBtn.addEventListener("click", (event) => {
    const checkedList = document.querySelectorAll('input[type="checkbox"]:checked');
    for (const item of checkedList) {
        const itemID = item.id;
        const itemName = document.getElementById(itemID).value;
        const index = productList.indexOf(itemName);
        productList.splice(index, 1);
    }
    displayProducts();
})