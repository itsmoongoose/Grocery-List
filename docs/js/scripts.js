// Define variables
const itemForm = document.querySelector("#item-form");
const itemInputField = document.querySelector("#item-input-field");
const submitBtn = document.querySelector("#submit-btn");
const productDisplayDiv = document.querySelector("#product-list");
const placeholderText = document.querySelector("#placeholder-text");
let placeholderTextVis = true;
const clrSelectBtn = document.querySelector("#clr-select");
const clrAllBtn = document.querySelector("#clr-all");
let productList = [];
let placeholderPVis = false;

// Function -- add to local storage
function addToStorage(product) {
    const storageKey = product;
    const storageValue = product;
    localStorage.setItem(storageKey, JSON.stringify(storageValue));
}

// Function -- remove from local storage
function removeFromStorage(item) {
    const storageKey = item;
    const storageValue = item;
    localStorage.removeItem(storageKey, JSON.stringify(storageValue));
}

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

    if (placeholderTextVis || placeholderPVis) {
        if (placeholderTextVis) {
            productDisplayDiv.removeChild(placeholderText); // remove placeholder text
            placeholderTextVis = false;
        } else if (placeholderPVis) {
            const placeholderPSelector = document.querySelector(".placeholder-p");
            productDisplayDiv.removeChild(placeholderPSelector);
            placeholderPVis = false;
        }
    } else {
        productDisplayDiv.removeChild(productContainer); // remove old div
    }

    // Add products to page
    productDisplayDiv.appendChild(productUL);
}

// Function -- display placeholder text
function displayPlaceholderText() {
    const placeholderP = document.createElement("p");
    placeholderP.textContent = "You haven't added anything to the list yet!";
    placeholderP.classList.add("placeholder-p");
    const placeholderPSelector = document.querySelector(".placeholder-p");
    placeholderPVis = true;
    productDisplayDiv.appendChild(placeholderP);
}

// Event Listener for window
window.addEventListener("load", (event) => {
    for (let storedItem = 0; storedItem < localStorage.length; storedItem++) {
        const storedKey = localStorage.key(storedItem);
        let storedValue = localStorage.getItem(storedKey);
        storedValue = JSON.parse(storedValue);

        // Add product to product list array
        productList.push(storedValue);
    }
    if (productList.length > 0) {
        displayProducts();
    }
});

// Event Listener for item form
itemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userInput = itemInputField.value;
    const product = userInput.trim();
    itemInputField.value = ""; // clear input field
    productList.push(product); // add product to array

    // Add to local storage
    addToStorage(product);

    // Display product list
    displayProducts();
});

// Event Listeners for clear buttons
clrSelectBtn.addEventListener("click", (event) => { // clear selected items
    const checkedList = document.querySelectorAll('input[type="checkbox"]:checked');
    for (const item of checkedList) {
        const itemID = item.id;
        const itemName = document.getElementById(itemID).value;
        const index = productList.indexOf(itemName);
        productList.splice(index, 1);
        removeFromStorage(itemName); // remove item from local storage
    }

    // Display products
    displayProducts();

    // Display placeholder text
    if (productList.length == 0) {
        const productContainer = document.querySelector(".product-ul");
        productDisplayDiv.removeChild(productContainer);
        displayPlaceholderText();
    }
})
clrAllBtn.addEventListener("click", (event) => { // clear all items
    const productContainer = document.querySelector(".product-ul");
    productDisplayDiv.removeChild(productContainer);
    productList = [];
    localStorage.clear(); // delete all items from local storage
    displayPlaceholderText();
})