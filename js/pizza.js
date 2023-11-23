document.addEventListener('DOMContentLoaded', () => {
    // Dynamically adding student info
    const studentInfo = document.getElementById('student-info');
    studentInfo.textContent = 'Student ID: 200547582, Name: Sia Chachra';
    studentInfo.className = "studentInfo";


    // Order button event listener
    const orderButton = document.getElementById('order-button');
    orderButton.addEventListener('click', orderPizza);
});

function orderPizza() {
    // Capture the values from the form
    const customerName = document.getElementById('customer-name').value;
    if (!isAtLeastOneChecked('input[name="ingredients"]') || !isAtLeastOneChecked('input[name="extras"]')) {
        alert("Please select at least one ingredient and one extra.");
        return;
    }
    const customerMobile = document.getElementById('customer-mobile').value;
    if (!/^\d{10}$/.test(customerMobile)) {
        alert("Mobile number must be exactly 10 digits.");
        return;
    }
    const size = document.getElementById('size').value;
    const crust = document.getElementById('crust').value;
    const ingredients = Array.from(document.querySelectorAll('input[name="ingredients"]:checked')).map(el => el.value);
    const extras = Array.from(document.querySelectorAll('input[name="extras"]:checked')).map(el => el.value);
    const specialInstructions = document.getElementById('special-instructions').value;

    // Create the Pizza object
    const pizza = new Pizza(customerName, customerMobile, size, crust, ingredients, extras, specialInstructions);

    // Output the description of the pizza
    const pizzaSummary = document.getElementById('pizza-summary');
    pizzaSummary.innerHTML = `<h2>Your Pizza Order</h2>${pizza.describe()}`;
}


class Pizza {
    constructor(customerName, customerMobile, size, crust, ingredients, extras, specialInstructions) {
        this.customerName = customerName;
        this.customerMobile = customerMobile;
        this.size = size;
        this.crust = crust;
        this.ingredients = ingredients;
        this.extras = extras;
        this.specialInstructions = specialInstructions;
    }

    // Method to describe the pizza order
    describe() {
        // a string representation of the pizza order
        return `
            <p>Name: ${this.customerName}</p>
            <p>Mobile: ${this.customerMobile}</p>
            <p>Size: ${this.size}</p>
            <p>Crust: ${this.crust}</p>
            <p>Ingredients: ${this.ingredients.join(', ')}</p>
            <p>Extras: ${this.extras.join(', ') || 'None'}</p>
            <p>Special Instructions: ${this.specialInstructions}</p>
        `;
    }
}
// Function to check if at least one checkbox is checked in a given group
function isAtLeastOneChecked(selector) {
    return Array.from(document.querySelectorAll(selector)).some(el => el.checked);
}

