
/* Product Array - مصفوفة المنتجات */
const products = [
  // Face Products - منتجات الوجه
  { 
    name: "Sheglam Foundation", 
    price: "$10.99", 
    category: "face", 
    img: "foundation heart.jpg",
    link: "product-foundation.html"
  },
  { 
    name: "Sheglam Concealer", 
    price: "$10.99", 
    category: "face", 
    img: "concealer heart.jpg",
    link: "product-concealer.html"
  },
  { 
    name: "Sheglam Blush", 
    price: "$8.00", 
    category: "face", 
    img: "blush heart.jpg",
    link: "product.blush.html"
  },
  { 
    name: "Sheglam Highlighter", 
    price: "$9.99", 
    category: "face", 
    img: "highlighter heart.jpg",
    link: "product.highlighter.html"
  },
  { 
    name: "Sheglam Primer", 
    price: "$6.99", 
    category: "face", 
    img: "primer heart.jpg",
    link: "product primer.html"
  },
  { 
    name: "Sheglam Setting Spray", 
    price: "$5.99", 
    category: "face", 
    img: "spray heart.jpg",
    link: "product spray.html"
  },
  { 
    name: "Sheglam Contour", 
    price: "$10.99", 
    category: "face", 
    img: "contour heart.jpg",
    link: "product-contour.html"
  },
  { 
    name: "Sheglam Powder", 
    price: "$7.99", 
    category: "face", 
    img: "setting powder heart.jpg",
    link: "product-setting powder.html"
  },

  // Eye Products - منتجات العيون
  { 
    name: "Sheglam Mascara", 
    price: "$8.99", 
    category: "eye", 
    img: "mascara.jpg",
    link: "product.mascara.html"
  },
  { 
    name: "Sheglam Eyeliner", 
    price: "$5.99", 
    category: "eye", 
    img: "linear heart.jpg",
    link: "product.eyeliner.html"
  },
  { 
    name: "Sheglam Eyeshadow", 
    price: "$12.99", 
    category: "eye", 
    img: "eyes.jpg",
    link: "product.Eyeshadow.html"
  },
  { 
    name: "Sheglam Brow Gel", 
    price: "$20.49", 
    category: "eye", 
    img: "brow heart.jpg",
    link: "product-brow Gel.html"
  },
  { 
    name: "Sheglam Lashes", 
    price: "$12.99", 
    category: "eye", 
    img: "lashes heart.jpg",
    link: "product-lashes.html"
  },
  { 
    name: "Sheglam Eye Primer", 
    price: "$8.49", 
    category: "eye", 
    img: "eye primer heart.jpg",
    link: "product-eye primer.html"
  },
  { 
    name: "Sheglam Glitter", 
    price: "$11.99", 
    category: "eye", 
    img: "gilter heart.jpg",
    link: "product-gilter.html"
  },
  { 
    name: "Sheglam Eye Brush", 
    price: "$9.00", 
    category: "eye", 
    img: "eye brush heart.jpg",
    link: "product eye brush.html"
  },

  // Lip Products - منتجات الشفاه
  { 
    name: "Sheglam Lipstick", 
    price: "$11.00", 
    category: "lips", 
    img: "lip stick heart.jpg",
    link: "product.lipstick.html"
  },
  { 
    name: "Sheglam Lip Gloss", 
    price: "$6.50", 
    category: "lips", 
    img: "16298001091e62d86b89328f3add1fc986f2633308_wk_sheglam loco for coco.jpg",
    link: "product-lip.html"
  },
  { 
    name: "Sheglam Lip Oil", 
    price: "$9.00", 
    category: "lips", 
    img: "lip oil heart.jpg",
    link: "product-lip oil.html"
  },
  { 
    name: "Sheglam Lip Liner", 
    price: "$6.49", 
    category: "lips", 
    img: "lip liner heart.jpg",
    link: "product-lip liner.html"
  },
  { 
    name: "Sheglam Matte Lipstick", 
    price: "$11.00", 
    category: "lips", 
    img: "lip stick heart.jpg",
    link: "product.lipstick.html"
  },
   
  { 
    name: "Sheglam Lip Tint", 
    price: "$10.99", 
    category: "lips", 
    img: "lip tint heart.jpg",
    link: "product -lip tint.html"
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

