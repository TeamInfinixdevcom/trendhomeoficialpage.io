function generarID() {
    return 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

function mostrarResumen() {
    const resumenDiv = document.getElementById("resumen-compra");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (resumenDiv) {
        if (carrito.length === 0) {
            resumenDiv.innerHTML = "<p>No hay productos en el carrito.</p>";
        } else {
            let total = 0;
            const idOrden = localStorage.getItem("idOrden") || generarID();
            localStorage.setItem("idOrden", idOrden);

            let html = `<p><strong>ID de compra:</strong> ${idOrden}</p>`;
            html += "<ul class='list-group mb-3'>";

            carrito.forEach((item, index) => {
                // Convierte el precio a número (quita el símbolo de $ si lo tiene)
                let precioNumber = parseFloat(item.precio.replace(/[^\d\.]/g, '')) || 0;
                total += precioNumber;

                html += `<li class='list-group-item d-flex justify-content-between align-items-center'>
                    <span>${item.nombre} - <strong>${item.precio}</strong></span>
                    <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </li>`;
            });

            html += "</ul>";
            html += `<p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
            resumenDiv.innerHTML = html;
        }
    }

    // Actualizar contador del carrito con animación bump
    const contador = document.getElementById("carrito-contador");
    if (contador) {
        contador.textContent = carrito.length;
        contador.style.display = carrito.length > 0 ? "inline-block" : "none";
        contador.classList.remove("bump");
        void contador.offsetWidth;
        contador.classList.add("bump");
    }
}

function agregarAlCarrito(nombre, precio) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${nombre} agregado al carrito.`);
    mostrarResumen(); // actualizar resumen
}

function finalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("No hay productos en el carrito.");
        return;
    }
    const id = localStorage.getItem("idOrden") || generarID();
    let mensaje = `¡Hola TrendHome! 👋%0AMi pedido:%0AOrden: ${id}%0A`;
    carrito.forEach(item => {
        mensaje += `- ${item.nombre}: ${item.precio}%0A`;
    });
    const total = carrito.reduce((acc, item) => acc + parseFloat(item.precio.replace(/[^\d\.]/g, '')), 0);
    mensaje += `Total: $${total.toFixed(2)}`;

    // Abrir WhatsApp con mensaje (tu número)
    window.open(`https://wa.me/50661514959?text=${mensaje}`, "_blank");

    localStorage.removeItem("carrito");
    localStorage.removeItem("idOrden");
    mostrarResumen(); // limpiar visual
}

document.addEventListener("DOMContentLoaded", mostrarResumen);

function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1); // elimina 1 elemento en esa posición
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarResumen(); // actualiza visual
}
