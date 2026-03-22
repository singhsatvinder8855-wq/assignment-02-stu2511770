// OP1: insertMany() — insert all 3 documents from sample_documents.json
db.products.insertMany([
  {
    "product_id": "E1001",
    "name": "UltraView 4K Smart TV",
    "category": "Electronics",
    "price": 45000,
    "specs": { "voltage": "110-240V", "warranty_years": 2, "screen_size": "55 inch" },
    "in_stock": true
  },
  {
    "product_id": "C2001",
    "name": "Men's Cotton Polo Shirt",
    "category": "Clothing",
    "price": 1200,
    "attributes": { "size": "L", "color": "Navy Blue", "material": "100% Cotton" },
    "care_instructions": ["Machine wash cold", "Do not bleach"]
  },
  {
    "product_id": "G3001",
    "name": "Organic Almond Milk",
    "category": "Groceries",
    "price": 250,
    "expiry_date": "2024-11-30",
    "nutritional_info": { "calories": 45, "protein_grams": 1, "fat_grams": 3.5 },
    "is_vegan": true
  }
]);

// OP2: find() — retrieve all Electronics products with price > 20000
db.products.find({ 
    category: "Electronics", 
    price: { $gt: 20000 } 
});

// OP3: find() — retrieve all Groceries expiring before 2025-01-01
db.products.find({ 
    category: "Groceries", 
    expiry_date: { $lt: "2025-01-01" } 
});

// OP4: updateOne() — add a "discount_percent" field to a specific product
db.products.updateOne(
    { product_id: "E1001" },
    { $set: { discount_percent: 10 } }
);

// OP5: createIndex() — create an index on category field and explain why
db.products.createIndex({ category: 1 });
/* EXPLANATION: We create an index on the 'category' field because an e-commerce catalog is heavily queried and filtered by category (e.g., users clicking on the "Electronics" or "Clothing" tabs). Creating this index drastically improves read performance by allowing the database to instantly locate the relevant documents, rather than performing a slow, resource-heavy full collection scan of every product in the system.
*/
