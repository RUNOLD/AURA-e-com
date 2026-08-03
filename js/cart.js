cart = JSON.parse(localStorage.getItem("cart")) || [];
wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
let cartContainer = document.getElementById("cart-items-container");
let quantity = document.getElementById("quantity-input");
let finalPrice = 0;
let discount = 0;
let discountPrice = 0;
let checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || [];
let discountCheckoutData = JSON.parse(localStorage.getItem("discountCheckoutData")) || [];


function displayCart() {
     if (!cart || cart.length === 0) {
          cartContainer.innerHTML = ` <div id="empty-cart-view" class="empty-cart-container" style="text-align: center; padding: 60px 24px;">
                    <div class="empty-cart-illustration" style="margin-bottom: 24px; color: var(--color-text-muted);">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" width="80" height="80" style="margin: 0 auto;">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            <line x1="12" y1="10" x2="12" y2="15"></line>
                            <line x1="10" y1="12" x2="14" y2="12"></line>
                        </svg>
                    </div>
                    <h2 class="empty-cart-title" style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 12px; color: var(--color-primary);">Your Cart is Empty</h2>
                    <p class="empty-cart-desc" style="color: var(--color-text-muted); margin-bottom: 30px; max-width: 400px; margin-left: auto; margin-right: auto;">Looks like you haven't added anything to your cart yet. Head back to the store to explore our collections.</p>
                    <a href="shop.html" id="continue-shopping" class="btn btn-primary">Continue Shopping</a>
                </div>`;
        return;
     }
    cart.forEach((product, index) => {
      cartContainer.innerHTML += `
      <article class="cart-item-card cart-item" data-id="1">
                        <div class="cart-item-image">
                            <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-header">
                                <div class="cart-item-info">
                                    <span class="cart-item-brand">AURA</span>
                                    <h3 class="cart-item-name product-name">
                                        <a href="view-details.html">${product.title}</a>
                                    </h3>
                                </div>
                                <div class="cart-item-price-block">
                                    <span class="cart-item-price product-price">$${product.price}</span>
                                    <span class="cart-item-unit-price">Unit: $${product.price}</span>
                                </div>
                            </div>
                            
                            <div class="cart-item-attributes">
                                <span class="attribute-item">
                                    <strong>Stock:</strong> ${product.stock}
                                    <span class="color-dot" style="background-color: #FFFFFF;"></span>
                                </span>
                                <span class="attribute-item">
                                    <strong>Brand:</strong> ${product.brand}
                                </span>
                            </div>
                            
                            <div class="cart-item-status status-in-stock">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>${product.availabilityStatus}</span>
                            </div>
                            
                            <div class="cart-item-footer">
                                <div class="quantity-selector product-quantity">
                                    <button onclick = "decrease()" type="button" class="quantity-btn quantity-minus" aria-label="Decrease quantity">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                    </button>
                                    <input id = "quantity-input" type="number" class="quantity-input" value="1" min="1" max="99" aria-label="Quantity" readonly>
                                    <button onclick = "increase()" type="button" class="quantity-btn quantity-plus" aria-label="Increase quantity">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                    </button>
                                </div>
                                
                                <div class="cart-item-actions">
                                    <button onclick = "addToWishlist(${product.id})" class="action-link move-to-wishlist" aria-label="Move item to wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                        <span>Wishlist</span>
                                    </button>
                                    <button onclick= "remove(${product.id})" class="action-link action-link-remove remove-item" aria-label="Remove item from cart">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </div>
                        </div>          
          </article>
    `;
  });
}

displayCart();
function increase() {
    let quantity = document.getElementById("quantity-input");
    if (quantity.value < 99) {
        quantity.value++;
    }
}
function decrease() {
    let quantity = document.getElementById("quantity-input");
    if (quantity.value > 1) {
        quantity.value--;
    }
}
function updateBadges() {
    // Update all Cart badges (desktop & mobile)
    const cartBadges = document.querySelectorAll("#cart-badge, #header-cart-count, a[href='cart.html'] .badge, a[href='cart.html'] .badge-count");
    cartBadges.forEach(badge => {
        badge.innerText = cart.length;
    });

    // Update all Wishlist badges (desktop & mobile)
    const wishlistBadges = document.querySelectorAll("#wishlist-badge, #wishlist-trigger .badge, a[href='wishlist.html'] .badge, a[href='wishlist.html'] .badge-count");
    wishlistBadges.forEach(badge => {
        badge.innerText = wishlist.length;
    });
}
function remove(productId) {
    cart.splice(cart.findIndex(product => product.id === productId), 1);
    cartContainer.innerHTML = "";
    localStorage.setItem("cart", JSON.stringify(cart));
    calculateTotalPrice()
    displayCart()
    noOfItemsInCart();
    updateBadges()
}
function noOfItemsInCart() {
    document.getElementById("cart-count-subtitle").innerText = `You have ${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart.`;
}
noOfItemsInCart();

let checkoutDetails;
function calculateTotalPrice(){
    let totalProductPrice = 0;
    cart.forEach(product => {
        totalProductPrice += parseFloat(product.price || 0);
    });
    finalPrice = totalProductPrice.toFixed(2);
    
    let subtotal = document.getElementById("subtotal");
    let discount = document.getElementById("discount");
    let sumDivider = document.getElementById("sumDivider");
    let grandTotal = document.getElementById("grand-total");
    
    if (subtotal) {
        subtotal.innerHTML = `$${finalPrice}`;
    }

    let couponInput = document.getElementById("coupon-input");
    let couponVal = couponInput ? couponInput.value.trim().toUpperCase() : "";
    
    let discountAmt = 0;
    if (couponVal === "AURA10" || couponVal === "ILOVEJS10" || couponVal === "DISCOUNT10") {
        discountAmt = totalProductPrice * 0.1;
        let finalGrandTotal = totalProductPrice - discountAmt;
        
        if (discount) {
            discount.innerHTML = `-$${discountAmt.toFixed(2)}`;
        }
        if (sumDivider) {
            sumDivider.innerHTML = `Discount applied`;
        }
        if (grandTotal) {
            grandTotal.innerHTML = `$${finalGrandTotal.toFixed(2)}`;
        }
    } else {
        if (discount) {
            discount.innerHTML = "";
        }
        if (sumDivider) {
            sumDivider.innerHTML = "";
        }
        if (grandTotal) {
            grandTotal.innerHTML = `$${finalPrice}`;
        }
    }

    checkoutDetails = {
        subtotal: finalPrice,
        discount: discountAmt.toFixed(2)
    };
    checkoutData.push(checkoutDetails);
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
}
calculateTotalPrice();

function coupon() {
    let couponInput = document.getElementById("coupon-input").value.toUpperCase();
    if (couponInput === "AURA10" || couponInput === "ILOVEJS10" || couponInput === "DISCOUNT10") {
        calculateTotalPrice();
        alert("Coupon applied successfully!");
    } else {
        calculateTotalPrice();
        alert("Invalid coupon code. Please try again.");
    }

    let subtotalVal = parseFloat(finalPrice);
    let discountVal = 0;
    if (couponInput === "AURA10" || couponInput === "ILOVEJS10" || couponInput === "DISCOUNT10") {
        discountVal = subtotalVal * 0.1;
        subtotalVal = subtotalVal * 0.9;
    }

    checkoutDetails = {
        subtotal: finalPrice,
        discount: discountVal.toFixed(2),
        newSubtotal: subtotalVal.toFixed(2),
        newDiscount: discountVal.toFixed(2)
    };
    discountCheckoutData.push(checkoutDetails);
    localStorage.setItem("discountCheckoutData", JSON.stringify(discountCheckoutData));
} 
function addToWishlist(productId) {
    let alreadyInWishlist = wishlist.some(product => product.id === productId);
    let wishlistProduct = allApiProducts.find(product => product.id === productId);
    if (alreadyInWishlist) {
        alert("Product already added!");
        return;
    }
    if (!wishlistProduct) {
        alert("Product not found!");
        return;
    }
    console.log(wishlistProduct);
    wishlist.push(wishlistProduct);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Product added to wishlist!");
}


function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before proceeding to checkout.");
    } else {
        calculateTotalPrice();
        document.getElementById("checkout-overlay").style.display = "block";
        document.getElementById("checkout-overlay").innerHTML = `
          <div class="checkout-modal" id="checkout-modal">
            
            <button onclick="closeCheckout()" class="checkout-close-btn" id="close-checkout" aria-label="Close Checkout Modal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            
            <div class="checkout-header">
                <div class="checkout-title-row">
                    <svg class="checkout-lock-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <h2 id="checkout-title">AURA Checkout</h2>
                </div>
                <p class="checkout-subtitle">Complete your purchase securely.</p>
            </div>

            
            <div class="checkout-grid">
                
                <div class="checkout-col-left">
                    
            
                    <div class="card-preview-wrapper">
                        <div class="card-preview">
                            <div class="card-preview-header">
                                <div class="card-preview-chip">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="26">
                                        <rect x="1" y="2" width="22" height="16" rx="3" fill="url(#chip-grad)"/>
                                        <line x1="1" y1="10" x2="23" y2="10" stroke="#111111" stroke-width="1.2"/>
                                        <line x1="8" y1="2" x2="8" y2="18" stroke="#111111" stroke-width="1.2"/>
                                        <line x1="16" y1="2" x2="16" y2="18" stroke="#111111" stroke-width="1.2"/>
                                        <defs>
                                            <linearGradient id="chip-grad" x1="1" y1="2" x2="23" y2="18" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#F59E0B"/>
                                                <stop offset="1" stop-color="#D97706"/>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div class="card-preview-contactless">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
                                        <path d="M5 8a10 10 0 0 1 0 8"></path>
                                        <path d="M8 6a14 14 0 0 1 0 12"></path>
                                        <path d="M2 10a6 6 0 0 1 0 4"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="card-preview-number" id="preview-card-number">•••• •••• •••• ••••</div>
                            <div class="card-preview-footer">
                                <div class="card-preview-holder">
                                    <div class="card-preview-label">Card Holder</div>
                                    <div class="card-preview-value" id="preview-cardholder-name">YOUR NAME</div>
                                </div>
                                <div class="card-preview-expiry">
                                    <div class="card-preview-label">Expires</div>
                                    <div class="card-preview-value" id="preview-expiry-date">MM/YY</div>
                                </div>
                                <div class="card-preview-brand">
                                    <!-- Visual Card Brand Icon -->
                                    <svg viewBox="0 0 36 24" width="36" height="24" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" fill="#EB001B" opacity="0.85"/>
                                        <circle cx="24" cy="12" r="10" fill="#F79E1B" opacity="0.85"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                   
                    <form class="checkout-form" id="checkout-form" onsubmit="return false;">
                        <div class="form-group-row">
                            <div class="form-group">
                                <label for="cardholder-name" class="form-label">Cardholder Name</label>
                                <div class="input-wrapper">
                                    <input type="text" id="cardholder-name" name="cardholder-name" class="form-input" placeholder="e.g. John Doe" required>
                                </div>
                                
                                <span class="form-error">Please enter the cardholder name.</span>
                            </div>
                        </div>

                        <div class="form-group-row">
                            <div class="form-group">
                                <label for="card-number" class="form-label">Card Number</label>
                                <div class="input-wrapper">
                                    <input type="text" id="card-number" name="card-number" class="form-input" placeholder="4000 1234 5678 9010" maxlength="19" required>
                                    <span class="input-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                            <line x1="1" y1="10" x2="23" y2="10"></line>
                                        </svg>
                                    </span>
                                </div>
                                <span class="form-error">Please enter a valid card number.</span>
                            </div>
                        </div>

                        <div class="form-group-row grid-2col">
                            <div class="form-group">
                                <label for="expiry-date" class="form-label">Expiry Date</label>
                                <input type="text" id="expiry-date" name="expiry-date" class="form-input" placeholder="MM/YY" maxlength="5" required>
                                <span class="form-error">Invalid date.</span>
                            </div>
                            <div class="form-group">
                                <label for="cvv" class="form-label">CVV</label>
                                <input type="password" id="cvv" name="cvv" class="form-input" placeholder="•••" maxlength="4" required>
                                <span class="form-error">Invalid CVV.</span>
                            </div>
                        </div>

                        <div class="form-group-row grid-2col">
                            <div class="form-group">
                                <label for="email" class="form-label">Email Address</label>
                                <input type="email" id="email" name="email" class="form-input" placeholder="john.doe@example.com" required>
                                <span class="form-error">Please enter a valid email address.</span>
                            </div>
                            <div class="form-group">
                                <label for="phone" class="form-label">Phone Number <span class="optional-label">(Optional)</span></label>
                                <input type="tel" id="phone" name="phone" class="form-input" placeholder="+1 (555) 000-0000">
                                <span class="form-error">Please enter a valid phone number.</span>
                            </div>
                        </div>

                        <div class="form-group-row">
                            <div class="form-group">
                                <label for="shipping-address" class="form-label">Shipping Address</label>
                                <div class="input-wrapper">
                                    <input type="text" id="shipping-address" name="shipping-address" class="form-input" placeholder="e.g. 120 Luxury Avenue, Suite 400, New York, NY 10001" required>
                                </div>
                                <span class="form-error">Please enter the shipping address.</span>
                            </div>
                        </div>
                    </form>
                </div>

                
                <div class="checkout-col-right">
                    
                    
                    <div class="checkout-summary-card">
                        <h3 class="summary-card-title">Order Summary</h3>
                        
                    
                        <div class="checkout-summary-items" id="checkout-summary-items">
                    
                            <div class="checkout-item-row-placeholder">Items loading...</div>
                        </div>
                        
                        <div class="checkout-totals">
                            <div class="total-row">
                                <span class="total-label">Subtotal</span>
                    
                                <span class="total-value" id="checkout-subtotal">$0.00</span>
                            </div>
                            <div class="total-row">
                                <span class="total-label">Shipping</span>
                    
                                <span class="total-value" id="checkout-shipping">$free</span>
                            </div>
                            <div class="total-row">
                                <span class="total-label">VAT</span>
                    
                                <span class="total-value" id="checkout-tax">5%</span>
                            </div>
                            <div class="total-row grand-total-row">
                                <span class="total-label">Grand Total</span>
                    
                                <span class="total-value" id="checkout-total">$0.00</span>
                            </div>
                        </div>
                    </div>

                    
                    

            
                    <div class="payment-methods-card">
                        <span class="card-subheading">Accepted Payment Methods</span>
                        <div class="payment-icons-grid">
            
                            <div class="payment-icon-box" title="Visa">
                                <svg viewBox="0 0 36 24" width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="24" rx="3" fill="#0E4595"/>
                                    <path d="M12.5 15.5l1.2-5.5h1.9l-1.2 5.5H12.5z" fill="#FFFFFF"/>
                                    <path d="M19.8 10.3l-1.5 3.9-.2-.9c-.3-1.1-.9-1.9-1.9-2.3h3.6zm.9 5.2h1.6l-1.4-5.5h-1.6l-2.4 5.5h1.7l.4-.9h2.8l.2.9h-.3zm-10.4-5.2h1.9c.4 0 .7.2.8.6l1.7 4.9H13l-.3-.9H10.4l-.5.9H8.2l2.1-5.5z" fill="#FFFFFF"/>
                                    <path d="M26.5 10.3c-.6-.3-1.4-.4-2.1-.4-2.2 0-3.7 1-3.7 2.5 0 1.1.9 1.7 1.8 2.1.9.4 1.2.7 1.2 1.1 0 .6-.8.8-1.5.8-1 0-1.5-.2-2-.4l-.3-.1-.3 1.5c.5.2 1.3.4 2.2.4 2.3 0 3.8-1 3.8-2.6 0-1.2-1-1.8-1.9-2.2-.9-.4-1.2-.7-1.2-1.1 0-.4.5-.8 1.4-.8.7 0 1.2.1 1.6.3l.2.1.4-1.6z" fill="#F79E1B"/>
                                </svg>
                            </div>
            
                            <div class="payment-icon-box" title="Mastercard">
                                <svg viewBox="0 0 36 24" width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="24" rx="3" fill="#1A1A1A"/>
                                    <circle cx="14.5" cy="12" r="7.5" fill="#EB001B"/>
                                    <circle cx="21.5" cy="12" r="7.5" fill="#F79E1B" fill-opacity="0.85"/>
                                </svg>
                            </div>
            
                            <div class="payment-icon-box" title="Verve">
                                <svg viewBox="0 0 36 24" width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="24" rx="3" fill="#005B82"/>
                                    <path d="M8 8h5c1.5 0 2.5.8 2.5 2s-1 2-2.5 2H8V8zm2 1.5v1h3c.5 0 .8-.2.8-.5s-.3-.5-.8-.5h-3zm18-1.5h-5l-2 5h2l.4-1h2.2l.4 1h2l-2-5zm-3.6 2.5l.8-2 .8 2h-1.6z" fill="#EFA21D"/>
                                    <path d="M19 8l1.5 3 1.5-3h2l-2.5 5h-2L17 8h2z" fill="#FFFFFF"/>
                                </svg>
                            </div>
            
                            <div class="payment-icon-box" title="PayPal">
                                <svg viewBox="0 0 36 24" width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="24" rx="3" fill="#F2F5F8"/>
                                    <path d="M13 6.5h4c2.5 0 3.5 1 3.5 2.5s-1 2.5-3 2.5h-2l-.8 4h-2.5l1.8-9zm4 1.5H15l-.4 2.5h2c.8 0 1.2-.4 1.2-1s-.4-1.5-1.2-1.5z" fill="#003087"/>
                                    <path d="M15.5 8.5h4c2.5 0 3.5 1 3.5 2.5S22 13.5 20 13.5h-2l-.8 4h-2.5l1.8-9zm4 1.5h-2l-.4 2.5h2c.8 0 1.2-.4 1.2-1s-.4-1.5-1.2-1.5z" fill="#0079C1" opacity="0.8"/>
                                </svg>
                            </div>
            
                            <div class="payment-icon-box" title="Apple Pay">
                                <svg viewBox="0 0 36 24" width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="24" rx="3" fill="#FFFFFF" stroke="#E5E7EB"/>
                                    <path d="M13.5 15.5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm6-2c0-.5-.4-.9-.9-.9h-2.2v3.8h1c.5 0 .9-.4.9-.9V14.5c0-.6.4-1 .9-1.2zm6 0c0-.5-.4-.9-.9-.9H22.4v3.8h1c.5 0 .9-.4.9-.9V14.5c0-.6.4-1 .9-1.2z" fill="#000000"/>
                                    <path d="M14.5 9c-.5 0-1.1.3-1.4.7-.3-.4-.8-.7-1.4-.7-1.1 0-2 .9-2 2s.9 2 2 2c.6 0 1.1-.3 1.4-.7.3.4.8.7 1.4.7 1.1 0 2-.9 2-2s-.9-2-2-2zm-6 0c-.5 0-1.1.3-1.4.7-.3-.4-.8-.7-1.4-.7-1.1 0-2 .9-2 2s.9 2 2 2c.6 0 1.1-.3 1.4-.7.3.4.8.7 1.4.7 1.1 0 2-.9 2-2s-.9-2-2-2z" fill="#000000"/>
                                </svg>
                            </div>
            
                            <div class="payment-icon-box" title="Google Pay">
                                <svg viewBox="0 0 36 24" width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="24" rx="3" fill="#FFFFFF" stroke="#E5E7EB"/>
                                    <path d="M12.5 10c-1 0-1.8.8-1.8 1.8V15h1.2v-3.2c0-.4.3-.7.7-.7h1c.4 0 .7.3.7.7V15H15.5v-3.2c0-1-.8-1.8-1.8-1.8h-1.2z" fill="#5F6368"/>
                                    <path d="M21 10.3c-.6-.3-1.4-.4-2.1-.4-1.5 0-2.5.8-2.5 2.1s1 1.8 2.1 2.1c1.1.3 1.4.5 1.4.8s-.3.7-.8.7c-.5 0-.9-.1-1.3-.3l-.4-.2-.3 1c.4.2 1 .3 1.7.3 1.5 0 2.5-.8 2.5-2.1s-1-1.8-2.1-2.1c-1.1-.3-1.4-.5-1.4-.8s.3-.7.8-.7c.5 0 .9.1 1.2.3l.3.2.4-1z" fill="#4285F4"/>
                                </svg>
                            </div>
                        </div>
                    </div>


                    <div class="checkout-security-card">
                        <div class="security-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <span>256-bit SSL Protection</span>
                        </div>
                        <div class="security-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                            <span>Secure Card Processing</span>
                        </div>
                    </div>
                </div>
            </div>

            
            <div class="checkout-footer">
            
                <button onclick = "cancelPayment()" type="button" class="btn btn-checkout-cancel" id="cancel-payment">Cancel</button>
            
                <button onclick = "confirmCheckoutPayment()" type="button" class="btn btn-checkout-confirm" id="confirm-payment">Confirm Payment</button>
            </div>
        </div>
        `;

        
        let summary = document.getElementById("checkout-summary-items");
        if (summary) {
            summary.innerHTML = "";
            cart.forEach(product => {
                summary.innerHTML += `
                    <div class="checkout-summary-item">
                        <img src="${product.thumbnail}" alt="${product.title}" class="checkout-item-img">
                        <div class="checkout-item-details">
                            <span class="checkout-item-name">${product.title}</span>
                            <span class="checkout-item-meta">Brand: ${product.brand}</span>
                        </div>
                        <span class="checkout-item-price">$${product.price}</span>
                    </div>
                `;
            });
        }
        

    
        let subtotal = document.getElementById("checkout-subtotal");
        let shipping = document.getElementById("checkout-shipping");
        let tax = document.getElementById("checkout-tax");
        let grandTotal = document.getElementById("checkout-total");

        let couponInput = document.getElementById("coupon-input");
        let couponVal = couponInput ? couponInput.value.trim().toUpperCase() : "";

        let subtotalVal = parseFloat(finalPrice);
        if (couponVal === "AURA10" || couponVal === "ILOVEJS10" || couponVal === "DISCOUNT10") {
            subtotalVal = subtotalVal * 0.9;
        }

        let vatVal = subtotalVal * 0.05;
        let grandTotalVal = subtotalVal + vatVal;

        if (subtotal) {
            subtotal.innerHTML = `$${subtotalVal.toFixed(2)}`;
        }
        if (shipping) {
            shipping.innerHTML = "Free";
        }
        if (tax) {
            tax.innerHTML = `$${vatVal.toFixed(2)}`;
        }
        if (grandTotal) {
            grandTotal.innerHTML = `$${grandTotalVal.toFixed(2)}`;
        }
    }
}
function openFilter() {
    document.getElementById('search-overlay').classList.add('open')
}

function closeSearch(params) {
    document.getElementById('search-overlay').classList.remove('open');
}

function search() {
    let searchInput = document.getElementById("search-query");
  let searchTerm = searchInput.value.toLowerCase().trim();
  console.log(allApiProducts);
  

  let filteredProducts = allApiProducts.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm);
  });
  console.log(filteredProducts);
  if (!filteredProducts || filteredProducts.length === 0) {
    document.getElementById("search-results-box").style.display = 'block'
    document.getElementById("search-results-box").innerHTML = `
    <div class="search-empty-state">
    <div class="search-empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" width="48" height="48">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
    </div>
    <h3 class="search-empty-title">No Curated Results</h3>
    <p class="search-empty-desc">We couldn't find any luxury provisions matching your search query. Try checking your spelling or search for categories like "beauty", "honey", "sofa", or "perfume".</p>
</div>
    `
  } else {
    document.getElementById("search-results-box").style.display = 'block'
    
    filteredProducts.forEach((product, index) => {
    document.getElementById("search-results-box").innerHTML  += `
      <a onclick = "viewDetails(${product.id}); event.preventDefault();" href="javascript:void(0)" class="search-result-row" data-id="PRODUCT_ID">
    <div class="search-result-image-wrapper">
        <img src="${product.thumbnail}" alt="PRODUCT_TITLE" class="search-result-thumbnail">
    </div>
    <div class="search-result-metadata">
        <span class="search-result-category">${product.category}</span>
        <h4 class="search-result-name">${product.title}</h4>
    </div>
    <div class="search-result-price-wrapper">
        <span class="search-result-price">$${product.price}</span>
    </div>
</a>
    `;
  });
  }


}
function closeCheckout() {
    document.getElementById("checkout-overlay").style.display = "none";
}
function cancelPayment() {
    confirm("Are you sure you want to cancel the payment?")
    closeCheckout();
}
function confirmCheckoutPayment(params) {
    let cardholderName = document.getElementById("cardholder-name").value;
    let cardNumber = document.getElementById("card-number").value;
    let expiryDate = document.getElementById("expiry-date").value;
    let cvv = document.getElementById("cvv").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let shippingAddress = document.getElementById("shipping-address").value;

    if (!cardholderName || !cardNumber || !expiryDate || !cvv || !email || !shippingAddress) {
        alert("Please fill in all required fields.");
        return;
    }
    if (!isNaN(cardholderName)) {
        alert("Please enter a valid cardholder name.");
        return;
    }
    if (cardNumber.length < 16 || cardNumber.length > 19) {
        alert("Please enter a valid card number.");
        return;
    }
    if (expiryDate.length !== 5 || !expiryDate.includes("/"))  {
        alert("Please enter a valid expiry date in MM/YY format.");
        return;   
    }
    if (cvv.length < 3 || cvv.length > 3) {
        alert("Please enter a valid CVV.");
        return;
    }
    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address.");
        return;
    }
    if (shippingAddress.trim().length < 8) {
        alert("Please enter a valid, complete shipping address.");
        return;
    }

    
    // Generate order ID and dates
    let randomNum = Math.floor(100000 + Math.random() * 900000);
    let orderId = "AURA-" + randomNum;
    let OrderNumber = "#" + orderId;

    let today = new Date();
    let deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + 4);
    
    let options = { month: "short", day: "numeric", year: "numeric" };
    let DeliveryDate = deliveryDate.toLocaleDateString("en-US", options);

    // Calculate order summary totals
    let couponInput = document.getElementById("coupon-input");
    let couponVal = couponInput ? couponInput.value.trim().toUpperCase() : "";

    let totalProductPrice = 0;
    cart.forEach(product => {
        totalProductPrice += parseFloat(product.price || 0);
    });

    let discountAmt = 0;
    if (couponVal === "AURA10" || couponVal === "ILOVEJS10" || couponVal === "DISCOUNT10") {
        discountAmt = totalProductPrice * 0.1;
    }

    let subtotalVal = totalProductPrice;
    let subtotalAfterDiscount = subtotalVal - discountAmt;
    let vatVal = subtotalAfterDiscount * 0.05;
    let grandTotalVal = subtotalAfterDiscount + vatVal;

    let cleanCardNumber = cardNumber.replace(/\s/g, '');
    let last4 = cleanCardNumber.slice(-4) || "4242";

    // Build complete order object with checkout shipping address, items, and totals
    let newOrder = {
        id: orderId,
        orderNumber: OrderNumber,
        orderDate: today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        deliveryDate: DeliveryDate,
        shippingMethod: "Courier Express Delivery (Tracked)",
        trackingNumber: "TRK-" + Math.floor(10000000 + Math.random() * 90000000) + "-US",
        status: "Processing",
        shippingAddress: {
            name: cardholderName,
            address: shippingAddress,
            phone: phone || "+1 (555) 0199",
            email: email
        },
        paymentMethod: {
            brand: "Visa",
            last4: last4,
            cardholderName: cardholderName,
            transactionId: "Auth_" + Math.floor(100000 + Math.random() * 900000),
            paymentDate: today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " | " + today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
            paymentStatus: "Authorized & Paid"
        },
        items: JSON.parse(JSON.stringify(cart)),
        totals: {
            subtotal: subtotalVal.toFixed(2),
            shipping: "0.00",
            shippingText: "$0.00 (Free Shipping)",
            tax: vatVal.toFixed(2),
            discount: discountAmt.toFixed(2),
            discountCode: couponVal,
            grandTotal: grandTotalVal.toFixed(2)
        }
    };

    // Save order details to localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("orderDetails", JSON.stringify(newOrder));
    localStorage.setItem("latestOrder", JSON.stringify(newOrder));
    localStorage.setItem("orderItems", JSON.stringify(newOrder.items));
    localStorage.setItem("shippingAddressData", JSON.stringify(newOrder.shippingAddress));

    // 3. Fallback: Create success-modal container if it doesn't exist in HTML
    let successModal = document.getElementById("success-modal");
    if (!successModal) {
        successModal = document.createElement("div");
        successModal.id = "success-modal";
        successModal.className = "success-overlay";
        document.body.appendChild(successModal);
    }

    // 4. Populate and display the success modal
    document.getElementById("checkout-overlay").style.display = "none";
    successModal.style.display = "block";
    successModal.innerHTML = `
        <div class="success-modal-card">
            <div class="success-icon-wrapper">
                <div class="success-checkmark-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="48" height="48">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
            </div>
            
            <h2 id="success-title" class="success-title">Payment Successful</h2>
            <p class="success-message">Thank you for your purchase. Your order has been placed successfully and is being processed.</p>
            
            <div class="success-details-box">
                <div class="detail-item">
                    <span class="detail-label">Order Number</span>
                    <span class="detail-value" id="order-number">${OrderNumber}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Estimated Delivery</span>
                    <span class="detail-value" id="delivery-date">${DeliveryDate}</span>
                </div>
            </div>
            
            <div class="success-actions">
                <a href="shop.html" class="btn btn-success-continue" id="continue-shopping">Continue Shopping</a>
                <a href="view-order.html" onclick="viewOrder('${orderId}'); event.preventDefault();" class="btn btn-success-view" id="view-order">View Order</a>
            </div>
        </div>
    `;

    // 5. Clear the cart upon successful payment
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // 6. Refresh cart displays and header badges
    if (typeof updateBadges === "function") {
        updateBadges();
    }
    displayCart();
    calculateTotalPrice();
}
