cart = JSON.parse(localStorage.getItem("cart")) || [];
wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
let wishlistDisplay = document.getElementById("wishlist-grid")


function displayWishlist() {
     if (!wishlist || wishlist.length === 0) {
          wishlistDisplay.innerHTML = ` <div class="wishlist-empty-container" id="wishlist-empty-state" style="display: block;">
                <div class="wishlist-empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" width="80" height="80">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </div>
                <h2 class="wishlist-empty-title">Your Wishlist is Empty</h2>
                <p class="wishlist-empty-desc">Discover our curated collection of luxury products and add items to your selection.</p>
                <a href="shop.html" class="btn btn-primary wishlist-shop-btn">Explore Catalog</a>
            </div>`;
        return;
     }
      wishlist.forEach((product, index) => {
      wishlistDisplay.innerHTML += `
      <article class="wishlist-card" data-id="1">
                    <button onclick= "remove(${product.id})" class="wishlist-remove-btn" aria-label="Remove Item" data-product-id="1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <div class="wishlist-media">
                        <img src="${product.thumbnail}" alt="${product.title}" class="wishlist-img">
                    </div>
                    <div class="wishlist-details">
                        <span class="wishlist-item-cat">${product.category}</span>
                        <h3 class="wishlist-item-name"><a onclick="viewDetails(${product.id}); event.preventDefault();" href="">${product.title}</a></h3>
                        <div class="wishlist-price-row">
                            <span class="wishlist-item-price">${product.price}</span>
                            <span class="wishlist-stock-status in-stock">${product.availabilityStatus}</span>
                        </div>
                        <button onclick="addToCart(${product.id})" class="btn btn-primary wishlist-add-cart-btn" data-product-id="1">Add to Cart</button>
                    </div>
                </article>
    `;
  });
}
displayWishlist()
function addToCart(productId) {
    let alreadyInCart = cart.some(product => product.id === productId);
    let cartProduct = allApiProducts.find(product => product.id === productId);
    if (alreadyInCart) {
        alert("Product already added!");
        return;
    }
    if (!cartProduct) {
        alert("Product not found!");
        return;
    }
    console.log(cartProduct);
    cart.push(cartProduct);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
}
function remove(productId) {
    wishlist.splice(cart.findIndex(product => product.id === productId), 1);
    wishlistDisplay.innerHTML = "";
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    displayWishlist();
}