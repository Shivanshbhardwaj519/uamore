// Global Variables
let currentUser = null;
let cart = JSON.parse(localStorage.getItem('uamore_cart')) || [];
let products = [];
let filteredProducts = [];

// API Base URL (change this to your deployed backend URL)
const API_BASE_URL = 'http://localhost:3000/api';

// Sample Product Data (40+ products)
const sampleProducts = [
    {
        id: 1,
        name: "Midnight Essence",
        category: "oriental",
        collection: "signature",
        price: 199,
        originalPrice: 249,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop",
        description: "A captivating blend of dark spices and warm amber that evokes the mystery of midnight.",
        rating: 4.8,
        reviews: 124,
        inStock: true,
        featured: true,
        scent: "Oriental, Woody, Spicy",
        longevity: "8-10 hours",
        sillage: "Heavy"
    },
    {
        id: 2,
        name: "Garden Dreams",
        category: "floral",
        collection: "seasonal",
        price: 159,
        originalPrice: 189,
        image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400&h=500&fit=crop",
        description: "Fresh florals meet dewy greens in this enchanting garden-inspired fragrance.",
        rating: 4.6,
        reviews: 89,
        inStock: true,
        featured: true,
        scent: "Floral, Green, Fresh",
        longevity: "6-8 hours",
        sillage: "Moderate"
    },
    {
        id: 3,
        name: "Ocean Breeze",
        category: "fresh",
        collection: "seasonal",
        price: 139,
        originalPrice: 169,
        image: "https://images.unsplash.com/photo-1594736797933-d0bdb73d3061?w=400&h=500&fit=crop",
        description: "Crisp ocean air meets sun-kissed citrus in this refreshing aquatic composition.",
        rating: 4.4,
        reviews: 67,
        inStock: true,
        featured: false,
        scent: "Aquatic, Citrus, Marine",
        longevity: "5-7 hours",
        sillage: "Light"
    },
    {
        id: 4,
        name: "Golden Hour",
        category: "citrus",
        collection: "signature",
        price: 179,
        originalPrice: 199,
        image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=500&fit=crop",
        description: "Warm citrus embraced by golden amber, capturing the magic of sunset.",
        rating: 4.7,
        reviews: 156,
        inStock: true,
        featured: true,
        scent: "Citrus, Amber, Warm",
        longevity: "7-9 hours",
        sillage: "Moderate"
    },
    {
        id: 5,
        name: "Velvet Rose",
        category: "floral",
        collection: "limited",
        price: 219,
        originalPrice: 259,
        image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=500&fit=crop",
        description: "Luxurious Bulgarian rose petals wrapped in smooth vanilla and musk.",
        rating: 4.9,
        reviews: 203,
        inStock: false,
        featured: true,
        scent: "Rose, Vanilla, Musk",
        longevity: "10-12 hours",
        sillage: "Heavy"
    },
    {
        id: 6,
        name: "Urban Legend",
        category: "woody",
        collection: "unisex",
        price: 189,
        originalPrice: 229,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
        description: "Bold cedarwood and smoky vetiver create an urban sophistication.",
        rating: 4.5,
        reviews: 91,
        inStock: true,
        featured: false,
        scent: "Woody, Smoky, Bold",
        longevity: "8-10 hours",
        sillage: "Heavy"
    },
    {
        id: 7,
        name: "Crystal Waters",
        category: "fresh",
        collection: "seasonal",
        price: 145,
        originalPrice: 165,
        image: "https://images.unsplash.com/photo-1592425997841-d6c60c2aafb5?w=400&h=500&fit=crop",
        description: "Pure and crystalline, like morning dew on mountain springs.",
        rating: 4.3,
        reviews: 78,
        inStock: true,
        featured: false,
        scent: "Aquatic, Clean, Fresh",
        longevity: "4-6 hours",
        sillage: "Light"
    },
    {
        id: 8,
        name: "Spiced Amber",
        category: "oriental",
        collection: "signature",
        price: 205,
        originalPrice: 235,
        image: "https://images.unsplash.com/photo-1563170062-6ca801ac2ba4?w=400&h=500&fit=crop",
        description: "Rich amber infused with exotic spices from ancient trade routes.",
        rating: 4.6,
        reviews: 142,
        inStock: true,
        featured: true,
        scent: "Amber, Spices, Warm",
        longevity: "9-11 hours",
        sillage: "Heavy"
    },
    {
        id: 9,
        name: "White Jasmine",
        category: "floral",
        collection: "limited",
        price: 175,
        originalPrice: 195,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
        description: "Intoxicating white jasmine blooms captured at their most fragrant hour.",
        rating: 4.8,
        reviews: 167,
        inStock: true,
        featured: true,
        scent: "Jasmine, White Flowers, Soft",
        longevity: "7-9 hours",
        sillage: "Moderate"
    },
    {
        id: 10,
        name: "Bergamot Fizz",
        category: "citrus",
        collection: "seasonal",
        price: 129,
        originalPrice: 149,
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=500&fit=crop",
        description: "Effervescent bergamot with sparkling citrus notes that energize the soul.",
        rating: 4.2,
        reviews: 95,
        inStock: true,
        featured: false,
        scent: "Bergamot, Citrus, Sparkling",
        longevity: "5-7 hours",
        sillage: "Moderate"
    },
    {
        id: 11,
        name: "Sandalwood Dreams",
        category: "woody",
        collection: "unisex",
        price: 195,
        originalPrice: 225,
        image: "https://images.unsplash.com/photo-1582297023611-5d8b9e1c2ca1?w=400&h=500&fit=crop",
        description: "Creamy sandalwood blended with soft musks and tender florals.",
        rating: 4.7,
        reviews: 134,
        inStock: true,
        featured: false,
        scent: "Sandalwood, Musk, Soft",
        longevity: "8-10 hours",
        sillage: "Moderate"
    },
    {
        id: 12,
        name: "Chocolate Vanilla",
        category: "gourmand",
        collection: "limited",
        price: 165,
        originalPrice: 185,
        image: "https://images.unsplash.com/photo-1582819509237-66d1c3c01eb7?w=400&h=500&fit=crop",
        description: "Decadent chocolate and warm vanilla create an irresistible gourmand delight.",
        rating: 4.5,
        reviews: 112,
        inStock: true,
        featured: true,
        scent: "Chocolate, Vanilla, Sweet",
        longevity: "6-8 hours",
        sillage: "Moderate"
    },
    {
        id: 13,
        name: "Lavender Fields",
        category: "floral",
        collection: "seasonal",
        price: 155,
        originalPrice: 175,
        image: "https://images.unsplash.com/photo-1593465143532-8b83e5a0fbb5?w=400&h=500&fit=crop",
        description: "Pure French lavender from the fields of Provence, calming and serene.",
        rating: 4.4,
        reviews: 88,
        inStock: true,
        featured: false,
        scent: "Lavender, Herbs, Calm",
        longevity: "6-8 hours",
        sillage: "Light"
    },
    {
        id: 14,
        name: "Black Pepper",
        category: "oriental",
        collection: "unisex",
        price: 185,
        originalPrice: 205,
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=500&fit=crop",
        description: "Bold black pepper with smoky incense and dark woods.",
        rating: 4.3,
        reviews: 76,
        inStock: true,
        featured: false,
        scent: "Black Pepper, Smoke, Dark",
        longevity: "7-9 hours",
        sillage: "Heavy"
    },
    {
        id: 15,
        name: "Lemon Verbena",
        category: "citrus",
        collection: "seasonal",
        price: 135,
        originalPrice: 155,
        image: "https://images.unsplash.com/photo-1606133841019-6e30f9eb4b1b?w=400&h=500&fit=crop",
        description: "Zesty lemon verbena with green herbs and morning freshness.",
        rating: 4.1,
        reviews: 65,
        inStock: true,
        featured: false,
        scent: "Lemon, Verbena, Green",
        longevity: "4-6 hours",
        sillage: "Light"
    },
    {
        id: 16,
        name: "Oud Mystique",
        category: "oriental",
        collection: "limited",
        price: 299,
        originalPrice: 349,
        image: "https://images.unsplash.com/photo-1574798036036-9e3abc0a0c0e?w=400&h=500&fit=crop",
        description: "Rare oud wood from ancient trees, mysterious and captivating.",
        rating: 4.9,
        reviews: 187,
        inStock: false,
        featured: true,
        scent: "Oud, Wood, Mysterious",
        longevity: "12+ hours",
        sillage: "Heavy"
    },
    {
        id: 17,
        name: "Pink Peony",
        category: "floral",
        collection: "seasonal",
        price: 149,
        originalPrice: 169,
        image: "https://images.unsplash.com/photo-1576425518779-e4f3b8de14a0?w=400&h=500&fit=crop",
        description: "Soft pink peony petals with dewdrops and gentle breeze.",
        rating: 4.6,
        reviews: 103,
        inStock: true,
        featured: false,
        scent: "Peony, Pink, Soft",
        longevity: "5-7 hours",
        sillage: "Light"
    },
    {
        id: 18,
        name: "Cedar Storm",
        category: "woody",
        collection: "unisex",
        price: 199,
        originalPrice: 219,
        image: "https://images.unsplash.com/photo-1578410256825-e0ad2b075ae8?w=400&h=500&fit=crop",
        description: "Wild cedar from stormy mountains with rain-soaked earth.",
        rating: 4.4,
        reviews: 89,
        inStock: true,
        featured: false,
        scent: "Cedar, Storm, Earth",
        longevity: "8-10 hours",
        sillage: "Heavy"
    },
    {
        id: 19,
        name: "Honey Almond",
        category: "gourmand",
        collection: "signature",
        price: 175,
        originalPrice: 195,
        image: "https://images.unsplash.com/photo-1570553671018-e2d4e37de25b?w=400&h=500&fit=crop",
        description: "Golden honey drizzled over roasted almonds with warm spices.",
        rating: 4.7,
        reviews: 145,
        inStock: true,
        featured: true,
        scent: "Honey, Almond, Warm",
        longevity: "7-9 hours",
        sillage: "Moderate"
    },
    {
        id: 20,
        name: "Sea Salt",
        category: "fresh",
        collection: "seasonal",
        price: 125,
        originalPrice: 145,
        image: "https://images.unsplash.com/photo-1571841059137-04b37772ddd6?w=400&h=500&fit=crop",
        description: "Ocean breeze with sea salt crystals and driftwood.",
        rating: 4.0,
        reviews: 72,
        inStock: true,
        featured: false,
        scent: "Sea Salt, Ocean, Breeze",
        longevity: "4-6 hours",
        sillage: "Light"
    },
    {
        id: 21,
        name: "Purple Iris",
        category: "floral",
        collection: "limited",
        price: 189,
        originalPrice: 209,
        image: "https://images.unsplash.com/photo-1612198186734-5c0f93f0b6f8?w=400&h=500&fit=crop",
        description: "Elegant purple iris with powdery notes and royal sophistication.",
        rating: 4.8,
        reviews: 156,
        inStock: true,
        featured: true,
        scent: "Iris, Purple, Powder",
        longevity: "8-10 hours",
        sillage: "Moderate"
    },
    {
        id: 22,
        name: "Grapefruit Mint",
        category: "citrus",
        collection: "seasonal",
        price: 139,
        originalPrice: 159,
        image: "https://images.unsplash.com/photo-1598843506436-e7dcc20b6f5d?w=400&h=500&fit=crop",
        description: "Juicy grapefruit with cooling mint leaves and morning energy.",
        rating: 4.3,
        reviews: 84,
        inStock: true,
        featured: false,
        scent: "Grapefruit, Mint, Fresh",
        longevity: "5-7 hours",
        sillage: "Moderate"
    },
    {
        id: 23,
        name: "Tobacco Leather",
        category: "oriental",
        collection: "unisex",
        price: 225,
        originalPrice: 255,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=500&fit=crop",
        description: "Rich tobacco leaves with supple leather and vintage charm.",
        rating: 4.6,
        reviews: 127,
        inStock: true,
        featured: false,
        scent: "Tobacco, Leather, Vintage",
        longevity: "9-11 hours",
        sillage: "Heavy"
    },
    {
        id: 24,
        name: "Cotton Blossom",
        category: "fresh",
        collection: "seasonal",
        price: 145,
        originalPrice: 165,
        image: "https://images.unsplash.com/photo-1583297845188-6b8fb04b4ed9?w=400&h=500&fit=crop",
        description: "Soft cotton blossoms with clean linens and sunny meadows.",
        rating: 4.2,
        reviews: 91,
        inStock: true,
        featured: false,
        scent: "Cotton, Clean, Soft",
        longevity: "5-7 hours",
        sillage: "Light"
    },
    {
        id: 25,
        name: "Wild Orchid",
        category: "floral",
        collection: "limited",
        price: 209,
        originalPrice: 239,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop",
        description: "Exotic wild orchids from tropical rainforests, rare and beautiful.",
        rating: 4.7,
        reviews: 138,
        inStock: true,
        featured: true,
        scent: "Orchid, Exotic, Tropical",
        longevity: "8-10 hours",
        sillage: "Moderate"
    },
    {
        id: 26,
        name: "Pine Forest",
        category: "woody",
        collection: "seasonal",
        price: 169,
        originalPrice: 189,
        image: "https://images.unsplash.com/photo-1570723212663-b8e7c5c42ed3?w=400&h=500&fit=crop",
        description: "Deep pine forest with evergreen needles and mountain air.",
        rating: 4.4,
        reviews: 96,
        inStock: true,
        featured: false,
        scent: "Pine, Forest, Green",
        longevity: "7-9 hours",
        sillage: "Moderate"
    },
    {
        id: 27,
        name: "Caramel Apple",
        category: "gourmand",
        collection: "seasonal",
        price: 155,
        originalPrice: 175,
        image: "https://images.unsplash.com/photo-1583772072775-d12c8c66b7b5?w=400&h=500&fit=crop",
        description: "Sweet caramel drizzled over crisp autumn apples.",
        rating: 4.5,
        reviews: 115,
        inStock: true,
        featured: false,
        scent: "Caramel, Apple, Sweet",
        longevity: "6-8 hours",
        sillage: "Moderate"
    },
    {
        id: 28,
        name: "Silver Rain",
        category: "fresh",
        collection: "unisex",
        price: 135,
        originalPrice: 155,
        image: "https://images.unsplash.com/photo-1571842951486-5b8b85ca7b6f?w=400&h=500&fit=crop",
        description: "Cool silver rain with metallic notes and stormy skies.",
        rating: 4.1,
        reviews: 73,
        inStock: true,
        featured: false,
        scent: "Rain, Metal, Cool",
        longevity: "4-6 hours",
        sillage: "Light"
    },
    {
        id: 29,
        name: "Royal Gardenia",
        category: "floral",
        collection: "signature",
        price: 195,
        originalPrice: 225,
        image: "https://images.unsplash.com/photo-1590077174761-ae7cd0f02c70?w=400&h=500&fit=crop",
        description: "Majestic gardenia blooms with creamy petals and royal elegance.",
        rating: 4.8,
        reviews: 168,
        inStock: true,
        featured: true,
        scent: "Gardenia, Creamy, Royal",
        longevity: "8-10 hours",
        sillage: "Heavy"
    },
    {
        id: 30,
        name: "Blood Orange",
        category: "citrus",
        collection: "seasonal",
        price: 149,
        originalPrice: 169,
        image: "https://images.unsplash.com/photo-1582819506234-d3c8b4e3f8b2?w=400&h=500&fit=crop",
        description: "Rich blood orange with Mediterranean sunshine and zesty energy.",
        rating: 4.4,
        reviews: 107,
        inStock: true,
        featured: false,
        scent: "Blood Orange, Zesty, Sun",
        longevity: "5-7 hours",
        sillage: "Moderate"
    },
    {
        id: 31,
        name: "Frankincense",
        category: "oriental",
        collection: "limited",
        price: 259,
        originalPrice: 289,
        image: "https://images.unsplash.com/photo-1578342805872-ae1f46518bde?w=400&h=500&fit=crop",
        description: "Sacred frankincense resin with ancient mysticism and divine aroma.",
        rating: 4.9,
        reviews: 192,
        inStock: false,
        featured: true,
        scent: "Frankincense, Sacred, Divine",
        longevity: "10-12 hours",
        sillage: "Heavy"
    },
    {
        id: 32,
        name: "Bamboo Breeze",
        category: "fresh",
        collection: "unisex",
        price: 129,
        originalPrice: 149,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
        description: "Green bamboo shoots with Asian garden tranquility.",
        rating: 4.2,
        reviews: 86,
        inStock: true,
        featured: false,
        scent: "Bamboo, Green, Zen",
        longevity: "5-7 hours",
        sillage: "Light"
    },
    {
        id: 33,
        name: "Midnight Rose",
        category: "floral",
        collection: "limited",
        price: 199,
        originalPrice: 229,
        image: "https://images.unsplash.com/photo-1574798036036-9e3abc0a0c0e?w=400&h=500&fit=crop",
        description: "Dark roses blooming under moonlight with mysterious allure.",
        rating: 4.7,
        reviews: 154,
        inStock: true,
        featured: true,
        scent: "Dark Rose, Moon, Mystery",
        longevity: "9-11 hours",
        sillage: "Heavy"
    },
    {
        id: 34,
        name: "Eucalyptus",
        category: "fresh",
        collection: "seasonal",
        price: 139,
        originalPrice: 159,
        image: "https://images.unsplash.com/photo-1583772072775-d12c8c66b7b5?w=400&h=500&fit=crop",
        description: "Cooling eucalyptus leaves with spa-like serenity and healing touch.",
        rating: 4.3,
        reviews: 79,
        inStock: true,
        featured: false,
        scent: "Eucalyptus, Cool, Healing",
        longevity: "4-6 hours",
        sillage: "Light"
    },
    {
        id: 35,
        name: "Amber Moon",
        category: "oriental",
        collection: "signature",
        price: 215,
        originalPrice: 245,
        image: "https://images.unsplash.com/photo-1578410256825-e0ad2b075ae8?w=400&h=500&fit=crop",
        description: "Golden amber glowing under full moon with celestial warmth.",
        rating: 4.6,
        reviews: 132,
        inStock: true,
        featured: true,
        scent: "Amber, Moon, Golden",
        longevity: "8-10 hours",
        sillage: "Heavy"
    },
    {
        id: 36,
        name: "Coconut Palm",
        category: "gourmand",
        collection: "seasonal",
        price: 145,
        originalPrice: 165,
        image: "https://images.unsplash.com/photo-1574798036036-9e3abc0a0c0e?w=400&h=500&fit=crop",
        description: "Tropical coconut with palm leaves and beach paradise vibes.",
        rating: 4.4,
        reviews: 98,
        inStock: true,
        featured: false,
        scent: "Coconut, Tropical, Beach",
        longevity: "6-8 hours",
        sillage: "Moderate"
    },
    {
        id: 37,
        name: "Mahogany",
        category: "woody",
        collection: "unisex",
        price: 189,
        originalPrice: 209,
        image: "https://images.unsplash.com/photo-1592425997841-d6c60c2aafb5?w=400&h=500&fit=crop",
        description: "Rich mahogany wood with vintage elegance and timeless appeal.",
        rating: 4.5,
        reviews: 121,
        inStock: true,
        featured: false,
        scent: "Mahogany, Rich, Vintage",
        longevity: "8-10 hours",
        sillage: "Moderate"
    },
    {
        id: 38,
        name: "White Tea",
        category: "fresh",
        collection: "unisex",
        price: 155,
        originalPrice: 175,
        image: "https://images.unsplash.com/photo-1571841059137-04b37772ddd6?w=400&h=500&fit=crop",
        description: "Delicate white tea leaves with zen meditation and pure tranquility.",
        rating: 4.7,
        reviews: 143,
        inStock: true,
        featured: false,
        scent: "White Tea, Zen, Pure",
        longevity: "6-8 hours",
        sillage: "Light"
    },
    {
        id: 39,
        name: "Red Poppy",
        category: "floral",
        collection: "seasonal",
        price: 165,
        originalPrice: 185,
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=500&fit=crop",
        description: "Vibrant red poppies dancing in summer fields with passionate energy.",
        rating: 4.6,
        reviews: 118,
        inStock: true,
        featured: false,
        scent: "Red Poppy, Vibrant, Passion",
        longevity: "6-8 hours",
        sillage: "Moderate"
    },
    {
        id: 40,
        name: "Mystic Sage",
        category: "oriental",
        collection: "limited",
        price: 239,
        originalPrice: 269,
        image: "https://images.unsplash.com/photo-1563170062-6ca801ac2ba4?w=400&h=500&fit=crop",
        description: "Ancient sage with mystical herbs and spiritual awakening.",
        rating: 4.8,
        reviews: 176,
        inStock: true,
        featured: true,
        scent: "Sage, Mystic, Spiritual",
        longevity: "9-11 hours",
        sillage: "Heavy"
    },
    {
        id: 41,
        name: "Lime Basil",
        category: "citrus",
        collection: "seasonal",
        price: 135,
        originalPrice: 155,
        image: "https://images.unsplash.com/photo-1606133841019-6e30f9eb4b1b?w=400&h=500&fit=crop",
        description: "Zesty lime with fresh basil leaves and Mediterranean herbs.",
        rating: 4.2,
        reviews: 87,
        inStock: true,
        featured: false,
        scent: "Lime, Basil, Herbs",
        longevity: "4-6 hours",
        sillage: "Light"
    },
    {
        id: 42,
        name: "Black Cherry",
        category: "gourmand",
        collection: "signature",
        price: 179,
        originalPrice: 199,
        image: "https://images.unsplash.com/photo-1570553671018-e2d4e37de25b?w=400&h=500&fit=crop",
        description: "Luscious black cherries with almond notes and decadent sweetness.",
        rating: 4.5,
        reviews: 129,
        inStock: true,
        featured: true,
        scent: "Black Cherry, Sweet, Almond",
        longevity: "7-9 hours",
        sillage: "Moderate"
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    products = sampleProducts;
    filteredProducts = products;
    
    // Load saved user
    currentUser = JSON.parse(localStorage.getItem('uamore_user'));
    
    // Initialize pages
    showPage('home');
    updateCartCount();
    loadFeaturedProducts();
    loadAllProducts();
    
    // Update user icon if logged in
    if (currentUser) {
        updateUserIcon();
    }
});

// Page Management
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Load page-specific content
        switch(pageId) {
            case 'fragrances':
                loadAllProducts();
                break;
            case 'cart':
                loadCartContent();
                break;
            case 'collections':
                // Collections are static, no need to reload
                break;
        }
    }
    
    // Update navigation
    updateNavigation(pageId);
}

function updateNavigation(activePageId) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('onclick');
        if (href && href.includes(activePageId)) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-color)';
        }
    });
}

// Product Functions
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    const featuredProducts = products.filter(p => p.featured).slice(0, 6);
    
    featuredContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

function loadAllProducts() {
    const productsContainer = document.getElementById('allProducts');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const discount = product.originalPrice > product.price ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    return `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${discount > 0 ? `<div class="product-badge">Save ${discount}%</div>` : ''}
                ${!product.inStock ? '<div class="product-badge" style="background: #dc2626;">Out of Stock</div>' : ''}
                <button class="product-favorite" onclick="event.stopPropagation(); toggleFavorite(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description.substring(0, 80)}...</p>
                <div class="product-rating">
                    <div class="stars">
                        ${createStars(product.rating)}
                    </div>
                    <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${product.price}</span>
                    ${product.originalPrice > product.price ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button class="quick-view" onclick="event.stopPropagation(); openProductModal(${product.id})">
                        Quick View
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star star" style="color: #ddd;"></i>';
    }
    
    return stars;
}

// Search and Filter Functions
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    if (query === '') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.scent.toLowerCase().includes(query)
        );
    }
    
    if (document.getElementById('fragrancesPage').classList.contains('active')) {
        loadAllProducts();
    }
}

function filterProducts() {
    const category = document.getElementById('categoryFilter')?.value || 'all';
    const sortBy = document.getElementById('sortFilter')?.value || 'featured';
    const priceRange = document.getElementById('priceRange')?.value || 500;
    
    // Update price display
    const priceValue = document.getElementById('priceValue');
    if (priceValue) {
        priceValue.textContent = `$0 - ${priceRange}`;
    }
    
    // Filter by category
    let filtered = products;
    if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }
    
    // Filter by price
    filtered = filtered.filter(product => product.price <= parseInt(priceRange));
    
    // Apply search query if exists
    const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || '';
    if (searchQuery) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery) ||
            product.scent.toLowerCase().includes(searchQuery)
        );
    }
    
    // Sort products
    switch (sortBy) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default: // featured
            filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    filteredProducts = filtered;
    loadAllProducts();
}

function filterByCollection(collectionType) {
    // Switch to fragrances page
    showPage('fragrances');
    
    // Filter products by collection
    filteredProducts = products.filter(product => product.collection === collectionType);
    
    // Update category filter to show all
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.value = 'all';
    }
    
    // Load filtered products
    setTimeout(() => {
        loadAllProducts();
    }, 100);
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            scent: product.scent
        });
    }
    
    updateCartCount();
    saveCart();
    showMessage('Product added to cart!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCart();
    loadCartContent();
}

function updateCartQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartCount();
        saveCart();
        loadCartContent();
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function saveCart() {
    localStorage.setItem('uamore_cart', JSON.stringify(cart));
}

function loadCartContent() {
    const cartContent = document.getElementById('cartContent');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }
    
    cartContent.style.display = 'block';
    emptyCart.style.display = 'none';
    
    const cartItems = cart.map(item => createCartItem(item)).join('');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartContent.innerHTML = `
        <div class="cart-items">
            ${cartItems}
        </div>
        <div class="cart-summary">
            <div class="cart-total">
                <span>Total: ${total.toFixed(2)}</span>
                <button class="checkout-btn" onclick="openCheckoutModal()">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    `;
}

function createCartItem(item) {
    return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h3 class="cart-item-title">${item.name}</h3>
                <p class="cart-item-scent">${item.scent}</p>
                <div class="cart-item-price">${item.price}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="quantity" value="${item.quantity}" min="1" 
                           onchange="updateCartQuantity(${item.id}, parseInt(this.value))">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="cart-item-total">
                <div class="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

// Product Modal Functions
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('productModalContent');
    
    modalContent.innerHTML = createProductModalContent(product);
    modal.classList.add('active');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function createProductModalContent(product) {
    const discount = product.originalPrice > product.price ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    return `
        <div class="product-modal-content">
            <div class="product-modal-image">
                <img src="${product.image}" alt="${product.name}">
                ${discount > 0 ? `<div class="product-badge">Save ${discount}%</div>` : ''}
            </div>
            <div class="product-modal-info">
                <div class="product-category">${product.category}</div>
                <h2>${product.name}</h2>
                <div class="product-rating">
                    <div class="stars">${createStars(product.rating)}</div>
                    <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${product.price}</span>
                    ${product.originalPrice > product.price ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                </div>
                <p class="product-description">${product.description}</p>
                
                <div class="product-details">
                    <div class="detail-item">
                        <strong>Scent Profile:</strong> ${product.scent}
                    </div>
                    <div class="detail-item">
                        <strong>Longevity:</strong> ${product.longevity}
                    </div>
                    <div class="detail-item">
                        <strong>Sillage:</strong> ${product.sillage}
                    </div>
                    <div class="detail-item">
                        <strong>Collection:</strong> ${product.collection}
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="cta-button" onclick="addToCart(${product.id}); closeProductModal();" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button class="secondary-button" onclick="toggleFavorite(${product.id})">
                        <i class="fas fa-heart"></i> Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Authentication Functions
function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    } else {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.querySelector('.auth-tab:first-child');
    const registerTab = document.querySelector('.auth-tab:last-child');
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
    }
}

async function handleAuth(event, type) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            currentUser = result.user;
            localStorage.setItem('uamore_user', JSON.stringify(currentUser));
            localStorage.setItem('uamore_token', result.token);
            
            toggleAuthModal();
            updateUserIcon();
            showMessage(`${type === 'login' ? 'Login' : 'Registration'} successful!`, 'success');
        } else {
            showMessage(result.message || 'Authentication failed', 'error');
        }
    } catch (error) {
        console.error('Auth error:', error);
        // Simulate successful auth for demo
        currentUser = {
            id: Date.now(),
            email: data.email,
            firstName: data.firstName || 'User',
            lastName: data.lastName || ''
        };
        localStorage.setItem('uamore_user', JSON.stringify(currentUser));
        
        toggleAuthModal();
        updateUserIcon();
        showMessage(`${type === 'login' ? 'Login' : 'Registration'} successful!`, 'success');
    }
}

function updateUserIcon() {
    const userIcon = document.querySelector('.user-icon');
    if (currentUser) {
        userIcon.innerHTML = `<i class="fas fa-user-circle" style="color: var(--primary-color);"></i>`;
        userIcon.onclick = logout;
    } else {
        userIcon.innerHTML = `<i class="fas fa-user"></i>`;
        userIcon.onclick = toggleAuthModal;
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('uamore_user');
    localStorage.removeItem('uamore_token');
    updateUserIcon();
    showMessage('Logged out successfully!', 'success');
}

// Checkout Functions
function openCheckoutModal() {
    if (cart.length === 0) {
        showMessage('Your cart is empty!', 'error');
        return;
    }
    
    if (!currentUser) {
        showMessage('Please login to proceed with checkout', 'error');
        toggleAuthModal();
        return;
    }
    
    const modal = document.getElementById('checkoutModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    loadCheckoutStep(1);
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function loadCheckoutStep(step) {
    const content = document.getElementById('checkoutContent');
    const steps = document.querySelectorAll('.step');
    
    // Update step indicators
    steps.forEach((stepEl, index) => {
        if (index < step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });
    
    switch (step) {
        case 1:
            content.innerHTML = createShippingForm();
            break;
        case 2:
            content.innerHTML = createPaymentForm();
            break;
        case 3:
            content.innerHTML = createOrderConfirmation();
            break;
    }
}

function createShippingForm() {
    return `
        <form class="checkout-form" onsubmit="proceedToPayment(event)">
            <h3>Shipping Information</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="shippingFirstName">First Name</label>
                    <input type="text" id="shippingFirstName" name="firstName" value="${currentUser?.firstName || ''}" required>
                </div>
                <div class="form-group">
                    <label for="shippingLastName">Last Name</label>
                    <input type="text" id="shippingLastName" name="lastName" value="${currentUser?.lastName || ''}" required>
                </div>
            </div>
            <div class="form-group">
                <label for="shippingAddress">Address</label>
                <input type="text" id="shippingAddress" name="address" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="shippingCity">City</label>
                    <input type="text" id="shippingCity" name="city" required>
                </div>
                <div class="form-group">
                    <label for="shippingState">State</label>
                    <input type="text" id="shippingState" name="state" required>
                </div>
                <div class="form-group">
                    <label for="shippingZip">ZIP Code</label>
                    <input type="text" id="shippingZip" name="zip" required>
                </div>
            </div>
            <div class="form-group">
                <label for="shippingCountry">Country</label>
                <select id="shippingCountry" name="country" required>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="IN">India</option>
                </select>
            </div>
            <button type="submit" class="cta-button">Continue to Payment</button>
        </form>
    `;
}

function createPaymentForm() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = total * 0.08;
    const shipping = 15;
    const finalTotal = total + tax + shipping;
    
    return `
        <div class="payment-container">
            <div class="payment-form">
                <h3>Payment Information</h3>
                <form id="paymentForm" onsubmit="processPayment(event)">
                    <div class="form-group">
                        <label for="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="expiryDate">Expiry Date</label>
                            <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" maxlength="5" required>
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" name="cvv" placeholder="123" maxlength="4" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="cardName">Name on Card</label>
                        <input type="text" id="cardName" name="cardName" value="${currentUser?.firstName} ${currentUser?.lastName}" required>
                    </div>
                    
                    <div class="payment-methods">
                        <h4>We Accept:</h4>
                        <div class="payment-icons">
                            <i class="fab fa-cc-visa"></i>
                            <i class="fab fa-cc-mastercard"></i>
                            <i class="fab fa-cc-amex"></i>
                            <i class="fab fa-cc-paypal"></i>
                        </div>
                    </div>
                    
                    <button type="submit" class="cta-button">Complete Order - ${finalTotal.toFixed(2)}</button>
                </form>
            </div>
            
            <div class="order-summary">
                <h3>Order Summary</h3>
                <div class="summary-items">
                    ${cart.map(item => `
                        <div class="summary-item">
                            <span>${item.name} × ${item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="summary-totals">
                    <div class="summary-line">
                        <span>Subtotal:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div class="summary-line">
                        <span>Tax:</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div class="summary-line">
                        <span>Shipping:</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div class="summary-line total">
                        <span>Total:</span>
                        <span>${finalTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createOrderConfirmation() {
    const orderNumber = 'UA' + Date.now().toString().slice(-8);
    
    return `
        <div class="order-confirmation">
            <div class="confirmation-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Order Confirmed!</h2>
            <p>Thank you for your purchase. Your order has been successfully placed.</p>
            
            <div class="order-details">
                <div class="order-number">Order #${orderNumber}</div>
                <div class="order-info">
                    <p>A confirmation email has been sent to ${currentUser?.email}</p>
                    <p>Expected delivery: 3-5 business days</p>
                </div>
            </div>
            
            <div class="confirmation-actions">
                <button class="cta-button" onclick="closeCheckoutModal(); showPage('home'); clearCart();">
                    Continue Shopping
                </button>
                <button class="secondary-button" onclick="downloadReceipt('${orderNumber}')">
                    Download Receipt
                </button>
            </div>
        </div>
    `;
}

function proceedToPayment(event) {
    event.preventDefault();
    loadCheckoutStep(2);
}

async function processPayment(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const paymentData = Object.fromEntries(formData.entries());
    
    // Simulate payment processing
    showMessage('Processing payment...', 'success');
    
    try {
        // In a real app, you would integrate with Stripe, PayPal, etc.
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('uamore_token')}`
            },
            body: JSON.stringify({
                items: cart,
                paymentData,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            })
        });
        
        if (response.ok) {
            loadCheckoutStep(3);
        } else {
            throw new Error('Payment failed');
        }
    } catch (error) {
        console.error('Payment error:', error);
        // Simulate successful payment for demo
        setTimeout(() => {
            loadCheckoutStep(3);
        }, 2000);
    }
}

function clearCart() {
    cart = [];
    updateCartCount();
    saveCart();
}

function downloadReceipt(orderNumber) {
    showMessage('Receipt downloaded!', 'success');
}

// Contact Form
async function submitContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
            event.target.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Contact form error:', error);
        // Simulate successful submission for demo
        showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
        event.target.reset();
    }
}

// Newsletter Subscription
async function subscribeNewsletter(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    
    try {
        const response = await fetch(`${API_BASE_URL}/newsletter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            showMessage('Successfully subscribed to newsletter!', 'success');
            event.target.reset();
        } else {
            throw new Error('Subscription failed');
        }
    } catch (error) {
        console.error('Newsletter error:', error);
        // Simulate successful subscription for demo
        showMessage('Successfully subscribed to newsletter!', 'success');
        event.target.reset();
    }
}

// Utility Functions
function toggleFavorite(productId) {
    showMessage('Added to wishlist!', 'success');
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('mobile-active');
}

function showMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(messageEl)) {
                document.body.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .product-modal-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        max-width: 800px;
        margin: 0 auto;
    }
    
    .product-modal-image img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 15px;
    }
    
    .product-details {
        margin: 1.5rem 0;
        padding: 1rem;
        background: var(--light-color);
        border-radius: 10px;
    }
    
    .detail-item {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }
    
    .detail-item strong {
        color: var(--primary-color);
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .cta-button {
        flex: 1;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .cta-button:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
    }
    
    .cta-button:disabled {
        background: #ccc;
        cursor: not-allowed;
        transform: none;
    }
    
    .secondary-button {
        background: transparent;
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .secondary-button:hover {
        background: var(--primary-color);
        color: white;
    }
    
    .payment-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        max-width: 1000px;
        margin: 0 auto;
    }
    
    .order-summary {
        background: var(--light-color);
        padding: 2rem;
        border-radius: 15px;
        height: fit-content;
    }
    
    .summary-items {
        margin-bottom: 1.5rem;
    }
    
    .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #eee;
    }
    
    .summary-totals {
        border-top: 2px solid var(--primary-color);
        padding-top: 1rem;
    }
    
    .summary-line {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }
    
    .summary-line.total {
        font-weight: bold;
        font-size: 1.2rem;
        color: var(--primary-color);
        border-top: 1px solid #ddd;
        padding-top: 0.5rem;
        margin-top: 1rem;
    }
    
    .checkout-form {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: var(--text-color);
    }
    
    .form-group input,
    .form-group select {
        width: 100%;
        padding: 1rem;
        border: 2px solid #ddd;
        border-radius: 10px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group select:focus {
        outline: none;
        border-color: var(--primary-color);
    }
    
    .payment-methods {
        text-align: center;
        margin: 2rem 0;
    }
    
    .payment-icons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .payment-icons i {
        font-size: 2rem;
        color: var(--primary-color);
    }
    
    .order-confirmation {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
        padding: 3rem;
    }
    
    .confirmation-icon i {
        font-size: 4rem;
        color: #10b981;
        margin-bottom: 2rem;
    }
    
    .order-details {
        background: var(--light-color);
        padding: 2rem;
        border-radius: 15px;
        margin: 2rem 0;
    }
    
    .order-number {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .confirmation-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
    }
    
    .cart-item {
        display: grid;
        grid-template-columns: 100px 1fr auto;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid #eee;
        align-items: center;
    }
    
    .cart-item-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 10px;
    }
    
    .cart-item-info h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
    }
    
    .cart-item-scent {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
    
    .cart-item-price {
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .quantity-btn {
        background: var(--primary-color);
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
    }
    
    .quantity {
        width: 60px;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 0.25rem;
    }
    
    .cart-item-total {
        text-align: right;
    }
    
    .item-total {
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .remove-item {
        background: #ef4444;
        color: white;
        border: none;
        padding: 0.5rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    
    .remove-item:hover {
        background: #dc2626;
    }
    
    .cart-summary {
        background: var(--light-color);
        padding: 2rem;
        border-radius: 15px;
        margin-top: 2rem;
    }
    
    .cart-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 2rem;
    }
    
    .checkout-btn {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 100%;
    }
    
    .checkout-btn:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        .product-modal-content,
        .payment-container {
            grid-template-columns: 1fr;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .confirmation-actions {
            flex-direction: column;
        }
        
        .modal-actions {
            flex-direction: column;
        }
        
        .cart-item {
            grid-template-columns: 1fr;
            text-align: center;
        }
    }
`;

document.head.appendChild(style);

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const productModal = document.getElementById('productModal');
    const authModal = document.getElementById('authModal');
    const checkoutModal = document.getElementById('checkoutModal');
    
    if (event.target === productModal) {
        closeProductModal();
    }
    
    if (event.target === authModal) {
        toggleAuthModal();
    }
    
    if (event.target === checkoutModal) {
        closeCheckoutModal();
    }
});

// Handle escape key to close modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const productModal = document.getElementById('productModal');
        const authModal = document.getElementById('authModal');
        const checkoutModal = document.getElementById('checkoutModal');
        
        if (productModal && productModal.classList.contains('active')) {
            closeProductModal();
        }
        
        if (authModal && authModal.classList.contains('active')) {
            toggleAuthModal();
        }
        
        if (checkoutModal && checkoutModal.classList.contains('active')) {
            closeCheckoutModal();
        }
    }
});

// Format card number input
document.addEventListener('input', function(event) {
    if (event.target.id === 'cardNumber') {
        let value = event.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        event.target.value = value;
    }
    
    if (event.target.id === 'expiryDate') {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        event.target.value = value;
    }
    
    if (event.target.id === 'cvv') {
        event.target.value = event.target.value.replace(/\D/g, '');
    }
});

// Handle price range slider
document.addEventListener('input', function(event) {
    if (event.target.id === 'priceRange') {
        const priceValue = document.getElementById('priceValue');
        if (priceValue) {
            priceValue.textContent = `$0 - ${event.target.value}`;
        }
        filterProducts();
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(event) {
    if (event.target.matches('a[href^="#"]')) {
        event.preventDefault();
        const target = document.querySelector(event.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

console.log('Uamore Fragrances script loaded successfully!');