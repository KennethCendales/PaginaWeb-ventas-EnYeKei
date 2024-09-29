// Inicializamos variables para el carrito y el contador de productos
let cart = [];
let productCount = 0;

// Función para agregar productos al carrito
function addToCart(productName) {
    // Verificamos si el producto ya está en el carrito
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex > -1) {
        // Si el producto ya existe, incrementamos la cantidad
        cart[productIndex].quantity += 1;
    } else {
        // Si no existe, lo añadimos al carrito
        cart.push({ name: productName, quantity: 1 });
    }

    // Actualizamos el contador de productos en el carrito
    productCount++;
    updateCartDisplay();
}

// Función para mostrar y ocultar el carrito
function toggleCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.classList.toggle('hidden-cart');
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart');
    const countElement = document.getElementById('contador-productos');
    countElement.innerText = productCount;

    // Limpiamos el carrito visual
    cartContainer.innerHTML = '';

    // Añadimos los productos del carrito a la visualización
    cart.forEach(item => {
        const cartProduct = document.createElement('div');
        cartProduct.className = 'cart-product';

        cartProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${item.quantity}</span>
                <p class="titulo-producto-carrito">${item.name}</p>
                <span class="precio-producto-carrito">$${getProductPrice(item.name) * item.quantity}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
                onclick="removeFromCart('${item.name}')"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        cartContainer.appendChild(cartProduct);
    });

    // Actualizar el total
    updateTotal();
}

// Función para obtener el precio de un producto
function getProductPrice(productName) {
    switch (productName) {
        case 'Reloj Power Time':
            return 50;
        case 'Dispensador Crema Esterilizador':
            return 30;
        case 'Auriculares Inalámbricos':
            return 20;
        default:
            return 0;
    }
}

// Función para actualizar el total a pagar
function updateTotal() {
    const totalElement = cartContainer.querySelector('.total-pagar');
    const totalPrice = cart.reduce((sum, item) => sum + getProductPrice(item.name) * item.quantity, 0);
    totalElement.innerText = `$${totalPrice}`;
}

// Función para eliminar productos del carrito
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    productCount -= cart.filter(item => item.name === productName).length; // Actualizamos el contador
    updateCartDisplay();
}
