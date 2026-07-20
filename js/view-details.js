cart = JSON.parse(localStorage.getItem("cart")) || [];
let productDetails = JSON.parse(localStorage.getItem("productDetails")) || [];
allApiProducts = JSON.parse(localStorage.getItem("allApiProducts")) || [];
let DisplayPage = document.getElementById("page");
console.log(cart);


function displayProductDetails() {
    if (!productDetails) {
        DisplayPage.innerHTML = "<p>No product details found.</p>";
        return;
    }
    DisplayPage.innerHTML =
        `
        <main class="container">
            <div class="product-details-layout">
            
            <!-- LEFT COLUMN: Product Gallery & Badges -->
            <div class="product-gallery-container">
                <div class="product-featured-media" id="product-image-container">
                    <div class="product-gallery-badges">
                        <span class="badge-item badge-item-new">${productDetails.warrantyInformation}</span>
                        <span class="badge-item badge-item-sale">${productDetails.returnPolicy}</span>
                        <span class="badge-item badge-item-bestseller">${productDetails.stock}</span>
                        <span class="badge-item badge-item-limited">${productDetails.minimumOrderQuantity}</span>
                    </div>
                    <img src="${productDetails.thumbnail}" alt="${productDetails.title}" class="product-featured-img" id="product-main-image">
                </div>

            </div>

            <!-- RIGHT COLUMN: Product Information -->
            <div class="product-info-container">
                <div class="product-meta-header">
                    <span class="product-meta-brand" id="product-brand">AURA</span>
                    <span>&bull;</span>
                    <span id="product-category">${productDetails.brand}</span>
                </div>
                <h1 class="product-main-title" id="product-name">${productDetails.title}</h1>

                <div class="product-rating-wrapper">
                    <div class="rating-stars-list" id="product-rating-stars" aria-label="Rating: 4.8 out of 5 stars">
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                    </div>
                    <span class="rating-reviews-count" id="product-review-count">(${productDetails.rating})</span>
                    <span>|</span>
                    <span class="rating-availability" id="product-stock-status">${productDetails.availabilityStatus}</span>
                    <span class="rating-sku" id="product-sku">${productDetails.sku}</span>
                </div>

                <div class="product-price-section">
                    <span class="price-current-large" id="product-price">$${(productDetails.price - (productDetails.discountPercentage / 100) * productDetails.price).toFixed(2)}</span>
                    <span class="price-old-large" id="product-old-price">$${productDetails.price}</span>
                    <span class="price-discount-badge" id="product-discount">-${productDetails.discountPercentage}%</span>
                </div>

                <p class="product-short-description">
                    ${productDetails.description}
                </p>


                <!-- Quantity & Add to Cart -->
                <div class="quantity-actions-layout">
                    <!-- <div class="quantity-selector">
                        <button class="qty-btn" aria-label="Decrease quantity">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                        <span class="qty-display" id="product-quantity-display">1</span>
                        <button class="qty-btn" aria-label="Increase quantity">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </div> -->
                    <div class="quantity-selector">
                        <label for="product-quantity" class="qty-label">Quantity:</label>
                        <input type="number" id="product-quantity" name="product-quantity" min="1" value="1">
                    </div>
                    
                    <div class="action-buttons-grid" style="flex-grow: 1;">
                        <button class="btn btn-primary" id="add-to-cart-btn" onclick = "addToCart(${productDetails.id})">Add to Cart</button>
                        <button class="btn btn-accent" id="buy-now-btn">Buy Now</button>
                    </div>
                </div>

                <!-- Secondary actions (wishlist, compare, share) -->
                <div class="secondary-actions-list">
                    <button class="sec-action-btn" id="wishlist-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        <span>Add to Wishlist</span>
                    </button>
                    <button class="sec-action-btn" id="compare-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"></svg>
                        <span>Compare</span>
                    </button>
                    <button class="sec-action-btn" id="share-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        <span>Share</span>
                    </button>
                </div>

                <!-- Trust Badges -->
                <div class="trust-badges-grid">
                    <div class="trust-badge-card">
                        <div class="trust-badge-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <div class="trust-badge-text">Secure checkout</div>
                    </div>
                    <div class="trust-badge-card">
                        <div class="trust-badge-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                        </div>
                        <div class="trust-badge-text">Free Delivery</div>
                    </div>
                    <div class="trust-badge-card">
                        <div class="trust-badge-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                        </div>
                        <div class="trust-badge-text">Easy Returns</div>
                    </div>
                    <div class="trust-badge-card">
                        <div class="trust-badge-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        </div>
                        <div class="trust-badge-text">2 Yr Warranty</div>
                    </div>
                </div>

            </div>
        </div>

        <!-- ==========================================================================
           4. PRODUCT DESCRIPTION
           ========================================================================== -->
        <section class="product-tabs-section" id="product-description">
            <div class="section-title-wrapper">
                <h2 class="section-title">${productDetails.description}</h2>
            </div>
          <!--  <div class="tabs-content">
                <div class="description-text">
                    <p>Designed for athletes and style enthusiasts alike, the AURA Air Zoom Minimalist Sneakers bring an ultra-premium knit texture and robust engineering to your daily routine. Crafted with sustainable practices, the lightweight yarn matches the natural shape of your foot, feeling like a second skin while offering targeted support and structure.</p>
                    <p>Underfoot, the responsive Zoom Air unit returns energy with every stride, absorbing impact and transforming it into effortless propulsion. Whether you're navigating urban streets, heading to a high-performance training session, or matching them with casual apparel, AURA delivers unmatched simplicity and structural durability.</p>
                    
                    <h3 style="font-size: 1.15rem; margin: 24px 0 12px 0;">Key Feature Highlights</h3>
                    <ul class="description-features">
                        <li>Ultra-breathable FlyKnit engineered mesh structure for continuous airflow.</li>
                        <li>Anatomical heel cradle reduces friction and protects tendons.</li>
                        <li>Low-profile Zoom Air midsole cushion inserts.</li>
                        <li>High-durability gum rubber outsole segments for multi-surface traction.</li>
                        <li>Eco-conscious assembly using recycled fibers.</li>
                        <li>Reflective micro-panels on tabs for enhanced visibility.</li>
                    </ul>
                </div>
            </div> -->
        </section>

        <!-- ==========================================================================
           5. PRODUCT SPECIFICATIONS
           ========================================================================== -->
        <section class="product-tabs-section" id="product-specifications">
            <div class="section-title-wrapper">
                <h2 class="section-title">Specifications</h2>
            </div>
            <div class="specs-table-wrapper">
                <table class="specs-table" id="specifications-table">
                    <tbody>
                        <tr>
                            <td class="specs-label">Brand</td>
                            <td class="specs-val">AURA ${productDetails.brand}</td>
                        </tr>
                        <tr>
                            <td class="specs-label">Title</td>
                            <td class="specs-val">AURA ${productDetails.title}</td>
                        </tr>
                        <tr>
                            <td class="specs-label">Weight</td>
                            <td class="specs-val">280g (${productDetails.weight})</td>
                        </tr>
                        <tr>
                            <td class="specs-label">Dimensions</td>
                            <td class="specs-val">${productDetails.dimensions.width} x ${productDetails.dimensions.height} x ${productDetails.dimensions.depth}</td>
                        </tr>
                        <tr>
                            <td class="specs-label">Tags</td>
                            <td class="specs-val">${productDetails.tags}</td>
                        </tr>
                        <tr>
                            <td class="specs-label">Category</td>
                            <td class="specs-val">${productDetails.category}</td>
                        </tr>
                        <tr>
                            <td class="specs-label">Warranty</td>
                            <td class="specs-val">${productDetails.warrantyInformation}</td>
                        </tr>
                        <tr>
                            <td class="specs-label">Stock</td>
                            <td class="specs-val">${productDetails.stock}</td>
                        </tr>
                        <tr>
                            <td class="specs-label">MOQ</td>
                            <td class="specs-val">${productDetails.minimumOrderQuantity}</td>
                        </tr>
                        <tr>
                            <td class="specs-label">SKU</td>
                            <td class="specs-val">${productDetails.sku}</td>
                        </tr>
                        <tr>
                            <td class="specs-label">Shipping</td>
                            <td class="specs-val">${productDetails.shippingInformation}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- ==========================================================================
           6. SHIPPING & RETURNS
           ========================================================================== -->
        <section class="product-tabs-section" id="product-shipping">
            <div class="section-title-wrapper">
                <h2 class="section-title">Shipping & Returns</h2>
            </div>
            <div class="shipping-cards-grid">
                <!-- Card 1 -->
                <div class="shipping-info-card">
                    <div class="shipping-card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                    </div>
                    <h3 class="shipping-card-title">Free Shipping</h3>
                    <p class="shipping-card-desc">Complimentary shipping on all orders over $150. Safe, contactless shipping directly to your doorstep.</p>
                </div>
                <!-- Card 2 -->
                <div class="shipping-info-card">
                    <div class="shipping-card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <h3 class="shipping-card-title">Delivery Time</h3>
                    <p class="shipping-card-desc">Standard deliveries take 3-5 business days. Express shipping options available at checkout (1-2 days).</p>
                </div>
                <!-- Card 3 -->
                <div class="shipping-info-card">
                    <div class="shipping-card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></svg>
                    </div>
                    <h3 class="shipping-card-title">Hassle-Free Returns</h3>
                    <p class="shipping-card-desc">Not the perfect fit? Return any unworn items within 30 days for a full refund. Pre-paid label included.</p>
                </div>
            </div>
        </section>

        <!-- ==========================================================================
           7. CUSTOMER REVIEWS
           ========================================================================== -->
        <section class="product-tabs-section" id="reviews-section">
            <div class="section-title-wrapper">
                <h2 class="section-title">Customer Reviews</h2>
            </div>
            
            <div class="reviews-layout">
                <!-- Summary Card -->
                <div class="reviews-summary-card">
                    <div class="summary-score-large">4.8</div>
                    <div class="summary-stars-wrapper" aria-label="4.8 out of 5 stars">
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                    </div>
                    <div class="summary-label">Based on 124 Reviews</div>
                    
                    <div class="distribution-list">
                        <!-- 5 Star -->
                        <div class="distribution-row">
                            <span class="dist-stars">5 Star</span>
                            <div class="dist-bar-track"><div class="dist-bar-fill" style="width: 82%;"></div></div>
                            <span class="dist-percentage">82%</span>
                        </div>
                        <!-- 4 Star -->
                        <div class="distribution-row">
                            <span class="dist-stars">4 Star</span>
                            <div class="dist-bar-track"><div class="dist-bar-fill" style="style: width; width: 12%;"></div></div>
                            <span class="dist-percentage">12%</span>
                        </div>
                        <!-- 3 Star -->
                        <div class="distribution-row">
                            <span class="dist-stars">3 Star</span>
                            <div class="dist-bar-track"><div class="dist-bar-fill" style="width: 4%;"></div></div>
                            <span class="dist-percentage">4%</span>
                        </div>
                        <!-- 2 Star -->
                        <div class="distribution-row">
                            <span class="dist-stars">2 Star</span>
                            <div class="dist-bar-track"><div class="dist-bar-fill" style="width: 1%;"></div></div>
                            <span class="dist-percentage">1%</span>
                        </div>
                        <!-- 1 Star -->
                        <div class="distribution-row">
                            <span class="dist-stars">1 Star</span>
                            <div class="dist-bar-track"><div class="dist-bar-fill" style="width: 1%;"></div></div>
                            <span class="dist-percentage">1%</span>
                        </div>
                    </div>
                </div>

                <div class="reviews-list-container" id="reviews-list"></div>
            </div>
        </section>

        
        <!-- ==========================================================================
           9. RECENTLY VIEWED PRODUCTS (4 COMPACT CARDS)
           ========================================================================== -->
        <!-- <section class="product-tabs-section" id="recently-viewed-section">
            <div class="section-title-wrapper">
                <h2 class="section-title" style="font-size: 1.35rem; padding-bottom: 8px;">Recently Viewed</h2>
            </div>
            
            <div class="recently-viewed-grid" id="recently-viewed-container">
                <!-- Mini Card 1: Smartwatch -->
                <article class="recent-product-card">
                    <div class="recent-media">
                        <img src="images/products/smartwatch.png" alt="Smartwatch" class="recent-img">
                    </div>
                    <div class="recent-info">
                        <h4 class="recent-name">Active Sport Smartwatch</h4>
                        <span class="recent-price">$199.00</span>
                    </div>
                </article>

                <!-- Mini Card 2: Watch -->
                <article class="recent-product-card">
                    <div class="recent-media">
                        <img src="images/products/watch.png" alt="Classic Watch" class="recent-img">
                    </div>
                    <div class="recent-info">
                        <h4 class="recent-name">Classic Chronograph Watch</h4>
                        <span class="recent-price">$220.00</span>
                    </div>
                </article>

                <!-- Mini Card 3: Bag -->
                <article class="recent-product-card">
                    <div class="recent-media">
                        <img src="images/products/bag.png" alt="Leather Tote Bag" class="recent-img">
                    </div>
                    <div class="recent-info">
                        <h4 class="recent-name">Minimalist Leather Tote Bag</h4>
                        <span class="recent-price">$185.00</span>
                    </div>
                </article>

                <!-- Mini Card 4: Sneakers -->
                <article class="recent-product-card">
                    <div class="recent-media">
                        <img src="images/products/sneakers.png" alt="Air Zoom Sneakers" class="recent-img">
                    </div>
                    <div class="recent-info">
                        <h4 class="recent-name">Minimalist Sneakers</h4>
                        <span class="recent-price">$140.00</span>
                    </div>
                </article>
            </div>
        </section> 

    </main>`
}
displayProductDetails();
displayReviews();
function displayReviews() {
    let reviewsListContainer = document.getElementById("reviews-list");
    // console.log(productDetails.reviews);

    if (!productDetails.reviews || productDetails.reviews.length === 0) {
        reviewsListContainer.innerHTML = "<p>No reviews available.</p>";
        return;
    }
    let displayReview = productDetails.reviews.map(review => {
        return `
        <article class="review-card">
                        <div class="review-header">
                            <div class="review-avatar">ET</div>
                            <div>
                                <div class="review-user-name">${review.reviewerName}</div>
                                <span class="review-verified-badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    Verified Purchase
                                </span>
                            </div>
                            <span class="review-meta">${review.date}</span>
                        </div>
                        <div class="review-rating-row">
                            <div class="rating-stars-list" aria-label="5 Stars">
                                <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                            </div>
                        </div>
                        <p class="review-text-body">
                            ${review.comment}
                        </p>
                        <button class="review-helpful-action" aria-label="Mark review as helpful">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></svg>
                            <span>Helpful (9)</span>
                        </button>
                    </article>`
    }).join("");
    reviewsListContainer.innerHTML += displayReview;
    // console.log(reviewsListContainer.innerHTML);
}

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

// Mobile Navigation Drawer Toggle
document.addEventListener("DOMContentLoaded", () => {
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
    
    // Close mobile menu when clicking outside the drawer
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
});

