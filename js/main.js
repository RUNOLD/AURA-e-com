let allApiProducts = JSON.parse(localStorage.getItem("allApiProducts")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Global event handlers for inline onclick triggers
function viewDetails(productId) {
    const product = allApiProducts.find(p => p.id === productId);
    if (product) {
        localStorage.setItem("productDetails", JSON.stringify(product));
        window.location.href = "view-details.html";
    }
}

function viewOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = orders.find(o => o.id === orderId || o.orderNumber === orderId || o.orderNumber === "#" + orderId);
    if (order) {
        localStorage.setItem("orderDetails", JSON.stringify(order));
    }
    window.location.href = "view-order.html";
}

function addToCart(productId) {
    const alreadyInCart = cart.some(p => p.id === productId);
    const product = allApiProducts.find(p => p.id === productId);

    if (alreadyInCart) {
        alert("Product already added to cart!");
        return;
    }

    if (!product) {
        alert("Product not found!");
        return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
    updateBadges();
}

function addToWishlist(productId) {
    const alreadyInWishlist = wishlist.some(p => p.id === productId);
    const product = allApiProducts.find(p => p.id === productId);

    if (alreadyInWishlist) {
        alert("Product already added to wishlist!");
        return;
    }

    if (!product) {
        alert("Product not found!");
        return;
    }

    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Product added to wishlist!");
    updateBadges();
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

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggles
    const mobileMenuTrigger = document.getElementById("mobile-menu-trigger");
    const mobileMenuClose = document.getElementById("mobile-menu-close");
    const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
    
    if (mobileMenuTrigger && mobileNavOverlay) {
        mobileMenuTrigger.addEventListener("click", () => {
            mobileNavOverlay.classList.add("open");
            mobileMenuTrigger.setAttribute("aria-expanded", "true");
        });
    }
    
    if (mobileMenuClose && mobileNavOverlay) {
        mobileMenuClose.addEventListener("click", () => {
            mobileNavOverlay.classList.remove("open");
            if (mobileMenuTrigger) {
                mobileMenuTrigger.setAttribute("aria-expanded", "false");
            }
        });
    }
    
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener("click", (e) => {
            if (e.target === mobileNavOverlay) {
                mobileNavOverlay.classList.remove("open");
                if (mobileMenuTrigger) {
                    mobileMenuTrigger.setAttribute("aria-expanded", "false");
                }
            }
        });
    }

    // 2. Fetch and Load Homepage Products
    updateBadges();

    // Fetch products
    fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(data => {
            allApiProducts = data.products || [];
            localStorage.setItem("allApiProducts", JSON.stringify(allApiProducts));
            populateHomepageProducts(allApiProducts);
        })
        .catch(err => {
            console.error("Error fetching homepage products:", err);
            const stored = localStorage.getItem("allApiProducts");
            if (stored) {
                allApiProducts = JSON.parse(stored);
                populateHomepageProducts(allApiProducts);
            }
        });

    function populateHomepageProducts(products) {
        const productsContainer = document.getElementById("products-grid");
        if (!productsContainer) return;

        productsContainer.innerHTML = "";

        // Loop through first 8 products
        const productsToShow = products.slice(0, 8);
        productsToShow.forEach((product) => {
            const discountedPrice = product.price - (product.discountPercentage / 100) * product.price;

            productsContainer.innerHTML += `
              <article class="product-card">
                  <div class="product-media">
                      <div class="product-badges">
                          <span class="product-badge badge-new">${product.availabilityStatus}</span>
                      </div>
                      <img src="${product.thumbnail}" alt="${product.title}" class="product-img" loading="lazy">
                      
                      <!-- Hover Actions Overlay -->
                      <div class="product-hover-actions">
                          <button onclick="addToWishlist(${product.id})" class="hover-action-btn" aria-label="Add to Wishlist">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                          </button>
                          <button onclick="viewDetails(${product.id})" class="hover-action-btn" aria-label="Quick View">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                          </button>
                          <button class="hover-action-btn" aria-label="Compare Product">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"></svg>
                          </button>
                      </div>
                      
                      <!-- Add to Cart Overlay Action -->
                      <div class="product-bottom-action">
                          <button class="add-cart-overlay-btn" onclick= "addToCart(${product.id})">Add to Cart</button>
                      </div>
                  </div>
                  <div class="product-details">
                      <span class="product-cat">${product.category}</span>
                      <h3 class="product-name"><a href="#product-detail" onclick="viewDetails(${product.id}); event.preventDefault();">${product.title.length <= 25 ? product.title : product.title.slice(0, 25) + "..."}</a></h3>
                      <div class="product-rating">
                          <div class="rating-stars" aria-label="Rating: 5 out of 5 stars">
                              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                          </div>
                          <span class="rating-count">${product.rating}</span>
                      </div>
                      <div class="product-price-wrapper">
                          <span class="price-current">$${discountedPrice.toFixed(2)}</span>
                      </div>
                  </div>
              </article>
            `;
        });
    }
});

function openFilter() {
    document.getElementById('search-overlay').classList.add('open')
}

function closeSearch() {
    document.getElementById('search-overlay').classList.remove('open');
}

function search() {
    let searchInput = document.getElementById("search-query");
    let searchTerm = searchInput.value.toLowerCase().trim();
    let resultsBox = document.getElementById("search-results-box");
    
    resultsBox.innerHTML = "";
    
    let filteredProducts = allApiProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchTerm);
    });

    if (!filteredProducts || filteredProducts.length === 0) {
        resultsBox.style.display = 'block';
        resultsBox.innerHTML = `
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
        </div>`;
    } else {
        resultsBox.style.display = 'block';
        filteredProducts.forEach((product) => {
            resultsBox.innerHTML += `
            <a onclick="viewDetails(${product.id}); event.preventDefault();" href="javascript:void(0)" class="search-result-row">
                <div class="search-result-image-wrapper">
                    <img src="${product.thumbnail}" alt="${product.title}" class="search-result-thumbnail">
                </div>
                <div class="search-result-metadata">
                    <span class="search-result-category">${product.category}</span>
                    <h4 class="search-result-name">${product.title}</h4>
                </div>
                <div class="search-result-price-wrapper">
                    <span class="search-result-price">$${product.price}</span>
                </div>
            </a>`;
        });
    }
}