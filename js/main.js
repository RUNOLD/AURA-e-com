 
let allApiProducts = JSON.parse(localStorage.getItem("allApiProducts")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function viewDetails(productId) {
        const product = allApiProducts.find(p => p.id === productId);
        if (product) {
            localStorage.setItem("productDetails", JSON.stringify(product));
            window.location.href = "view-details.html";
        }
    }
    // console.log(allApiProducts);

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

    // 2. Fetch and Load Homepage Products
    
    
    // Update badges on load
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
            // Attempt to load from localStorage if offline or failed
            const stored = localStorage.getItem("allApiProducts");
            if (stored) {
                allApiProducts = JSON.parse(stored);
                populateHomepageProducts(allApiProducts);
            }
        });

    function populateHomepageProducts(products) {
        if (!products || products.length === 0) return;

        // Loop through 8 cards
        for (let i = 1; i <= 8; i++) {
            const card = document.getElementById(`prod-card-${i}`);
            if (!card) continue;

            const product = products[i - 1];
            if (!product) continue;

            // Update Image
            const img = card.querySelector(".product-img");
            if (img) {
                img.src = product.thumbnail;
                img.alt = product.title;
            }

            // Update Category
            const cat = card.querySelector(".product-cat");
            if (cat) {
                cat.innerText = product.category.charAt(0).toUpperCase() + product.category.slice(1);
            }

            // Update Title
            const titleLink = card.querySelector(".product-name a");
            if (titleLink) {
                titleLink.innerText = product.title.length <= 25 ? product.title : product.title.slice(0, 25) + "...";
                titleLink.href = "#product-detail";
                titleLink.addEventListener("click", (e) => {
                    e.preventDefault();
                    viewDetails(product.id);
                });
            }

            // Update Rating Count
            const ratingSpan = card.querySelector(".rating-count");
            if (ratingSpan) {
                ratingSpan.innerText = `(${product.rating})`;
            }

            // Update Price (Discounted)
            const priceSpan = card.querySelector(".price-current");
            if (priceSpan) {
                const discountedPrice = product.price - (product.discountPercentage / 100) * product.price;
                priceSpan.innerText = `$${discountedPrice.toFixed(2)}`;
            }

            // Add to Cart Button Listener
            const addToCartBtn = card.querySelector(".overlay-add-cart-btn");
            if (addToCartBtn) {
                // Clear any inline event listeners and add our dynamic one
                const newBtn = addToCartBtn.cloneNode(true);
                addToCartBtn.parentNode.replaceChild(newBtn, addToCartBtn);
                newBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    addToCart(product.id);
                });
            }

            // Quick View Button Listener
            const quickViewBtn = card.querySelector(".overlay-quickview-btn");
            if (quickViewBtn) {
                const newBtn = quickViewBtn.cloneNode(true);
                quickViewBtn.parentNode.replaceChild(newBtn, quickViewBtn);
                newBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    viewDetails(product.id);
                });
            }
        }
    }

    function addToCart(productId) {
        
        const alreadyInCart = cart.some(p => p.id === productId);
        const product = allApiProducts.find(p => p.id === productId);

        if (alreadyInCart) {
            alert("Product already added!");
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

    

    function updateBadges() {
        const cartBadge = document.getElementById("cart-badge");
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cartBadge) {
            cartBadge.innerText = currentCart.length;
        }
        const mobileCartLink = document.querySelector('a[href="cart.html"] .badge');
        if (mobileCartLink) {
            mobileCartLink.innerText = currentCart.length;
        }
    }
});

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