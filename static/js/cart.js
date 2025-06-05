function generateID() {
    return 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

function showSummary() {
    const summaryDiv = document.getElementById("purchase-summary");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (summaryDiv) {
        if (cart.length === 0) {
            summaryDiv.innerHTML = "<p>No products in the cart.</p>";
        } else {
            let total = 0;
            const orderID = localStorage.getItem("orderID") || generateID();
            localStorage.setItem("orderID", orderID);

            let html = `<p><strong>Order ID:</strong> ${orderID}</p>`;
            html += "<ul class='list-group mb-3'>";

            cart.forEach((item, index) => {
                let priceNumber = parseFloat(item.price.replace(/[^\d\.]/g, '')) || 0;
                total += priceNumber;

                html += `<li class='list-group-item d-flex justify-content-between align-items-center'>
                    <span>${item.name} - <strong>${item.price}</strong></span>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </li>`;
            });

            html += "</ul>";
            html += `<p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
            summaryDiv.innerHTML = html;
        }
    }

    // Update cart counter with bump animation
    const counter = document.getElementById("cart-counter");
    if (counter) {
        counter.textContent = cart.length;
        counter.style.display = cart.length > 0 ? "inline-block" : "none";
        counter.classList.remove("bump");
        void counter.offsetWidth;
        counter.classList.add("bump");
    }
}

function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to the cart.`);
    showSummary();
}

function completePurchase() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("No products in the cart.");
        return;
    }
    const id = localStorage.getItem("orderID") || generateID();
    let message = `Hello TrendHome! 👋%0AMy order:%0AOrder: ${id}%0A`;
    cart.forEach(item => {
        message += `- ${item.name}: ${item.price}%0A`;
    });
    const total = cart.reduce((acc, item) => acc + parseFloat(item.price.replace(/[^\d\.]/g, '')), 0);
    message += `Total: $${total.toFixed(2)}`;

    // Open WhatsApp with message (your number)
    window.open(`https://wa.me/50661514959?text=${message}`, "_blank");

    localStorage.removeItem("cart");
    localStorage.removeItem("orderID");
    showSummary();
}

document.addEventListener("DOMContentLoaded", showSummary);

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showSummary();
}
