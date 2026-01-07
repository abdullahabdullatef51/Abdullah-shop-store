// Checkout page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadCheckoutCart();
    setupQuantityControls();
    setupDeleteButtons();
    calculateTotals();
    setupCouponButton();
});

function loadCheckoutCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemContainer = document.querySelector('.checkout .ordersummary .item');
    
    if (!itemContainer) return;
    
    itemContainer.innerHTML = '';
    
    if (cart.length === 0) {
        itemContainer.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--p_color);">Your cart is empty. <a href="index.html" style="color: var(--main_color);">Continue Shopping</a></p>';
        updateTotals(0, 0);
        return;
    }
    
    cart.forEach((item, index) => {
        const totalPrice = item.price * item.quantity;
        const itemHTML = `
            <div class="item_cart" data-index="${index}">
                <div class="image_name">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="content">
                        <h4>${item.name}</h4>
                        <p class="price_cart">$${totalPrice.toFixed(2)}</p>
                        <div class="quantity_control">
                            <button class="decrease_quantity" data-index="${index}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="increase_quantity" data-index="${index}">+</button>
                        </div>
                    </div>
                </div>
                <button class="delete_item" data-index="${index}">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        itemContainer.innerHTML += itemHTML;
    });
    
    setupQuantityControls();
    setupDeleteButtons();
    calculateTotals();
}

function setupQuantityControls() {
    const increaseButtons = document.querySelectorAll('.checkout .increase_quantity');
    const decreaseButtons = document.querySelectorAll('.checkout .decrease_quantity');
    
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            increaseQuantity(index);
        });
    });
    
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            decreaseQuantity(index);
        });
    });
}

function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.checkout .delete_item');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeItem(index);
        });
    });
}

function increaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCheckoutCart();
    }
}

function decreaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index] && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCheckoutCart();
    }
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCheckoutCart();
}

function calculateTotals() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const total = subtotal + shipping;
    
    updateTotals(subtotal, shipping, total);
}

function updateTotals(subtotal, shipping, total) {
    const subtotalEl = document.querySelector('.checkout .subtotal_checkout');
    const shopTables = document.querySelectorAll('.checkout .shop_table');
    const shippingEl = shopTables.length > 1 ? shopTables[1].querySelector('span') : null;
    const totalEl = shopTables.length > 2 ? shopTables[2].querySelector('span') : null;
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) {
        if (shipping === 0 && subtotal > 0) {
            shippingEl.textContent = 'FREE';
            shippingEl.style.color = 'var(--sale_color)';
            shippingEl.style.fontWeight = 'bold';
        } else {
            shippingEl.textContent = `$${shipping.toFixed(2)}`;
        }
    }
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function setupCouponButton() {
    const couponButton = document.querySelector('.checkout .btn_coupon button');
    const couponInput = document.querySelector('.checkout .inputs input[type="text"]');
    
    if (couponButton && couponInput) {
        couponButton.addEventListener('click', function(e) {
            e.preventDefault();
            const couponCode = couponInput.value.trim().toUpperCase();
            
            // Simple coupon validation
            const coupons = {
                'SAVE10': 0.1,
                'SAVE20': 0.2,
                'WELCOME': 0.15
            };
            
            if (coupons[couponCode]) {
                applyCoupon(coupons[couponCode]);
                alert(`Coupon applied! ${coupons[couponCode] * 100}% discount!`);
            } else {
                alert('Invalid coupon code');
            }
        });
    }
}

function applyCoupon(discount) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const discountAmount = subtotal * discount;
    const newSubtotal = subtotal - discountAmount;
    const shipping = newSubtotal > 100 ? 0 : 10;
    const total = newSubtotal + shipping;
    
    // Update with discount
    const subtotalEl = document.querySelector('.checkout .subtotal_checkout');
    if (subtotalEl) {
        subtotalEl.innerHTML = `
            <span style="text-decoration: line-through; color: var(--p_color); margin-right: 10px;">
                $${subtotal.toFixed(2)}
            </span>
            <span style="color: var(--sale_color); font-weight: bold;">
                $${newSubtotal.toFixed(2)}
            </span>
        `;
    }
    
    const shippingEl = document.querySelectorAll('.checkout .shop_table span')[1];
    const totalEl = document.querySelectorAll('.checkout .shop_table span')[2];
    
    if (shippingEl && shipping === 0) {
        shippingEl.parentElement.innerHTML = `
            <p>Shipping :</p>
            <span style="color: var(--sale_color); font-weight: bold;">FREE</span>
        `;
    } else if (shippingEl) {
        shippingEl.textContent = `$${shipping.toFixed(2)}`;
    }
    
    if (totalEl) {
        totalEl.innerHTML = `
            <span style="font-size: 24px; color: var(--main_color);">
                $${total.toFixed(2)}
            </span>
        `;
    }
}

// Form submission
document.querySelector('.checkout form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Get form data
    const formData = new FormData(this);
    const email = this.querySelector('input[type="email"]').value;
    const address = this.querySelector('input[name="Address"]').value;
    const name = this.querySelector('input[name="Name"]').value;
    const phone = this.querySelector('input[name="Phone"]').value;
    
    if (!email || !address || !name || !phone) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Simulate order placement
    alert('Order placed successfully! Thank you for your purchase.');
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Redirect to home
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
});

