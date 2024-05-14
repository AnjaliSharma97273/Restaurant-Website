// Retrieve the cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Define currency symbol
const currencySymbol = 'INR';

// Function to update the cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    // Clear previous content
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach(function (item, index) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemImage.classList.add('item-image');
        cartItem.appendChild(itemImage);

        const itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info');

        const itemName = document.createElement('p');
        itemName.textContent = item.name;
        itemInfo.appendChild(itemName);

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `${currencySymbol}${item.price.toFixed(2)}`;
        itemInfo.appendChild(itemPrice);

        const quantityLabel = document.createElement('label');
        quantityLabel.textContent = 'Quantity: ';
        itemInfo.appendChild(quantityLabel);

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity || 1;
        quantityInput.min = '1';
        quantityInput.classList.add('quantity-input');
        quantityInput.addEventListener('change', function () {
            updateQuantity(index, this.value);
        });
        itemInfo.appendChild(quantityInput);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.dataset.index = index;
        removeButton.addEventListener('click', function () {
            removeItemFromCart(index);
        });
        itemInfo.appendChild(removeButton);

        cartItem.appendChild(itemInfo);
        cartItems.appendChild(cartItem);

        total += item.quantity * parseFloat(item.price);
    });

    totalPrice.textContent = `Total: ${currencySymbol}${total.toFixed(2)}`;
}

// Other functions and event listeners remain the same
