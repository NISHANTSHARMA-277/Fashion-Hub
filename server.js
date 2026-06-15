const express = require('express');
const app = express();
const port = 3000;

// CORS Security Rules: Taaki frontend aur backend bina error ke baat kar sakein
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(express.json()); 

// 📦 PRODUCTS GODOWN: Saare 9 kapde aur unki categories/ratings
let productsDB = [
    { id: 1, name: "Classic White T-Shirt", price: 499, category: "Men", rating: "⭐⭐⭐⭐⭐ (4.8)", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80" },
    { id: 2, name: "Black Leather Jacket", price: 2499, category: "Men", rating: "⭐⭐⭐⭐ (4.5)", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80" },
    { id: 3, name: "Floral Summer Dress", price: 1299, category: "Women", rating: "⭐⭐⭐⭐⭐ (4.9)", image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&q=80" },
    { id: 4, name: "Denim Blue Jeans", price: 999, category: "Men", rating: "⭐⭐⭐⭐ (4.2)", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80" },
    { id: 5, name: "Cozy Red Hoodie", price: 1499, category: "Women", rating: "⭐⭐⭐⭐⭐ (4.7)", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80" },
    { id: 6, name: "White Casual Sneakers", price: 1899, category: "Accessories", rating: "⭐⭐⭐⭐ (4.4)", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80" },
    { id: 7, name: "Classic UV Sunglasses", price: 599, category: "Accessories", rating: "⭐⭐⭐⭐⭐ (4.6)", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80" },
    { id: 8, name: "Men's Formal Blue Shirt", price: 899, category: "Men", rating: "⭐⭐⭐⭐ (4.1)", image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=500&q=80" },
    { id: 9, name: "Premium Analog Watch", price: 1299, category: "Accessories", rating: "⭐⭐⭐⭐⭐ (4.9)", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80" }
];

// 📦 ORDERS GODOWN: Customer ke live orders save karne ke liye
let ordersDB = [];

// PRODUCTS ROUTES
app.get('/api/products', (req, res) => { res.json(productsDB); });

app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    newProduct.id = productsDB.length > 0 ? productsDB[productsDB.length - 1].id + 1 : 1;
    newProduct.category = "Men"; 
    newProduct.rating = "⭐⭐⭐⭐⭐ (5.0)";
    productsDB.push(newProduct); 
    res.json({ message: "Product Successfully Add Ho Gaya!" });
});

app.delete('/api/products/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    productsDB = productsDB.filter(product => product.id !== idToDelete);
    res.json({ message: "Product Delete Ho Gaya!" });
});

// ORDERS ROUTES
app.post('/api/orders', (req, res) => {
    const newOrder = req.body;
    newOrder.id = ordersDB.length + 1;
    newOrder.date = new Date().toLocaleString('en-IN'); // Real time stamp
    ordersDB.push(newOrder); 
    res.json({ message: "Order Successfully Received!" });
});

app.get('/api/orders', (req, res) => { res.json(ordersDB); });

app.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Backend Server ekdum mast chalu hai!`);
    console.log(`🔗 Link: http://127.0.0.1:${port}`);
    console.log(`======================================================\n`);
});