cart = JSON.parse(localStorage.getItem("cart")) || [];
wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
allApiProducts = JSON.parse(localStorage.getItem("allApiProducts")) || [];
orders = JSON.parse(localStorage.getItem("orders")) || [];
let orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || (orders.length > 0 ? orders[orders.length - 1] : null);

let productsContainer = document.getElementById("products-container");

function switchOrder(orderId) {
    let foundOrder = orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (foundOrder) {
        orderDetails = foundOrder;
        localStorage.setItem("orderDetails", JSON.stringify(foundOrder));
        displayOrderDetails();
    }
}

function renderOrderHistorySelector() {
    let selectorWrapper = document.getElementById("order-history-selector-wrapper");
    let selectEl = document.getElementById("order-history-select");
    if (!selectorWrapper || !selectEl) return;

    if (orders && orders.length > 0) {
        selectorWrapper.style.display = "flex";
        selectEl.innerHTML = "";
        orders.forEach(order => {
            let isSelected = (orderDetails && (order.id === orderDetails.id || order.orderNumber === orderDetails.orderNumber)) ? "selected" : "";
            selectEl.innerHTML += `<option value="${order.id}" ${isSelected}>${order.orderNumber || '#' + order.id} - ${order.orderDate}</option>`;
        });
    } else {
        selectorWrapper.style.display = "none";
    }
}

function displayOrderDetails() {
    if (!orderDetails) {
        let orderPage = document.querySelector(".view-order-page .container");
        if (orderPage) {
            orderPage.innerHTML = `
                <div id="empty-order-view" class="empty-order-container" style="text-align: center; padding: 80px 24px;">
                    <div class="empty-order-icon" style="margin-bottom: 24px; color: var(--text-muted);">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" width="80" height="80" style="margin: 0 auto;">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                    </div>
                    <h2 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 12px; color: var(--primary);">No Order Details Found</h2>
                    <p style="color: var(--text-muted); margin-bottom: 30px; max-width: 400px; margin-left: auto; margin-right: auto;">Looks like you haven't placed an order yet. Add items to your cart and complete checkout to view order details here.</p>
                    <a href="shop.html" class="btn btn-primary">Explore Store</a>
                </div>
            `;
        }
        return;
    }

    // 1. Populate Order History Dropdown Selector if multiple orders exist
    renderOrderHistorySelector();

    // 2. Populate Order Header Card
    let orderIdEl = document.getElementById("order-id");
    let orderDateEl = document.getElementById("order-date");
    let deliveryDateEl = document.getElementById("delivery-date");
    let orderStatusEl = document.getElementById("order-status");

    if (orderIdEl) {
        orderIdEl.innerText = `Order ${orderDetails.orderNumber || '#' + orderDetails.id}`;
    }
    if (orderDateEl) {
        orderDateEl.innerText = orderDetails.orderDate || "N/A";
    }
    if (deliveryDateEl) {
        deliveryDateEl.innerText = orderDetails.deliveryDate || "N/A";
    }
    if (orderStatusEl) {
        orderStatusEl.innerText = orderDetails.status || "Processing";
        orderStatusEl.className = `status-badge ${(orderDetails.status || 'processing').toLowerCase()}`;
    }

    // 3. Populate Purchased Products List using view-order design template
    displayOrderProducts(orderDetails.items || []);

    // 4. Populate Shipping Details Card
    displayShippingInfo(orderDetails.shippingAddress, orderDetails.shippingMethod, orderDetails.trackingNumber);

    // 5. Populate Payment Method Card
    displayPaymentInfo(orderDetails.paymentMethod);

    // 6. Populate Order Summary Totals
    displayOrderSummary(orderDetails.totals, orderDetails.items || []);
}

function displayOrderProducts(items) {
    let productsContainer = document.getElementById("products-container");
    if (!productsContainer) return;

    if (!items || items.length === 0) {
        productsContainer.innerHTML = `<p style="padding: 24px; color: var(--text-muted);">No items found in this order.</p>`;
        return;
    }

    productsContainer.innerHTML = "";
    items.forEach((product, index) => {
        let qty = product.quantity || 1;
        let unitPrice = parseFloat(product.price || 0);
        let subtotalPrice = (unitPrice * qty).toFixed(2);
        let imageSrc = product.thumbnail || product.images?.[0] || 'images/placeholder.jpg';

        productsContainer.innerHTML += `
            <article class="product-row-card" data-id="${product.id}">
                <div class="product-media-box">
                    <img src="${imageSrc}" alt="${product.title}" class="product-img">
                </div>
                <div class="product-details-box">
                    <span class="product-brand">${product.brand || 'AURA'}</span>
                    <h3 class="product-name">
                        <a href="view-details.html" onclick="viewDetails(${product.id}); event.preventDefault();" class="product-name-link">${product.title}</a>
                    </h3>
                    <span class="product-category" style="font-size: 0.8rem; color: var(--text-muted);">${product.category || 'Luxury Provision'}</span>
                    <div class="product-specs">
                        <span class="spec-item">Quantity: <strong>${qty}</strong></span>
                    </div>
                    <div class="rating-stars-preview" aria-label="Rating: ${product.rating || 5} out of 5 stars">
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                    </div>
                </div>
                <div class="product-pricing-actions">
                    <span class="product-subtotal-price">$${subtotalPrice}</span>
                    <span class="product-unit-info">Unit price: $${unitPrice.toFixed(2)}</span>
                    <div class="product-action-row">
                        <button onclick="addToCart(${product.id})" class="btn btn-secondary btn-sm">Buy Again</button>
                        <button onclick="alert('Thank you for your review request!')" class="btn btn-primary btn-sm">Write Review</button>
                    </div>
                </div>
            </article>
        `;
    });
}

function displayShippingInfo(addressData, shippingMethod, trackingNumber) {
    let shippingInfoEl = document.getElementById("shipping-info");
    if (!shippingInfoEl) return;

    let addressObj = addressData || {};
    let name = addressObj.name || "N/A";
    let address = addressObj.address || "N/A";
    let phone = addressObj.phone ? `Phone: ${addressObj.phone}` : "N/A";

    shippingInfoEl.innerHTML = `
        <div>
            <h2 class="panel-section-title">Shipping Address</h2>
            <div class="address-info-block">
                <p>
                    <strong>${name}</strong><br>
                    ${address}<br>
                    <span class="contact-value">${phone}</span>
                </p>
            </div>
        </div>
        <div class="shipping-method-value">
            <span>${shippingMethod || 'Courier Express Delivery (Tracked)'}</span>
            <span id="tracking-number" style="font-weight: 600;">${trackingNumber || 'TRK-EXPRESS'}</span>
        </div>
    `;
}

function displayPaymentInfo(paymentData) {
    let paymentInfoEl = document.getElementById("payment-info");
    if (!paymentInfoEl) return;

    let pay = paymentData || {};
    let brand = pay.brand || "Visa";
    let last4 = pay.last4 || "4242";
    let txnId = pay.transactionId || "N/A";
    let date = pay.paymentDate || "N/A";
    let status = pay.paymentStatus || "Authorized & Paid";

    paymentInfoEl.innerHTML = `
        <div>
            <h2 class="panel-section-title">Payment Method</h2>
            <div class="payment-summary-block">
                <div class="payment-brand-row">
                    <span class="payment-brand-label">${brand}</span>
                    <span>${brand} ending in ${last4}</span>
                </div>
                <div class="payment-detail-row">
                    <span>Transaction ID</span>
                    <strong>${txnId}</strong>
                </div>
                <div class="payment-detail-row">
                    <span>Payment Date</span>
                    <strong>${date}</strong>
                </div>
                <div class="payment-detail-row">
                    <span>Payment Status</span>
                    <strong style="color: var(--success);">${status}</strong>
                </div>
            </div>
        </div>
    `;
}

function displayOrderSummary(totalsData, items) {
    let subtotalEl = document.getElementById("subtotal");
    let shippingEl = document.getElementById("shipping");
    let taxEl = document.getElementById("tax");
    let discountEl = document.getElementById("discount");
    let grandTotalEl = document.getElementById("grand-total");

    if (totalsData) {
        if (subtotalEl) subtotalEl.innerText = `$${totalsData.subtotal}`;
        if (shippingEl) shippingEl.innerText = totalsData.shippingText || "$0.00 (Free Shipping)";
        if (taxEl) taxEl.innerText = `$${totalsData.tax}`;
        if (discountEl) {
            let discVal = parseFloat(totalsData.discount || 0);
            if (discVal > 0) {
                discountEl.innerText = `-$${discVal.toFixed(2)}`;
                let discountRow = discountEl.closest(".discount-row");
                if (discountRow) {
                    discountRow.style.display = "flex";
                }
            } else {
                let discountRow = discountEl.closest(".discount-row");
                if (discountRow) {
                    discountRow.style.display = "none";
                }
            }
        }
        if (grandTotalEl) grandTotalEl.innerText = `$${totalsData.grandTotal}`;
    } else {
        let calculatedSubtotal = 0;
        (items || []).forEach(product => {
            let qty = product.quantity || 1;
            calculatedSubtotal += parseFloat(product.price || 0) * qty;
        });

        let taxVal = calculatedSubtotal * 0.05;
        let grandTotalVal = calculatedSubtotal + taxVal;

        if (subtotalEl) subtotalEl.innerText = `$${calculatedSubtotal.toFixed(2)}`;
        if (shippingEl) shippingEl.innerText = "$0.00 (Free Shipping)";
        if (taxEl) taxEl.innerText = `$${taxVal.toFixed(2)}`;
        if (discountEl) {
            let discountRow = discountEl.closest(".discount-row");
            if (discountRow) discountRow.style.display = "none";
        }
        if (grandTotalEl) grandTotalEl.innerText = `$${calculatedSubtotal.toFixed(2)}`;
    }
}

// Initialize order details when page loads
displayOrderDetails();
