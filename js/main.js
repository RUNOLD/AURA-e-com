/**
 * Premium E-Commerce Homepage - JavaScript Logic
 * 
 * Implements:
 * - Hamburger menu toggle for mobile viewports
 */

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
