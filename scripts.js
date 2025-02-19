// Variant prices for each combination
const variantPrices = {
    "Regular|Milk Chocolate": 200, "Regular|Dark Chocolate": 225, "Regular|White Chocolate": 200,
    "Large|Milk Chocolate": 225, "Large|Dark Chocolate": 250, "Large|White Chocolate": 220,
    "Extra-Large|Milk Chocolate": 250, "Extra-Large|Dark Chocolate": 275, "Extra-Large|White Chocolate": 240
};

let totalPrice = 0;  // Initialize total price

// Toggle product description visibility
function toggleDescription() {
    const fullDescription = document.getElementById("fullDescription");
    const dots = document.getElementById("dots");
    const toggleButton = document.getElementById("toggleDescription");

    if (fullDescription.style.display === "none") {
        fullDescription.style.display = "inline";
        dots.style.display = "none";
        toggleButton.textContent = "Hide Details";
    } else {
        fullDescription.style.display = "none";
        dots.style.display = "inline";
        toggleButton.textContent = "Show Details";
    }
}


// Update quantity
function updateQuantity(change) {
    let quantity = Math.max(0, parseInt(document.getElementById("quantity").value) + change);
    document.getElementById("quantity").value = quantity;
    handleQuantityChange(quantity);
}

// Show dropdown options when quantity > 0
function handleQuantityChange(quantity) {
    document.getElementById("options").style.display = quantity > 0 ? "block" : "none";
    if (quantity === 0) resetOptions();
}

// Enable Add button when both options are selected
function checkAddButton() {
    let addButton = document.getElementById("addButton");
    addButton.disabled = !document.getElementById("size").value || !document.getElementById("chocolateType").value;
}

// Add selected variant to list and update price
function addToVariantList() {
    let size = document.getElementById("size").value;
    let chocolateType = document.getElementById("chocolateType").value;
    let variantKey = `${size}|${chocolateType}`;

    if (variantPrices[variantKey]) {
        let variantList = document.getElementById("variantList");
        let variantItem = document.createElement("p");
        variantItem.textContent = `${variantList.children.length + 1}: ${size} | ${chocolateType} - ₹${variantPrices[variantKey]}`;
        variantList.appendChild(variantItem);

        totalPrice += variantPrices[variantKey];
        document.getElementById("totalPrice").textContent = `Total: ₹${totalPrice}`;
    }

    resetOptions();
	document.getElementById("options").style.display = "none"; // Hide dropdowns
}

// Show dropdown options when quantity > 0
function handleQuantityChange(quantity) {
    const options = document.getElementById("options");
    if (quantity > 0) {
        options.style.display = "block";
    } else {
        options.style.display = "none"; // Hide options if quantity is 0
        resetOptions();
    }
}

// Reset options after adding
function resetOptions() {
    document.getElementById("size").selectedIndex = 0;
    document.getElementById("chocolateType").selectedIndex = 0;
    document.getElementById("addButton").disabled = true;
}

// Email validation regex
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Proceed to checkout (Validate email and integrate RazorPay)
function proceedToCheckout() {
    let email = document.getElementById("email").value;
    if (isValidEmail(email)) {
        alert("Proceeding to Checkout...");
        // RazorPay integration logic goes here
    } else {
        alert("Please enter a valid email address.");
    }
}

// Check Add button when options change
document.getElementById("size").addEventListener("change", checkAddButton);
document.getElementById("chocolateType").addEventListener("change", checkAddButton);
