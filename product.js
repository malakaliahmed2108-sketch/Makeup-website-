const CATALOG_STORAGE_KEY = 'sheglamCatalog';
const SELECTED_PRODUCT_KEY = 'sheglamSelectedProduct';

const collectionNames = {
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
    11: 'THE POWERPUFF GIRLS X SHEGLAM',
    12: 'HARRY POTTER X SHEGLAM',
    13: 'CARE BEARS X SHEGLAM',
    14: 'MARILYN MONROE X SHEGLAM',
    15: 'EMBER ROSE COLLECTION',
    16: 'COSMIC COME UP COLLECTION',
    17: 'WILLY WONKA X SHEGLAM',
    18: 'CORPSE BRIDE X SHEGLAM',
    19: 'CHROMA ZONE 2.0',
    20: 'FRIDA KAHLO X SHEGLAM'
};

const defaultBadges = ['Cruelty-Free', 'Vegan-Friendly', 'Derm-Tested'];
const defaultSizes = ['Mini', 'Standard', 'Value Set'];

const state = {
    product: null,
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductPage);
} else {
    initProductPage();
}

async function initProductPage() {
    try {
        const productId = Number(new URLSearchParams(window.location.search).get('id'));
        
        if (!productId || isNaN(productId)) {
            return renderError('Missing product identifier. Please open the page from the collections grid.');
        }

        let catalog = readCatalog();
        if (!catalog || catalog.length === 0) {
            catalog = await fetchCatalogFromFile();
        }
        const storedSelection = readStoredSelection();

        // Prioritize data from index.html (productData in script.js)
        // 1. First try storedSelection (has the exact product data passed from index)
        // 2. Then try catalog (contains all productData from script.js)
        
        let product = null;
        
        if (storedSelection && storedSelection.id === productId) {
            // Use stored selection first - it has the exact data passed from the previous page
            product = buildProductFromBase(storedSelection, catalog);
        }
        
        // Try to find in catalog (productData from index.html/script.js)
        if (!product && catalog && catalog.length > 0) {
            const catalogProduct = catalog.find((item) => item.id === productId);
            if (catalogProduct) {
                product = buildProductFromBase(catalogProduct, catalog);
            }
        }

        if (!product) {
            console.error('Product not found. ProductId:', productId, 'StoredSelection:', storedSelection, 'Catalog length:', catalog.length);
            return renderError('We could not find that product. Please pick a product from the collections page.');
        }

        state.product = normalizeProduct(product);
        if (!state.product) {
            console.error('Failed to normalize product:', product);
            return renderError('Failed to process product data. Please try again.');
        }
        
        console.log('Product loaded:', {
            id: state.product.id,
            name: state.product.name,
            price: state.product.price,
            images: state.product.images
        });
        
        hydrateHeroSection(state.product);
        renderGallery(state.product.images);
        renderOptions(state.product);
        renderBadges(state.product.badges);
        renderAttributes(state.product.attributes);
        renderPanels(state.product);
        setupQuantityControls();
        setupAddToCart();
    } catch (error) {
        console.error('Error initializing product page:', error);
        renderError('An error occurred while loading the product. Please try again.');
    }
}

function readStoredSelection() {
    try {
        const raw = localStorage.getItem(SELECTED_PRODUCT_KEY);
        if (!raw) {
            console.log('No stored selection found in localStorage');
            return null;
        }
        const parsed = JSON.parse(raw);
        console.log('Stored selection loaded:', parsed);
        return parsed;
    } catch (error) {
        console.error('Error reading stored selection:', error);
        return null;
    }
}

function readCatalog() {
    try {
        const raw = localStorage.getItem(CATALOG_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        console.log('Catalog loaded:', parsed.length, 'items');
        return parsed;
    } catch (error) {
        console.error('Error reading catalog:', error);
        return [];
    }
}

async function fetchCatalogFromFile() {
    try {
        const response = await fetch('products.json', { cache: 'no-cache' });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
            try {
                localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(data));
            } catch (storageError) {
                console.warn('Unable to cache fetched catalog:', storageError);
            }
            console.log('Catalog fetched from file:', data.length, 'items');
            return data;
        }
    } catch (error) {
        console.error('Failed to fetch catalog from products.json:', error);
    }
    return [];
}

function resolveCollectionName(value) {
    if (typeof value === 'number') {
        return collectionNames[value] || `Collection ${value}`;
    }
    return value || 'SHEGLAM Studio';
}

function buildProductFromBase(base, catalog = []) {
    if (!base) {
        console.error('buildProductFromBase: base is null or undefined');
        return null;
    }

    console.log('buildProductFromBase called with:', base);

    const productId = base.id || 0;
    const productName = base.name || `Product ${productId}`;
    const priceValue =
        typeof base.price === 'string'
            ? Number(base.price.replace('$', '').trim())
            : Number(base.price || 0);

    const colorValues = base.colors || [];
    const colors = colorValues.map((value, index) => ({
        name: `Shade ${index + 1}`,
        value,
    }));

    const collectionName = base.collectionName || resolveCollectionName(base.collection);

    const imageCandidates = [];
    // First priority: use the image path from storedSelection (from productImageMap)
    if (base.image) {
        imageCandidates.push(base.image);
    } else if (productId) {
        // If no specific image, use jpg (most common format)
        imageCandidates.push(`photo_of_project/${productId}.jpg`);
    }

    const uniqueImages = [...new Set(imageCandidates)].filter(img => img);

    const builtProduct = {
        id: productId,
        name: productName,
        collection: collectionName,
        price: Number(priceValue.toFixed(2)),
        rating: base.rating || 4.5,
        colors,
        sizes: defaultSizes,
        badges: defaultBadges,
        description: `Inspired by our ${collectionName} story, ${productName} delivers buildable color with skincare-infused comfort. This premium product is carefully crafted to provide exceptional quality and performance.`,
        attributes: {
            finish: inferFinish(collectionName),
            wearTime: inferWearTime(collectionName),
            format: inferFormat(productName),
        },
        images: uniqueImages.length > 0 ? uniqueImages : productId ? [`photo_of_project/${productId}.jpg`] : [],
        ingredients: buildDefaultIngredients(productName),
        shipping: buildDefaultShipping(),
    };
    
    console.log('Built product:', {
        id: builtProduct.id,
        name: builtProduct.name,
        price: builtProduct.price,
        images: builtProduct.images,
        collection: builtProduct.collection
    });
    
    return builtProduct;
}

function inferFinish(collectionName = '') {
    if (collectionName.includes('Gold') || collectionName.includes('WONKA')) return 'Metallic Glow';
    if (collectionName.includes('Velvet') || collectionName.includes('CORPSE')) return 'Soft Matte';
    if (collectionName.includes('Ocean') || collectionName.includes('Adventure Time')) return 'Cooling Satin';
    if (collectionName.includes('Rainbow') || collectionName.includes('CHROMA')) return 'Prismatic';
    if (collectionName.includes('MONROE') || collectionName.includes('HOLLYWOOD')) return 'Vintage Glamour';
    if (collectionName.includes('POTTER') || collectionName.includes('WIZARD')) return 'Magical Shimmer';
    if (collectionName.includes('COSMIC') || collectionName.includes('TWILIGHT')) return 'Celestial Glow';
    if (collectionName.includes('MATRIX')) return 'Cyber Metallic';
    return 'Luminous';
}

function inferWearTime(collectionName = '') {
    if (collectionName.includes('Midnight') || collectionName.includes('CORPSE')) return 'Up to 15 hours';
    if (collectionName.includes('Nature') || collectionName.includes('Bubble Bath')) return 'Breathable 12 hours';
    if (collectionName.includes('Gold') || collectionName.includes('MONROE')) return 'Smudge-proof 14 hours';
    if (collectionName.includes('POTTER') || collectionName.includes('WONKA')) return 'Magical 16 hours';
    if (collectionName.includes('QUINN') || collectionName.includes('MORTY')) return 'Chaos-proof 13 hours';
    return 'Comfort wear 12 hours';
}

function inferFormat(name = '') {
    if (name.toLowerCase().includes('palette')) return 'Palette';
    if (name.toLowerCase().includes('eyeliner')) return 'Brush Tip';
    if (name.toLowerCase().includes('lip')) return 'Lip Bullet';
    if (name.toLowerCase().includes('mascara')) return 'Mascara';
    if (name.toLowerCase().includes('highlighter')) return 'Powder';
    if (name.toLowerCase().includes('blush')) return 'Powder';
    if (name.toLowerCase().includes('foundation')) return 'Liquid';
    if (name.toLowerCase().includes('serum')) return 'Serum';
    if (name.toLowerCase().includes('mask')) return 'Sheet Mask';
    return 'Hybrid Cream';
}

function buildDefaultIngredients(name) {
    const productName = name || 'This product';
    return {
        summary: `${productName} is powered by skin-loving botanicals and weightless pigments that smooth, comfort and condition.`,
        highlights: [
            'Vitamin E derivative for cushiony wear',
            'Plant-based emollients for seamless blend',
            'Micro-powder pigments for true-to-pan payoff',
            'Free from parabens, mineral oils and drying alcohols',
        ],
    };
}

function buildDefaultShipping() {
    return {
        summary: 'Ships worldwide from climate-friendly fulfillment centers.',
        details: [
            'Processing time: 1-2 business days',
            'Express shipping available at checkout',
            'Free shipping on orders over $35',
            'Duties & taxes calculated upfront where available',
        ],
    };
}

function normalizeProduct(product) {
    if (!product) {
        console.error('normalizeProduct: product is null or undefined');
        return null;
    }
    
    const productId = product.id || 0;
    const productName = product.name || `Product ${productId}`;
    
    const normalized = {
        ...product,
        id: productId,
        name: productName,
        collection: product.collection || 'SHEGLAM Studio',
        price: Number(product.price || 0),
        rating: product.rating || 4.5,
        colors: (product.colors || []).map((color) =>
            typeof color === 'string' ? { name: color, value: color } : color,
        ),
        sizes: product.sizes && product.sizes.length ? product.sizes : defaultSizes,
        badges: product.badges && product.badges.length ? product.badges : defaultBadges,
        images:
            product.images && product.images.length
                ? product.images
                : product.image 
                    ? [product.image]
                    : productId 
                        ? [`photo_of_project/${productId}.jpg`]
                        : [],
        description: product.description || `Discover ${productName} from our collection.`,
    };
    
    console.log('Normalized product:', {
        id: normalized.id,
        name: normalized.name,
        price: normalized.price,
        images: normalized.images,
        collection: normalized.collection
    });
    
    return normalized;
}

function hydrateHeroSection(product) {
    if (!product) {
        console.error('hydrateHeroSection: product is null or undefined');
        return;
    }
    
    const productName = product.name || 'Product';
    const productPrice = product.price || 0;
    const productCollection = product.collection || 'Collection';
    const productDescription = product.description || '';
    const productRating = product.rating || 4.5;
    
    console.log('Hydrating hero section:', { productName, productPrice, productCollection });
    
    const collectionPill = document.getElementById('collectionPill');
    const productNameEl = document.getElementById('productName');
    const productPriceEl = document.getElementById('productPrice');
    const productDescriptionEl = document.getElementById('productDescription');
    const breadcrumbCollection = document.getElementById('breadcrumbCollection');
    const breadcrumbProduct = document.getElementById('breadcrumbProduct');
    
    if (!collectionPill || !productNameEl || !productPriceEl) {
        console.error('Required DOM elements not found:', {
            collectionPill: !!collectionPill,
            productName: !!productNameEl,
            productPrice: !!productPriceEl
        });
        return;
    }
    
    // Update text content
    collectionPill.textContent = productCollection;
    productNameEl.textContent = productName;
    productPriceEl.textContent = `$${Number(productPrice).toFixed(2)}`;
    
    if (productDescriptionEl) {
        productDescriptionEl.textContent = productDescription;
    }
    
    if (breadcrumbCollection) {
        breadcrumbCollection.textContent = productCollection;
    }
    
    if (breadcrumbProduct) {
        breadcrumbProduct.textContent = productName;
    }

    const ratingStars = document.getElementById('ratingStars');
    const ratingValue = document.getElementById('ratingValue');
    const reviewCount = document.getElementById('reviewCount');
    
    if (ratingStars) ratingStars.textContent = generateStars(productRating);
    if (ratingValue) ratingValue.textContent = Number(productRating).toFixed(1);
    if (reviewCount) reviewCount.textContent = `(${Math.floor(Math.random() * 50 + 50)} reviews)`;
    
    console.log('Hero section updated successfully');
}

function generateStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let stars = '★'.repeat(full);
    if (half) stars += '☆';
    stars += '☆'.repeat(5 - Math.ceil(rating));
    return stars;
}

function renderGallery(images) {
    const rail = document.getElementById('thumbnailRail');
    const mainImage = document.getElementById('mainProductImage');
    
    if (!rail || !mainImage) {
        console.error('Gallery elements not found:', { rail: !!rail, mainImage: !!mainImage });
        return;
    }
    
    rail.innerHTML = '';

    console.log('Rendering gallery with images:', images, 'Product:', state.product);

    if (!images || !Array.isArray(images) || images.length === 0) {
        // No images array, try to use single image or fallback
        let fallbackImage = '';
        if (state.product?.image) {
            fallbackImage = state.product.image;
        } else if (state.product?.id) {
            fallbackImage = `photo_of_project/${state.product.id}.jpg`;
        } else {
            console.error('No images and no product ID');
            mainImage.style.display = 'none';
            return;
        }
        
        console.log('Using fallback image:', fallbackImage);
        mainImage.src = fallbackImage;
        mainImage.alt = state.product?.name ? `${state.product.name} image` : 'Product image';
        
        // Prevent infinite loop - only try webp once if jpg fails
        let fallbackRetryDone = false;
        mainImage.onerror = () => {
            if (!fallbackRetryDone && state.product?.id && fallbackImage.endsWith('.jpg')) {
                fallbackRetryDone = true;
                // Try webp once, then stop
                mainImage.src = `photo_of_project/${state.product.id}.webp`;
            } else {
                // Hide image if all attempts failed
                mainImage.style.display = 'none';
            }
        };
        return;
    }
    
    const productName = state.product?.name || 'Product';
    console.log('Rendering', images.length, 'images');

    images.forEach((src, index) => {
        if (!src) {
            console.warn('Empty image source at index:', index);
            return;
        }
        
        const btn = document.createElement('button');
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${productName} thumbnail ${index + 1}`;
        img.loading = 'lazy';
        
        // Prevent infinite loop - track retry for each image
        let imgRetryDone = false;
        img.onerror = () => {
            if (!imgRetryDone && state.product?.id && src.includes('photo_of_project/')) {
                imgRetryDone = true;
                // Try webp once if jpg failed, then stop
                if (src.endsWith('.jpg')) {
                    img.src = `photo_of_project/${state.product.id}.webp`;
                } else {
                    btn.style.display = 'none';
                }
            } else {
                btn.style.display = 'none';
            }
        };
        
        btn.appendChild(img);
        if (index === 0) {
            btn.classList.add('active');
            console.log('Setting main image to:', src);
            mainImage.src = src;
            mainImage.alt = `${productName} main image`;
            
            // Prevent infinite loop - track retry for main image
            let mainImgRetryDone = false;
            mainImage.onerror = () => {
                if (!mainImgRetryDone && state.product?.id && src.includes('photo_of_project/')) {
                    mainImgRetryDone = true;
                    // Try webp once if jpg failed, then stop
                    if (src.endsWith('.jpg')) {
                        mainImage.src = `photo_of_project/${state.product.id}.webp`;
                    }
                    // If still fails, keep as is (don't try again)
                }
            };
        }
        btn.addEventListener('click', () => {
            document.querySelectorAll('.thumbnail-rail button').forEach((item) =>
                item.classList.remove('active'),
            );
            btn.classList.add('active');
            mainImage.src = src;
            mainImage.alt = `${productName} main image`;
        });
        rail.appendChild(btn);
    });
}

function renderOptions(product) {
    const colorContainer = document.getElementById('colorOptions');
    const sizeContainer = document.getElementById('sizeOptions');
    if (!colorContainer || !sizeContainer) return;
    
    colorContainer.innerHTML = '';
    sizeContainer.innerHTML = '';

    product.colors.forEach((color, index) => {
        const swatch = document.createElement('button');
        swatch.className = 'color-swatch';
        swatch.style.background = color.value;
        swatch.title = color.name;
        if (index === 0) swatch.classList.add('active');
        swatch.addEventListener('click', () => {
            document.querySelectorAll('.color-swatch').forEach((btn) => btn.classList.remove('active'));
            swatch.classList.add('active');
        });
        colorContainer.appendChild(swatch);
    });

    product.sizes.forEach((size, index) => {
        const chip = document.createElement('button');
        chip.className = 'size-chip';
        chip.textContent = size;
        if (index === 0) chip.classList.add('active');
        chip.addEventListener('click', () => {
            document.querySelectorAll('.size-chip').forEach((btn) => btn.classList.remove('active'));
            chip.classList.add('active');
        });
        sizeContainer.appendChild(chip);
    });
}

function renderBadges(badges) {
    const container = document.getElementById('badgeRow');
    if (!container) return;
    container.innerHTML = '';
    badges.forEach((badge) => {
        const span = document.createElement('span');
        span.textContent = badge;
        container.appendChild(span);
    });
}

function renderAttributes(attributes = {}) {
    const container = document.getElementById('attributeGrid');
    if (!container) return;
    container.innerHTML = '';
    Object.entries(attributes).forEach(([key, value]) => {
        const card = document.createElement('div');
        card.className = 'attribute-card';
        card.innerHTML = `<strong>${capitalize(key)}</strong><p>${value}</p>`;
        container.appendChild(card);
    });
}

function renderPanels(product) {
    const ingredientsPanel = document.getElementById('ingredientsPanel');
    const shippingPanel = document.getElementById('shippingPanel');
    if (!ingredientsPanel || !shippingPanel) return;

    ingredientsPanel.innerHTML = `
        <p>${product.ingredients?.summary || 'Clean, skin-friendly formula.'}</p>
        <ul>${(product.ingredients?.highlights || [])
            .map((item) => `<li>${item}</li>`)
            .join('')}</ul>
    `;

    shippingPanel.innerHTML = `
        <p>${product.shipping?.summary || 'Ships worldwide with tracked delivery.'}</p>
        <ul>${(product.shipping?.details || [])
            .map((item) => `<li>${item}</li>`)
            .join('')}</ul>
    `;

    document.querySelectorAll('.panel-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
            const panelId = btn.dataset.panel;
            const panel = document.getElementById(`${panelId}Panel`);
            panel.classList.toggle('open');
            btn.querySelector('.chevron').textContent = panel.classList.contains('open') ? '⌃' : '⌄';
        });
    });
}

function setupQuantityControls() {
    const input = document.getElementById('quantityInput');
    if (!input) return;
    document.querySelectorAll('.qty-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            let value = Number(input.value) || 1;
            if (btn.dataset.action === 'increase') value += 1;
            if (btn.dataset.action === 'decrease') value = Math.max(1, value - 1);
            input.value = value;
        });
    });
}

function setupAddToCart() {
    const button = document.getElementById('addToCartBtn');
    if (!button) return;
    button.addEventListener('click', () => {
        const quantity = Number(document.getElementById('quantityInput').value) || 1;
        showToast(`${state.product.name} (x${quantity}) added to cart`);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
}

function renderError(message) {
    const container = document.getElementById('productPage');
    if (!container) return;
    container.innerHTML = `<div class="error-state">
        <h2>${message}</h2>
        <p><a href="index.html">Return to collections</a></p>
    </div>`;
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}