// Constants
const TRANSITION_DURATION = 400;
const OPACITY_LOW = 0.3;
const OPACITY_FULL = 1;
const NOTIFICATION_DURATION = 3000;

// State
let selectedColor = null;
let colorImages = {};

// DOM Elements
const mainImage = document.getElementById('mainImage');
const qtyInput = document.getElementById('qty');
const colorButtons = document.querySelectorAll('.color');
const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');
const addToCartBtn = document.getElementById('addToCartBtn');
const buyNowBtn = document.getElementById('buyNowBtn');
const shadeInfo = document.getElementById('shadeInfo');
const shadeName = document.getElementById('shadeName');
const shadeUndertone = document.getElementById('shadeUndertone');
const shadeBestFor = document.getElementById('shadeBestFor');

// ✨ FLOATING HEARTS GENERATOR
function createFloatingHearts(x, y, count = 5) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.cssText = `
      position: fixed;
      font-size: ${16 + Math.random() * 12}px;
      pointer-events: none;
      z-index: 9999;
      left: ${x + (Math.random() - 0.5) * 40}px;
      top: ${y}px;
      user-select: none;
    `;
    document.body.appendChild(heart);
    
    const drift = (Math.random() - 0.5) * 100;
    const rotation = (Math.random() - 0.5) * 360;
    
    heart.animate([
      { transform: 'translateY(0) translateX(0) rotate(0deg) scale(1)', opacity: 1 },
      { transform: `translateY(-150px) translateX(${drift}px) rotate(${rotation}deg) scale(0.5)`, opacity: 0 }
    ], {
      duration: 2000 + Math.random() * 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => heart.remove();
  }
}

// ✨ SPARKLE EFFECT GENERATOR
function createSparkles(x, y, color = '#ffd700') {
  const sparkleCount = 8;
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 10px ${color};
      left: ${x}px;
      top: ${y}px;
    `;
    document.body.appendChild(sparkle);
    
    const angle = (Math.PI * 2 * i) / sparkleCount;
    const velocity = 50 + Math.random() * 30;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    sparkle.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
    ], {
      duration: 600 + Math.random() * 200,
      easing: 'cubic-bezier(0, .9, .57, 1)'
    }).onfinish = () => sparkle.remove();
  }
}

// ✨ FLOATING PARTICLES (stars, sparkles, etc)
function createFloatingParticles(x, y, emoji = '✨', count = 3) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.innerHTML = emoji;
    particle.style.cssText = `
      position: fixed;
      font-size: ${12 + Math.random() * 8}px;
      pointer-events: none;
      z-index: 9999;
      left: ${x + (Math.random() - 0.5) * 60}px;
      top: ${y + (Math.random() - 0.5) * 20}px;
      user-select: none;
    `;
    document.body.appendChild(particle);
    
    const tx = (Math.random() - 0.5) * 150;
    const ty = -100 - Math.random() * 100;
    const rotation = (Math.random() - 0.5) * 720;
    
    particle.animate([
      { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) rotate(${rotation}deg) scale(0)`, opacity: 0 }
    ], {
      duration: 1500 + Math.random() * 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => particle.remove();
  }
}

// ✨ SHIMMER EFFECT
function addShimmer(element) {
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  
  const shimmer = document.createElement('div');
  shimmer.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.3), 
      transparent
    );
    pointer-events: none;
    z-index: 1;
  `;
  element.appendChild(shimmer);
  
  shimmer.animate([
    { left: '-100%' },
    { left: '100%' }
  ], {
    duration: 1000,
    easing: 'ease-in-out'
  }).onfinish = () => shimmer.remove();
}

// ✨ RIPPLE EFFECT
function createRipple(e, element) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    left: ${x}px;
    top: ${y}px;
    pointer-events: none;
    transform: scale(0);
  `;
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  ripple.animate([
    { transform: 'scale(0)', opacity: 1 },
    { transform: 'scale(2)', opacity: 0 }
  ], {
    duration: 600,
    easing: 'ease-out'
  }).onfinish = () => ripple.remove();
}

// Initialize: Build color mapping from HTML data attributes
function initializeProduct() {
  colorButtons.forEach(btn => {
    const colorKey = btn.dataset.color || btn.dataset.shade;
    const imageUrl = btn.dataset.image;
    
    if (colorKey && imageUrl) {
      colorImages[colorKey] = imageUrl;
    }
    
    // Set initial selected color from active button
    if (btn.classList.contains('active')) {
      selectedColor = colorKey;
    }
  });

  // If no active button found, select first button
  if (!selectedColor && colorButtons.length > 0) {
    const firstBtn = colorButtons[0];
    selectedColor = firstBtn.dataset.color || firstBtn.dataset.shade;
    firstBtn.classList.add('active');
  }

  console.log('Product initialized with colors:', colorImages);
  
  // ✨ Add entrance animation to main image
  if (mainImage) {
    mainImage.animate([
      { opacity: 0, transform: 'scale(0.95)' },
      { opacity: 1, transform: 'scale(1)' }
    ], {
      duration: 600,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    });
  }
}

// Image change with smooth transition
function changeColor(color) {
  if (!colorImages[color] && colorImages[color] !== '') {
    console.log('No custom image for color:', color);
    // Still allow color selection even without image
  }

  selectedColor = color;
  
  // Update active state
  colorButtons.forEach(btn => {
    const btnColor = btn.dataset.color || btn.dataset.shade;
    const isActive = btnColor === color;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-checked', isActive);
    
    // ✨ Pulse animation on newly active button
    if (isActive) {
      btn.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.15)' },
        { transform: 'scale(1)' }
      ], {
        duration: 400,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      });
    }
  });

  // Update shade info if available
  updateShadeInfo(color);

  // Smooth image transition (only if image URL exists)
  if (colorImages[color] && mainImage) {
    mainImage.classList.add('loading');
    
    // ✨ Enhanced image transition with scale
    mainImage.animate([
      { opacity: OPACITY_FULL, transform: 'scale(1) rotate(0deg)' },
      { opacity: OPACITY_LOW, transform: 'scale(0.95) rotate(-2deg)' }
    ], {
      duration: TRANSITION_DURATION / 2,
      easing: 'ease-in'
    });

    setTimeout(() => {
      mainImage.src = colorImages[color];
      mainImage.alt = `${document.querySelector('h2')?.textContent || 'Product'} - ${color}`;
      
      // ✨ Entrance animation for new image
      mainImage.animate([
        { opacity: 0, transform: 'scale(1.05) rotate(2deg)' },
        { opacity: OPACITY_FULL, transform: 'scale(1) rotate(0deg)' }
      ], {
        duration: TRANSITION_DURATION / 2,
        easing: 'ease-out'
      });
      
      mainImage.classList.remove('loading');
      addShimmer(mainImage);
    }, TRANSITION_DURATION / 2);
  }
}

// Update shade information display if elements exist
function updateShadeInfo(color) {
  if (!shadeInfo) return;

  const activeBtn = Array.from(colorButtons).find(btn => 
    (btn.dataset.color || btn.dataset.shade) === color
  );

  if (activeBtn && activeBtn.dataset.info) {
    try {
      const info = JSON.parse(activeBtn.dataset.info);
      
      if (shadeName) shadeName.textContent = info.name || formatColorName(color);
      if (shadeUndertone) shadeUndertone.textContent = info.undertone || '';
      if (shadeBestFor) shadeBestFor.textContent = info.bestFor || '';
      
      shadeInfo.style.display = 'block';
      
      // ✨ Fade in animation for shade info
      shadeInfo.animate([
        { opacity: 0, transform: 'translateY(-10px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 400,
        easing: 'ease-out'
      });
    } catch (e) {
      console.error('Error parsing shade info:', e);
    }
  }
}

// Format color name for display
function formatColorName(color) {
  return color.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Quantity management with validation
function getQuantity() {
  return parseInt(qtyInput.value) || 1;
}

function setQuantity(value) {
  const qty = Math.max(1, Math.min(99, parseInt(value) || 1));
  qtyInput.value = qty;
  
  // ✨ Number change animation
  if (qtyInput) {
    qtyInput.animate([
      { transform: 'scale(1.2)', color: '#9b7fd9' },
      { transform: 'scale(1)', color: '' }
    ], {
      duration: 200,
      easing: 'ease-out'
    });
  }
  
  return qty;
}

function increaseQty() {
  setQuantity(getQuantity() + 1);
}

function decreaseQty() {
  setQuantity(getQuantity() - 1);
}

// Notification system with dynamic color
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // Get notification color from active button or use default
  let bgColor = type === 'success' ? '#4caf50' : '#9b7fd9';
  
  const activeBtn = Array.from(colorButtons).find(btn => btn.classList.contains('active'));
  if (type !== 'success' && activeBtn && activeBtn.dataset.notificationColor) {
    bgColor = activeBtn.dataset.notificationColor;
  }
  
  notification.style.background = bgColor;
  notification.style.cssText += `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    color: white;
    border-radius: 8px;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(notification);
  
  // ✨ Entrance animation
  notification.animate([
    { transform: 'translateX(400px)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 }
  ], {
    duration: 400,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  });
  
  setTimeout(() => {
    notification.animate([
      { transform: 'translateX(0)', opacity: 1 },
      { transform: 'translateX(400px)', opacity: 0 }
    ], {
      duration: 300,
      easing: 'ease-in'
    }).onfinish = () => notification.remove();
  }, NOTIFICATION_DURATION);
}

// Cart functionality
function addToCart() {
  const qty = getQuantity();
  showNotification(`✅ Added ${qty} item(s) to cart successfully!`);
  console.log('Added to cart:', { shade: selectedColor, quantity: qty });
  
  // ✨ Button success animation
  if (addToCartBtn) {
    addToCartBtn.animate([
      { transform: 'scale(1)', background: '' },
      { transform: 'scale(0.95)', background: '#4caf50' },
      { transform: 'scale(1)', background: '' }
    ], {
      duration: 400,
      easing: 'ease-out'
    });
  }
}

function buyNow() {
  const qty = getQuantity();
  showNotification(`🛍️ Processing ${qty} item(s)... Redirecting to checkout!`);
  console.log('Buy now:', { shade: selectedColor, quantity: qty });
  
  // ✨ Button pulse animation
  if (buyNowBtn) {
    buyNowBtn.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' }
    ], {
      duration: 300,
      easing: 'ease-out'
    });
  }
  
  // Simulate redirect after delay
  setTimeout(() => {
    // window.location.href = 'checkout.html';
    console.log('Would redirect to checkout page');
  }, 2000);
}

// Event Listeners
function attachEventListeners() {
  colorButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const color = btn.dataset.color || btn.dataset.shade;
      changeColor(color);
      
      const rect = btn.getBoundingClientRect();
      const btnColor = window.getComputedStyle(btn).backgroundColor;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // ✨ Create sparkles at click position
      createSparkles(centerX, centerY, btnColor);
      
      // 💖 Create floating hearts
      createFloatingHearts(centerX, centerY, 3);
      
      // ✨ Create floating stars
      createFloatingParticles(centerX, centerY, '⭐', 2);
      
      createRipple(e, btn);
    });

    // ✨ Hover animations
    btn.addEventListener('mouseenter', () => {
      btn.animate([
        { transform: 'scale(1) translateY(0)' },
        { transform: 'scale(1.1) translateY(-2px)' }
      ], {
        duration: 200,
        easing: 'ease-out',
        fill: 'forwards'
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.animate([
        { transform: 'scale(1.1) translateY(-2px)' },
        { transform: 'scale(1) translateY(0)' }
      ], {
        duration: 200,
        easing: 'ease-in',
        fill: 'forwards'
      });
    });

    // Keyboard accessibility
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const color = btn.dataset.color || btn.dataset.shade;
        changeColor(color);
      }
    });
  });

  if (decreaseBtn) {
    decreaseBtn.addEventListener('click', (e) => {
      decreaseQty();
      createRipple(e, decreaseBtn);
    });
  }
  
  if (increaseBtn) {
    increaseBtn.addEventListener('click', (e) => {
      increaseQty();
      createRipple(e, increaseBtn);
    });
  }
  
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', (e) => {
      addToCart();
      const rect = addToCartBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      createSparkles(centerX, centerY, '#4caf50');
      
      // 💖 Lots of hearts when adding to cart!
      createFloatingHearts(centerX, centerY, 8);
      
      // 🛒 Shopping bags
      createFloatingParticles(centerX, centerY, '🛍️', 2);
    });
    
    // ✨ Hover effect
    addToCartBtn.addEventListener('mouseenter', () => {
      addShimmer(addToCartBtn);
    });
  }
  
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', (e) => {
      buyNow();
      const rect = buyNowBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      createSparkles(centerX, centerY, '#9b7fd9');
      
      // 💖 Hearts for purchase
      createFloatingHearts(centerX, centerY, 6);
      
      // ✨ Extra sparkles and stars
      createFloatingParticles(centerX, centerY, '✨', 4);
      createFloatingParticles(centerX, centerY, '💫', 3);
    });
    
    // ✨ Hover effect
    buyNowBtn.addEventListener('mouseenter', () => {
      addShimmer(buyNowBtn);
    });
  }

  // Input validation
  if (qtyInput) {
    qtyInput.addEventListener('input', (e) => {
      setQuantity(e.target.value);
    });

    qtyInput.addEventListener('blur', () => {
      setQuantity(qtyInput.value);
    });
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeProduct();
  attachEventListeners();
});

// If DOM is already loaded
if (document.readyState !== 'loading') {
  initializeProduct();
  attachEventListeners();
}