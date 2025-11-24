
// PRODUCTS PAGE JAVASCRIPT
// ==========================================

/* Product Array - مصفوفة المنتجات */
const products = [
  // Face Products - منتجات الوجه
  { 
    name: "Sheglam Foundation", 
    price: "$12", 
    category: "face", 
    img: "images of My PROJECT/sheglam Foundation1.jpg",
    link: "product-foundation.html"
  },
  { 
    name: "Sheglam Concealer", 
    price: "$10", 
    category: "face", 
    img: "images of My PROJECT/sheglam concealer.jpg",
    link: "product-concealer.html"
  },
  { 
    name: "Sheglam Blush", 
    price: "$8", 
    category: "face", 
    img: "images of My PROJECT/sheglam Blush1.jpg",
    link: "product-blush.html"
  },
  { 
    name: "Sheglam Highlighter", 
    price: "$9", 
    category: "face", 
    img: "images of My PROJECT/sheglam hiliter3.jpg",
    link: "product-highlighter.html"
  },
  { 
    name: "Sheglam Primer", 
    price: "$11", 
    category: "face", 
    img: "images of My PROJECT/sheglam primir.Webp",
    link: "product-primer.html"
  },
  { 
    name: "Sheglam Setting Spray", 
    price: "$13", 
    category: "face", 
    img: "images of My PROJECT/sheglam Setting Spray.jpg",
    link: "product-setting-spray.html"
  },
  { 
    name: "Sheglam Contour", 
    price: "$10", 
    category: "face", 
    img: "images of My PROJECT/sheglam countour 2.jpg",
    link: "product-contour.html"
  },
  { 
    name: "Sheglam Powder", 
    price: "$7", 
    category: "face", 
    img: "images of My PROJECT/sheglam powder.jpg",
    link: "product-powder.html"
  },

  // Eye Products - منتجات العيون
  { 
    name: "Sheglam Mascara", 
    price: "$6", 
    category: "eye", 
    img: "images of My PROJECT/sheglam muscara.jpg",
    link: "product-mascara.html"
  },
  { 
    name: "Sheglam Eyeliner", 
    price: "$5", 
    category: "eye", 
    img: "images of My PROJECT/sheglam eyeliner1.jpg",
    link: "product-eyeliner.html"
  },
  { 
    name: "Sheglam Eyeshadow", 
    price: "$15", 
    category: "eye", 
    img: "images of My PROJECT/sheglam eyeshadow1.jpg",
    link: "product-eyeshadow.html"
  },
  { 
    name: "Sheglam Brow Gel", 
    price: "$20", 
    category: "eye", 
    img: "images of My PROJECT/sheglam broe gel1.jpg",
    link: "product-brow-gel.html"
  },
  { 
    name: "Sheglam Lashes", 
    price: "$12", 
    category: "eye", 
    img: "images of My PROJECT/sheglam lashes2.jpg",
    link: "product-lashes.html"
  },
  { 
    name: "Sheglam Eye Primer", 
    price: "$8", 
    category: "eye", 
    img: "images of My PROJECT/sheglam eyeprimer.jpg",
    link: "product-eye-primer.html"
  },
  { 
    name: "Sheglam Glitter", 
    price: "$11", 
    category: "eye", 
    img: "images of My PROJECT/sheglam glitter.jpg",
    link: "product-glitter.html"
  },
  { 
    name: "Sheglam Eye Brush", 
    price: "$9", 
    category: "eye", 
    img: "images of My PROJECT/sheglam eyebrush.jpg",
    link: "product-eye-brush.html"
  },

  // Lip Products - منتجات الشفاه
  { 
    name: "Sheglam Lipstick", 
    price: "$10", 
    category: "lips", 
    img: "images of My PROJECT/sheglam lipstick3.jpg",
    link: "product-lipstick.html"
  },
  { 
    name: "Sheglam Lip Gloss", 
    price: "$8", 
    category: "lips", 
    img: "images of My PROJECT/sheglam lipgloss.jpg",
    link: "product-lip-gloss.html"
  },
  { 
    name: "Sheglam Lip Oil", 
    price: "$9", 
    category: "lips", 
    img: "images of My PROJECT/sheglam lipoil.jpg",
    link: "product-lip-oil.html"
  },
  { 
    name: "Sheglam Lip Liner", 
    price: "$6", 
    category: "lips", 
    img: "images of My PROJECT/sheglam lipliner.jpg",
    link: "product-lip-liner.html"
  },
  { 
    name: "Sheglam Matte Lipstick", 
    price: "$11", 
    category: "lips", 
    img: "images of My PROJECT/sheglam mattelipstack.jpg",
    link: "product-matte-lipstick.html"
  },
  { 
    name: "Sheglam Liquid Lip", 
    price: "$13", 
    category: "lips", 
    img: "images of My PROJECT/sheglam liquedoil1.jpg",
    link: "product-liquid-lip.html"
  },
  { 
    name: "Sheglam Balm", 
    price: "$7", 
    category: "lips", 
    img: "images of My PROJECT/sheglam balm1.jpg",
    link: "product-balm.html"
  },
  { 
    name: "Sheglam Lip Tint", 
    price: "$10", 
    category: "lips", 
    img: "images of My PROJECT/sheglam tent2.jpg",
    link: "product-lip-tint.html"
  },
];

/* Main variable for displaying cards - متغير رئيسي لعرض الكروت */
const grid = document.getElementById("productGrid");

/* Function to display products - دالة عرض المنتجات */
function displayProducts(category, searchTerm = "") {
  grid.innerHTML = "";

  // Filter by category and search term - فلترة حسب الفئة والبحث
  const filtered = products.filter(p => {
    const byCategory = category === "all" || p.category === category;
    const bySearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return byCategory && bySearch;
  });

  // Create product cards - إنشاء الكروت
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop'">
      <h3>${p.name}</h3>
      <p>${p.price}</p>
      <button class="view-btn" onclick="viewDetails('${p.link}')">View Details</button>
    `;
    grid.appendChild(card);
  });

  // Show message if no products found - رسالة إذا لم يتم العثور على منتجات
  if (filtered.length === 0) {
    grid.innerHTML = '<p class="no-products">No products found 😞<br>Try a different search or category</p>';
  }
}

/* Display all products initially - عرض كل المنتجات في البداية */
displayProducts("all");

/* Filter buttons - أزرار الفلترة */
const buttons = document.querySelectorAll(".filter-btn");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    displayProducts(btn.dataset.category, searchInput.value);
  });
});

/* Product search - البحث عن منتج */
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  const activeBtn = document.querySelector(".filter-btn.active");
  const category = activeBtn ? activeBtn.dataset.category : "all";
  displayProducts(category, searchInput.value);
});

/* Navigate to product details page - الانتقال لصفحة تفاصيل المنتج */
function viewDetails(productLink) {
  if (productLink) {
    window.location.href = productLink;
  } else {
    alert("Product page coming soon! 💖");
  }
}