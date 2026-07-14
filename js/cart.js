let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartContainer = document.getElementById("cart-items-container");
let quantity = document.getElementById("quantity-input");
console.log(cart);


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
function remove(productId) {
    cart.splice(cart.findIndex(product => product.id === productId), 1);
    cartContainer.innerHTML = "";
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart()
    noOfItemsInCart();
}
function noOfItemsInCart() {
    document.getElementById("cart-count-subtitle").innerText = `You have ${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart.`;
}
noOfItemsInCart();