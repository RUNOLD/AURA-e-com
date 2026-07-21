let productsContainer = document.getElementById("products-grid");
allApiProducts = JSON.parse(localStorage.getItem("allApiProducts")) || [];
cart = JSON.parse(localStorage.getItem("cart")) || [];
wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let allProducts = [];
let checkBox = document.querySelectorAll(".checkBox-filter:checked")

// Pagination variables
let currentPage = 1;
const productsPerPage = 12;

// Select pagination elements
let prevButton = document.querySelector('.pagination-arrow[aria-label="Previous Page"]');
let nextButton = document.querySelector('.pagination-arrow[aria-label="Next Page"]');
let pageLinks = document.querySelectorAll('.pagination-item:not(.pagination-arrow)');

// Fetch products from DummyJSON
fetch("https://dummyjson.com/products")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data.products);
    allProducts = data.products;
    localStorage.setItem("allApiProducts", JSON.stringify(allProducts));

    // Display the first page of products
    renderProducts();
  })
  .catch(function (err) {
    console.log(err);
  });

// Function to display products for the current page
function renderProducts() {
  // Clear the products container
  productsContainer.innerHTML = "";

  // Calculate start and end index for slicing
  let start = (currentPage - 1) * productsPerPage;
  let end = start + productsPerPage;

  // Get the 12 products for this page
  let productsToShow = allProducts.slice(start, end);

  // Loop and add each product to the page
  productsToShow.forEach((product, index) => {
    // console.log(product.category);
    
    // Calculate actual index in allProducts array
    let actualIndex = start + index;

    productsContainer.innerHTML += `
      <article class="product-card">
          <div class="product-media">
              <div class="product-badges">
                  <span class="product-badge badge-new">${product.availabilityStatus}</span>
              </div>
              <img src="${product.thumbnail}" alt="${product.title}" class="product-img" loading="lazy">
              <!-- CSS Hover action icons -->
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
              <!-- Static Add to Cart Button on Hover -->
              <div class="product-bottom-action">
                  <button class="add-cart-overlay-btn" onclick = "addToCart(${product.id})">Add to Cart</button>
              </div>
          </div>
          <div class="product-details">
              <span class="product-cat">${product.category}</span>
              <h3 class="product-name"><a href="#product-detail" onclick="viewDetails(${product.id})">${product.title.length <= 20 ? product.title : product.title.slice(0, 20) + "..."}</a></h3>
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
                  <span class="price-current">$${(product.price - (product.discountPercentage / 100) * product.price).toFixed(2)}</span>
              </div>
          </div>
      </article>
    `;
  });

  // Update which page number link looks active
  updatePaginationUI();
}

// Function to update active state in pagination numbers
function updatePaginationUI() {
  pageLinks.forEach(function (link) {
    let pageNum = parseInt(link.innerText);
    if (pageNum === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Add event listeners to the Previous button
if (prevButton) {
  prevButton.addEventListener("click", function (event) {
    event.preventDefault(); // Stop page scroll/jump
    if (currentPage > 1) {
      currentPage = currentPage - 1;
      renderProducts();
    }
  });
}

// Add event listeners to the Next button
if (nextButton) {
  nextButton.addEventListener("click", function (event) {
    event.preventDefault(); // Stop page scroll/jump
    let totalPages = Math.ceil(allProducts.length / productsPerPage);
    if (currentPage < totalPages) {
      currentPage = currentPage + 1;
      renderProducts();
    }
  });
}

// Add event listeners to the page number buttons
pageLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Stop page scroll/jump
    let pageNum = parseInt(link.innerText);
    let totalPages = Math.ceil(allProducts.length / productsPerPage);
    
    // Only go to page if it actually has products
    if (pageNum <= totalPages) {
      currentPage = pageNum;
      renderProducts();
    }
  });
});
// Original detail viewing function
function viewDetails(productId) {
  let selectedProduct = allProducts.find(product => product.id === productId);
  console.log(selectedProduct);
  localStorage.setItem("productDetails", JSON.stringify(selectedProduct));
  window.location.href = "view-details.html";
}
function addToCart(productId) {
    let alreadyInCart = wishlist.some(product => product.id === productId);
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

function addToWishlist(productId) {
    let alreadyInWishlist = cart.some(product => product.id === productId);
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

function check(){
  let checkBox = document.querySelectorAll(".checkBox-filter:checked");
  let selectedCategories = [];
  
  checkBox.forEach(function (chk) {
    selectedCategories.push(chk.value);
  });

  let originalProducts = JSON.parse(localStorage.getItem("allApiProducts")) || [];
  
  if (selectedCategories.length === 0) {
    allProducts = originalProducts;
  } else {
    allProducts = originalProducts.filter(function (product) {
      return selectedCategories.includes(product.category);
    });
  }
  
  currentPage = 1;
  renderProducts();
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
