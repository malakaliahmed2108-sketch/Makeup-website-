// ============================================
// 0) SHARED STORAGE KEYS
// ============================================
const CATALOG_STORAGE_KEY = 'sheglamCatalog';
const SELECTED_PRODUCT_KEY = 'sheglamSelectedProduct';

// ============================================
// 1) PRODUCT DATA
// ============================================

const productData = [
    // 1 — CATWOMAN Collection
    { id: 1, name: 'CATWOMAN™ | SHEGLAM Meow Eyeliner', price: '$24.99', rating: 4.5, colors: ['#000000', '#2D2D2D', '#5A5A5A'], collection: 1 },
    { id: 2, name: 'CATWOMAN™ | SHEGLAM Feline Fatale Palette', price: '$39.99', rating: 4.8, colors: ['#3B2A1E', '#7A5743', '#C69F89', '#E6C7B8', '#2C1B1F'], collection: 1 },
    { id: 3, name: 'CATWOMAN™ | SHEGLAM Jewel Thief Highlighter Ring', price: '$19.99', rating: 4.6, colors: ['#F5EED4', '#E8D5B5', '#D4BC95'], collection: 1 },
    { id: 4, name: 'CATWOMAN™ | SHEGLAM Black Cat Color-Changing Blush', price: '$22.99', rating: 4.7, colors: ['#DB2777', '#EC4899', '#F472B6'], collection: 1 },

    // 2 — The Twilight Saga X SHEGLAM
    { id: 5, name: 'The Twilight Saga X SHEGLAM Forever Setting Spray', price: '$24.99', rating: 4.7, colors: ['#F0FDF4', '#DCFCE7', '#BBF7D0'], collection: 2 },
    { id: 6, name: 'The Twilight Saga X SHEGLAM Moonlight Palette', price: '$34.99', rating: 4.8, colors: ['#F5F5F5', '#E5E5E5', '#D4D4D4', '#A3A3A3', '#737373'], collection: 2 },
    { id: 7, name: 'The Twilight Saga X SHEGLAM Vampire Kiss Lipstick', price: '$12.99', rating: 4.4, colors: ['#7F1D1D', '#991B1B', '#B91C1C'], collection: 2 },
    { id: 8, name: 'The Twilight Saga X SHEGLAM Cullen Highlighter', price: '$19.99', rating: 4.6, colors: ['#FEF3C7', '#FDE68A', '#FCD34D'], collection: 2 },

    // 3 — The Matrix Resurrections
    { id: 9, name: 'The Matrix Resurrections | SHEGLAM Code Green Palette', price: '$24.99', rating: 4.9, colors: ['#022C22', '#064E3B', '#047857', '#10B981', '#6EE7B7'], collection: 3 },
    { id: 10, name: 'The Matrix Resurrections | SHEGLAM Red Pill Lipstick', price: '$12.99', rating: 4.6, colors: ['#7F1D1D', '#991B1B', '#DC2626'], collection: 3 },
    { id: 11, name: 'The Matrix Resurrections | SHEGLAM Neo Eyeliner', price: '$29.99', rating: 4.7, colors: ['#000000', '#1F2937', '#374151'], collection: 3 },
    { id: 12, name: 'The Matrix Resurrections | SHEGLAM Trinity Highlighter', price: '$22.99', rating: 4.8, colors: ['#FEF3C7', '#FDE68A', '#FCD34D'], collection: 3 },

    // 4 — Bubble Bath Dreams
    { id: 13, name: 'Bubble Bath Dreams Full Eyeshadow Palette', price: '$18.99', rating: 4.7, colors: ['#F5F5F5', '#E5E5E5', '#D4D4D4', '#A3A3A3', '#FBCFE8', '#F9A8D4', '#DBEAFE', '#BFDBFE'], collection: 4 },
    { id: 14, name: 'Bubble Bath Dreams Soft Matte Lipstick', price: '$34.99', rating: 4.8, colors: ['#FECACA', '#FCA5A5', '#F87171'], collection: 4 },
    { id: 15, name: 'Bubble Bath Dreams Blush Duo', price: '$27.99', rating: 4.6, colors: ['#FBCFE8', '#F9A8D4', '#F472B6'], collection: 4 },
    { id: 16, name: 'Bubble Bath Dreams Glow Highlighter', price: '$28.99', rating: 4.9, colors: ['#FEF3C7', '#FDE68A', '#FCD34D'], collection: 4 },

    // 5 — Wizard of OZ
    { id: 17, name: 'The Wizard of OZ™ | SHEGLAM Rainbow Palette', price: '$29.99', rating: 4.7, colors: ['#DC2626', '#EA580C', '#FDE047', '#16A34A', '#2563EB', '#9333EA', '#EC4899'], collection: 5 },
    { id: 18, name: 'The Wizard of OZ™ | SHEGLAM Ruby Slipper Lipstick', price: '$16.99', rating: 4.5, colors: ['#7F1D1D', '#991B1B', '#B91C1C'], collection: 5 },
    { id: 19, name: 'The Wizard of OZ™ | SHEGLAM Emerald City Highlighter', price: '$12.99', rating: 4.6, colors: ['#064E3B', '#047857', '#10B981'], collection: 5 },
    { id: 20, name: 'The Wizard of OZ™ | SHEGLAM Yellow Brick Blush', price: '$24.99', rating: 4.8, colors: ['#FDE047', '#FACC15', '#EAB308'], collection: 5 },

    // 6 — Adventure Time
    { id: 21, name: 'Adventure Time | SHEGLAM Mathematical Palette', price: '$29.99', rating: 4.9, colors: ['#FDE047', '#FACC15', '#EAB308', '#16A34A', '#15803D', '#1D4ED8', '#1E40AF'], collection: 6 },
    { id: 22, name: 'Adventure Time | SHEGLAM Finn & Jake Lipstick Duo', price: '$34.99', rating: 4.8, colors: ['#FDE047', '#16A34A'], collection: 6 },
    { id: 23, name: 'Adventure Time | SHEGLAM Princess Bubblegum Blush', price: '$24.99', rating: 4.7, colors: ['#FBCFE8', '#F9A8D4', '#F472B6'], collection: 6 },
    { id: 24, name: 'Adventure Time | SHEGLAM BMO Highlighter', price: '$32.99', rating: 4.6, colors: ['#F5F5F5', '#E5E5E5', '#D4D4D4'], collection: 6 },

    // 7 — Hello Kitty
    { id: 25, name: 'Hello Kitty｜SHEGLAM Kawaii Eyeshadow Palette', price: '$18.99', rating: 4.8, colors: ['#F5F5F5', '#E5E5E5', '#D4D4D4', '#FBCFE8', '#F9A8D4', '#F472B6'], collection: 7 },
    { id: 26, name: 'Hello Kitty｜SHEGLAM Bow Lipstick', price: '$14.99', rating: 4.7, colors: ['#FBCFE8', '#F9A8D4', '#F472B6'], collection: 7 },
    { id: 27, name: 'Hello Kitty｜SHEGLAM Cute Blush', price: '$39.99', rating: 4.9, colors: ['#FBCFE8', '#F9A8D4', '#F472B6', '#EC4899'], collection: 7 },
    { id: 28, name: 'Hello Kitty｜SHEGLAM Pink Highlighter', price: '$12.99', rating: 4.6, colors: ['#FBCFE8', '#F9A8D4'], collection: 7 },

    // 8 — Harry Potter 2.0
    { id: 29, name: 'HARRY POTTER | SHEGLAM 2.0 Hogwarts Palette', price: '$34.99', rating: 4.8, colors: ['#7C2D12', '#DC2626', '#FDE047', '#0F766E', '#1D4ED8', '#3730A3', '#581C87'], collection: 8 },
    { id: 30, name: 'HARRY POTTER | SHEGLAM 2.0 Golden Snitch Highlighter', price: '$24.99', rating: 4.7, colors: ['#FEF3C7', '#FDE68A', '#FCD34D'], collection: 8 },
    { id: 31, name: 'HARRY POTTER | SHEGLAM 2.0 Gryffindor Lipstick', price: '$29.99', rating: 4.6, colors: ['#7C2D12', '#9A3412', '#C2410C'], collection: 8 },
    { id: 32, name: 'HARRY POTTER | SHEGLAM 2.0 House Blush Palette', price: '$19.99', rating: 4.9, colors: ['#FBCFE8', '#FDE047', '#BBF7D0', '#BFDBFE'], collection: 8 },

    // 9 — Harley Quinn
    { id: 33, name: 'HARLEY QUINN X SHEGLAM Chaos Eyeshadow Palette', price: '$44.99', rating: 4.9, colors: ['#DC2626', '#EA580C', '#FDE047', '#16A34A', '#2563EB', '#9333EA', '#EC4899'], collection: 9 },
    { id: 34, name: 'HARLEY QUINN X SHEGLAM Puddin\' Lipstick', price: '$39.99', rating: 4.8, colors: ['#DC2626', '#FDE047', '#16A34A', '#2563EB', '#9333EA'], collection: 9 },
    { id: 35, name: 'HARLEY QUINN X SHEGLAM Mad Love Blush', price: '$24.99', rating: 4.7, colors: ['#FDE047', '#16A34A', '#2563EB', '#9333EA'], collection: 9 },
    { id: 36, name: 'HARLEY QUINN X SHEGLAM Diamond Highlighter', price: '$29.99', rating: 4.6, colors: ['#F5F5F5', '#E5E5E5', '#D4D4D4'], collection: 9 },

    // 10 — Rick & Morty
    { id: 37, name: 'RICK AND MORTY X SHEGLAM Portal Eyeshadow Palette', price: '$34.99', rating: 4.8, colors: ['#16A34A', '#2563EB', '#FDE047', '#DC2626', '#9333EA'], collection: 10 },
    { id: 38, name: 'RICK AND MORTY X SHEGLAM Pickle Rick Lipstick', price: '$39.99', rating: 4.9, colors: ['#16A34A', '#15803D', '#166534'], collection: 10 },
    { id: 39, name: 'RICK AND MORTY X SHEGLAM Schwifty Blush', price: '$32.99', rating: 4.7, colors: ['#FBCFE8', '#F9A8D4', '#F472B6'], collection: 10 },
    { id: 40, name: 'RICK AND MORTY X SHEGLAM Interdimensional Highlighter', price: '$22.99', rating: 4.6, colors: ['#FEF3C7', '#FDE68A', '#FCD34D'], collection: 10 },
];

const collectionNameMap = {
    1: 'CATWOMAN™ | SHEGLAM',
    2: 'The Twilight Saga X SHEGLAM',
    3: 'The Matrix Resurrections | SHEGLAM',
    4: 'Bubble Bath Dreams Collection',
    5: 'The Wizard of OZ™ | SHEGLAM',
    6: 'Adventure Time | SHEGLAM',
    7: 'Hello Kitty｜SHEGLAM',
    8: 'HARRY POTTER | SHEGLAM 2.0',
    9: 'HARLEY QUINN X SHEGLAM',
    10: 'RICK AND MORTY X SHEGLAM',
};

const productImageMap = {
    'CATWOMAN™ | SHEGLAM Meow Eyeliner': 'photo_of_project/1.jpg',
    'CATWOMAN™ | SHEGLAM Feline Fatale Palette': 'photo_of_project/2.gif',
    'CATWOMAN™ | SHEGLAM Jewel Thief Highlighter Ring': 'photo_of_project/3.jpg',
    'CATWOMAN™ | SHEGLAM Black Cat Color-Changing Blush': 'photo_of_project/4.jpg',
   
    'The Twilight Saga X SHEGLAM Forever Setting Spray': 'photo_of_project/5.jpg',
    'The Twilight Saga X SHEGLAM Moonlight Palette': 'photo_of_project/6.webp',
    'The Twilight Saga X SHEGLAM Vampire Kiss Lipstick': 'photo_of_project/7.jpg',
    'The Twilight Saga X SHEGLAM Cullen Highlighter': 'photo_of_project/8.jpg',

    
    'The Matrix Resurrections | SHEGLAM Code Green Palette': 'photo_of_project/9.jpg',
    'The Matrix Resurrections | SHEGLAM Red Pill Lipstick': 'photo_of_project/10.jpg',
    'The Matrix Resurrections | SHEGLAM Neo Eyeliner': 'photo_of_project/11.jpg',
    'The Matrix Resurrections | SHEGLAM Trinity Highlighter': 'photo_of_project/12.jpg',
    
    'Bubble Bath Dreams Full Eyeshadow Palette': 'photo_of_project/13.jpg',
    'Bubble Bath Dreams Soft Matte Lipstick': 'photo_of_project/14.jpg',
    'Bubble Bath Dreams Blush Duo': 'photo_of_project/15.webp',
    'Bubble Bath Dreams Glow Highlighter': 'photo_of_project/16.jpg',
    
    'The Wizard of OZ™ | SHEGLAM Rainbow Palette': 'photo_of_project/17.jpg',
    'The Wizard of OZ™ | SHEGLAM Ruby Slipper Lipstick': 'photo_of_project/18.jpg',
    'The Wizard of OZ™ | SHEGLAM Emerald City Highlighter': 'photo_of_project/19.jpg',
    'The Wizard of OZ™ | SHEGLAM Yellow Brick Blush': 'photo_of_project/20.jpg',
    
    'Adventure Time | SHEGLAM Mathematical Palette': 'photo_of_project/21.jpg',
    'Adventure Time | SHEGLAM Finn & Jake Lipstick Duo': 'photo_of_project/22.webp',
    'Adventure Time | SHEGLAM Princess Bubblegum Blush': 'photo_of_project/23.webp',
    'Adventure Time | SHEGLAM BMO Highlighter': 'photo_of_project/24.webp',
   
    'Hello Kitty｜SHEGLAM Kawaii Eyeshadow Palette': 'photo_of_project/25.jpg',
    'Hello Kitty｜SHEGLAM Bow Lipstick': 'photo_of_project/26.jpg',
    'Hello Kitty｜SHEGLAM Cute Blush': 'photo_of_project/27.jpg',
    'Hello Kitty｜SHEGLAM Pink Highlighter': 'photo_of_project/28.jpg',
  
    'HARRY POTTER | SHEGLAM 2.0 Hogwarts Palette': 'photo_of_project/29.jpg',
    'HARRY POTTER | SHEGLAM 2.0 Golden Snitch Highlighter': 'photo_of_project/30.webp',
    'HARRY POTTER | SHEGLAM 2.0 Gryffindor Lipstick': 'photo_of_project/31.jpg',
    'HARRY POTTER | SHEGLAM 2.0 House Blush Palette': 'photo_of_project/32.jpg',
    
    'HARLEY QUINN X SHEGLAM Chaos Eyeshadow Palette': 'photo_of_project/33.jpg',
    'HARLEY QUINN X SHEGLAM Puddin\' Lipstick': 'photo_of_project/34.webp',
    'HARLEY QUINN X SHEGLAM Mad Love Blush': 'photo_of_project/35.webp',
    'HARLEY QUINN X SHEGLAM Diamond Highlighter': 'photo_of_project/36.webp',
   
    'RICK AND MORTY X SHEGLAM Portal Eyeshadow Palette': 'photo_of_project/37.jpg',
    'RICK AND MORTY X SHEGLAM Pickle Rick Lipstick': 'photo_of_project/38.jpg',
    'RICK AND MORTY X SHEGLAM Schwifty Blush': 'photo_of_project/39.webp',
    'RICK AND MORTY X SHEGLAM Interdimensional Highlighter': 'photo_of_project/40.jpg',
   
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    
    if (hasHalfStar) {
        starsHTML += '☆';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '☆';
    }
    
    return starsHTML;
}

function getProductImagePath(product) {
    return productImageMap[product.name] || '';
}

// Lazy load image
function lazyLoadImage(img, product) {
    const imageUrl = getProductImagePath(product);
    if (!imageUrl) {
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23f0f0f0"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="20"%3ENo Image%3C/text%3E%3C/svg%3E';
        img.classList.add('loaded');
        console.warn(`No image mapping found for product: ${product.name}`);
        return;
    }

    const tempImg = new Image();
    
    tempImg.onload = function() {
        img.src = imageUrl;
        img.classList.add('loaded');
    };
    
    tempImg.onerror = function() {
        // Fallback to a solid color if image fails to load
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23f0f0f0"/%3E%3C/svg%3E';
        img.classList.add('loaded');
        console.error(`Failed to load image for product: ${product.name} from ${imageUrl}`);
    };
    
    tempImg.src = imageUrl;
}

// ============================================
// PRODUCT CARD RENDERING
// ============================================

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    card.innerHTML = `
        <div class="product-image-container">
            <img class="product-image" alt="${product.name}" data-product-id="${product.id}">
        </div>
        <div class="product-info">
            <h4 class="product-name">${product.name}</h4>
            <div class="product-price">${product.price}</div>
            <div class="product-rating">
                <span class="stars">${generateStars(product.rating)}</span>
                <span class="rating-text">(${product.rating})</span>
            </div>
            <div class="color-variants">
                ${product.colors.map(color => 
                    `<div class="color-circle" style="background-color: ${color}" title="Color variant"></div>`
                ).join('')}
            </div>
            <div class="product-actions">
                <button class="btn btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="btn btn-quick-view" onclick="openQuickView(${product.id})">Quick View</button>
            </div>
        </div>
    `;
    
    // Lazy load the image
    const img = card.querySelector('.product-image');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoadImage(img, product);
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    observer.observe(img);
    
    card.addEventListener('click', (event) => {
        if (event.target.closest('button')) {
            return;
        }
        navigateToProduct(product);
    });
    
    return card;
}

function navigateToProduct(product) {
    try {
        localStorage.setItem(SELECTED_PRODUCT_KEY, JSON.stringify({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price.replace('$', '')),
            rating: product.rating,
            colors: product.colors,
            collection: product.collection,
            collectionName: collectionNameMap[product.collection],
            image: getProductImagePath(product)
        }));
    } catch (error) {
        console.warn('Unable to cache selected product', error);
    }
    window.location.href = `product.html?id=${product.id}`;
}

// ============================================
// RENDER COLLECTIONS
// ============================================

function renderCollections() {
    for (let i = 1; i <= 10; i++) {
        const collectionProducts = productData.filter(p => p.collection === i);
        const grid = document.getElementById(`collection-${i}`);
        
        if (grid) {
            // Clear existing content
            grid.innerHTML = '';
            
            // Render products (8 products per collection)
            collectionProducts.forEach(product => {
                const card = createProductCard(product);
                grid.appendChild(card);
            });
        }
    }
}

// ============================================
// CART FUNCTIONALITY
// ============================================

let cartCount = 0;

function addToCart(productId) {
    cartCount++;
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.animation = 'none';
        setTimeout(() => {
            cartCountElement.style.animation = 'pulse 0.3s';
        }, 10);
    }
    
    // Show feedback
    const product = productData.find(p => p.id === productId);
    if (product) {
        showNotification(`${product.name} added to cart!`);
    }
}

// ============================================
// QUICK VIEW MODAL
// ============================================

function openQuickView(productId) {
    const product = productData.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('quickViewModal');
    const modalBody = document.getElementById('modalBody');
    
    const modalImage = getProductImagePath(product) || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600"%3E%3Crect width="600" height="600" fill="%23f0f0f0"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="24"%3ENo Image%3C/text%3E%3C/svg%3E';

    modalBody.innerHTML = `
        <div>
            <img class="modal-image" src="${modalImage}" alt="${product.name}">
        </div>
        <div class="modal-info">
            <h3>${product.name}</h3>
            <div class="product-price">${product.price}</div>
            <div class="product-rating">
                <span class="stars">${generateStars(product.rating)}</span>
                <span class="rating-text">(${product.rating} out of 5 stars)</span>
            </div>
            <p class="modal-description">
                Experience the beauty of ${product.name.toLowerCase()}. This premium product is carefully crafted 
                with high-quality ingredients to deliver stunning results. Perfect for everyday use or special occasions.
            </p>
            <div class="color-variants">
                <strong>Available Colors:</strong>
                ${product.colors.map(color => 
                    `<div class="color-circle" style="background-color: ${color}; margin-top: 0.5rem;" title="Color variant"></div>`
                ).join('')}
            </div>
            <div class="modal-actions">
                <button class="btn btn-add-cart" onclick="addToCart(${product.id}); closeQuickView();">Add to Cart</button>
                <button class="btn btn-quick-view" onclick="closeQuickView()">Close</button>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('quickViewModal');
    if (event.target === modal) {
        closeQuickView();
    }
});

// Close modal with X button
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeQuickView);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeQuickView();
    }
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #d946ef;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;
        
        const results = productData.filter(product => 
            product.name.toLowerCase().includes(query)
        );
        
        if (results.length > 0) {
            // Scroll to first matching product
            const firstResult = results[0];
            const collectionId = firstResult.collection;
            const section = document.querySelector(`#collection-${collectionId}`).closest('.collection-section');
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Highlight matching products
            highlightProducts(results.map(r => r.id));
        } else {
            showNotification('No products found matching your search.');
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});

function highlightProducts(productIds) {
    // Remove previous highlights
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.border = '';
    });
    
    // Highlight matching products
    productIds.forEach(id => {
        const card = document.querySelector(`[data-product-id="${id}"]`);
        if (card) {
            card.style.border = '3px solid #d946ef';
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// ============================================
// POPUP ADVERTISEMENT FUNCTIONALITY
// ============================================

function showPopupAd() {
    // Check if user has already dismissed the popup (using localStorage)
    const popupDismissed = localStorage.getItem('popupAdDismissed');
    if (popupDismissed) {
        return; // Don't show popup if already dismissed
    }
    
    const popupAd = document.getElementById('popupAd');
    if (popupAd) {
        // Small delay to ensure smooth animation
        setTimeout(() => {
            popupAd.classList.add('show');
            document.body.style.overflow = 'hidden';
        }, 500);
    }
}

function closePopupAd() {
    const popupAd = document.getElementById('popupAd');
    if (popupAd) {
        popupAd.classList.remove('show');
        document.body.style.overflow = '';
        // Store dismissal in localStorage
        localStorage.setItem('popupAdDismissed', 'true');
        // Optional: Set expiration (24 hours)
        const expirationTime = Date.now() + (24 * 60 * 60 * 1000);
        localStorage.setItem('popupAdExpiration', expirationTime.toString());
    }
}

function checkPopupExpiration() {
    const expiration = localStorage.getItem('popupAdExpiration');
    if (expiration) {
        const expirationTime = parseInt(expiration);
        if (Date.now() > expirationTime) {
            // Expiration passed, clear the dismissal flag
            localStorage.removeItem('popupAdDismissed');
            localStorage.removeItem('popupAdExpiration');
        }
    }
}

// Handle popup form submission
function handlePopupFormSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('popupEmail').value;
    
    if (email) {
        // Here you would typically send the email to your server
        console.log('Email submitted:', email);
        showNotification('Thank you! Check your email for your discount code.');
        closePopupAd();
    }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    renderCollections();
    cacheProductCatalog();
    
    // Set up popup event listeners
    const popupClose = document.getElementById('popupClose');
    const popupNoThanks = document.getElementById('popupNoThanks');
    const popupForm = document.getElementById('popupForm');
    const popupAd = document.getElementById('popupAd');
    
    if (popupClose) {
        popupClose.addEventListener('click', closePopupAd);
    }
    
    if (popupNoThanks) {
        popupNoThanks.addEventListener('click', closePopupAd);
    }
    
    if (popupForm) {
        popupForm.addEventListener('submit', handlePopupFormSubmit);
    }
    
    // Close popup when clicking outside
    if (popupAd) {
        popupAd.addEventListener('click', function(event) {
            if (event.target === popupAd) {
                closePopupAd();
            }
        });
    }
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && popupAd && popupAd.classList.contains('show')) {
            closePopupAd();
        }
    });
    
    // Show popup after page loads
    showPopupAd();
    
    console.log('Collections page loaded successfully!');
});

function cacheProductCatalog() {
    try {
        localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(productData));
    } catch (error) {
        console.warn('Unable to persist catalog for product page', error);
    }
}