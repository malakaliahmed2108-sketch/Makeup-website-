const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/sheglam';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Models (simplified for seeding)
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
}));

const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  category: String,
  subcategory: String,
  brand: String,
  images: [String],
  inStock: { type: Boolean, default: true },
  stockQuantity: Number,
  rating: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
}));

// Sample Data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@sheglam.com',
      password: adminPassword,
      phone: '+20123456789',
      role: 'admin'
    });
    console.log('✅ Admin created:', admin.email);

    // Create Regular User
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await User.create({
      name: 'Sarah Ahmed',
      email: 'sarah@example.com',
      password: userPassword,
      phone: '+20111222333',
      role: 'user'
    });
    console.log('✅ User created:', user.email);

    // Sample Products
    const products = [
      {
        name: 'Luxury Glossy Lipstick',
        description: 'Long-lasting glossy lipstick with rich color and comfortable wear. Available in 12 stunning shades.',
        price: 25,
        originalPrice: 35,
        discount: 29,
        category: 'Lips',
        subcategory: 'Lipstick',
        brand: 'SHEGLAM',
        images: ['/uploads/lipstick1.jpg'],
        stockQuantity: 50,
        rating: 4.5,
        featured: true,
        tags: ['bestseller', 'new', 'glossy']
      },
      {
        name: 'Smooth & Light Foundation',
        description: 'Lightweight foundation with buildable coverage. Perfect for all skin types. SPF 15 protection.',
        price: 23,
        originalPrice: 30,
        discount: 23,
        category: 'Face',
        subcategory: 'Foundation',
        brand: 'SHEGLAM',
        images: ['/uploads/foundation1.jpg'],
        stockQuantity: 40,
        rating: 4.7,
        featured: true,
        tags: ['bestseller', 'lightweight']
      },
      {
        name: 'Elegant Eyeshadow Palette',
        description: '12 highly pigmented shades from neutral to bold. Perfect for day and night looks.',
        price: 22,
        originalPrice: 32,
        discount: 31,
        category: 'Eyes',
        subcategory: 'Eyeshadow',
        brand: 'SHEGLAM',
        images: ['/uploads/eyeshadow1.jpg'],
        stockQuantity: 30,
        rating: 4.8,
        featured: true,
        tags: ['palette', 'bestseller']
      },
      {
        name: 'Unique Signature Perfume',
        description: 'Luxury oriental fragrance with notes of jasmine, amber, and vanilla. Long-lasting scent.',
        price: 32,
        originalPrice: 45,
        discount: 29,
        category: 'Fragrance',
        subcategory: 'Perfume',
        brand: 'SHEGLAM',
        images: ['/uploads/perfume1.jpg'],
        stockQuantity: 25,
        rating: 4.6,
        featured: true,
        tags: ['luxury', 'oriental']
      },
      {
        name: 'Waterproof Mascara',
        description: 'Volumizing waterproof mascara for dramatic lashes. Smudge-proof and long-lasting.',
        price: 18,
        originalPrice: 25,
        discount: 28,
        category: 'Eyes',
        subcategory: 'Mascara',
        brand: 'SHEGLAM',
        images: ['/uploads/mascara1.jpg'],
        stockQuantity: 60,
        rating: 4.4,
        featured: false,
        tags: ['waterproof', 'volumizing']
      },
      {
        name: 'Matte Liquid Lipstick',
        description: 'Ultra-matte liquid lipstick with intense color payoff. Comfortable all-day wear.',
        price: 20,
        originalPrice: 28,
        discount: 29,
        category: 'Lips',
        subcategory: 'Liquid Lipstick',
        brand: 'SHEGLAM',
        images: ['/uploads/liquid-lip1.jpg'],
        stockQuantity: 45,
        rating: 4.3,
        featured: false,
        tags: ['matte', 'long-lasting']
      },
      {
        name: 'HD Concealer',
        description: 'High-definition concealer for flawless coverage. Brightens and perfects skin.',
        price: 19,
        originalPrice: 26,
        discount: 27,
        category: 'Face',
        subcategory: 'Concealer',
        brand: 'SHEGLAM',
        images: ['/uploads/concealer1.jpg'],
        stockQuantity: 55,
        rating: 4.6,
        featured: false,
        tags: ['hd', 'brightening']
      },
      {
        name: 'Brow Pencil Duo',
        description: 'Dual-ended brow pencil with spoolie brush. Natural-looking defined brows.',
        price: 15,
        originalPrice: 20,
        discount: 25,
        category: 'Eyes',
        subcategory: 'Brow',
        brand: 'SHEGLAM',
        images: ['/uploads/brow1.jpg'],
        stockQuantity: 70,
        rating: 4.5,
        featured: false,
        tags: ['brows', 'natural']
      },
      {
        name: 'Glow Setting Spray',
        description: 'Radiant finish setting spray that locks makeup in place. Hydrating formula.',
        price: 24,
        originalPrice: 32,
        discount: 25,
        category: 'Face',
        subcategory: 'Setting Spray',
        brand: 'SHEGLAM',
        images: ['/uploads/spray1.jpg'],
        stockQuantity: 35,
        rating: 4.7,
        featured: false,
        tags: ['glow', 'setting']
      },
      {
        name: 'Cream Blush',
        description: 'Buildable cream blush for a natural flush. Blends seamlessly into skin.',
        price: 17,
        originalPrice: 23,
        discount: 26,
        category: 'Face',
        subcategory: 'Blush',
        brand: 'SHEGLAM',
        images: ['/uploads/blush1.jpg'],
        stockQuantity: 50,
        rating: 4.4,
        featured: false,
        tags: ['cream', 'natural']
      },
      {
        name: 'Hydrating Face Serum',
        description: 'Hyaluronic acid serum for intense hydration. Plumps and smooths skin.',
        price: 28,
        originalPrice: 38,
        discount: 26,
        category: 'Skincare',
        subcategory: 'Serum',
        brand: 'SHEGLAM',
        images: ['/uploads/serum1.jpg'],
        stockQuantity: 40,
        rating: 4.8,
        featured: true,
        tags: ['skincare', 'hydrating']
      },
      {
        name: 'Vitamin C Moisturizer',
        description: 'Brightening moisturizer with vitamin C. Evens skin tone and provides hydration.',
        price: 26,
        originalPrice: 35,
        discount: 26,
        category: 'Skincare',
        subcategory: 'Moisturizer',
        brand: 'SHEGLAM',
        images: ['/uploads/moisturizer1.jpg'],
        stockQuantity: 45,
        rating: 4.7,
        featured: true,
        tags: ['skincare', 'brightening', 'vitamin-c']
      }
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin - Email: admin@sheglam.com, Password: admin123');
    console.log('User  - Email: sarah@example.com, Password: user123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();