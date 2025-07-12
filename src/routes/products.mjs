import { Router} from "express";
import {query, validationResult} from 'express-validator';

var router = Router();


router.get("/api/products", query('name').isString().withMessage("Error").isLength({ max: 30, min: 3 }).withMessage("Too Short"), (req, res) => {
  res.cookie("Hello", "Wisdom", 60 * 60);
  
  console.log(req.header.cookies);
  
  res.send(products);
})

export default router;







///
///
///
///
///
///
///
///
///
///
///
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Bluetooth noise-cancelling over-ear headphones.",
    price: 89.99,
    category: "Electronics",
    image: "https://example.com/images/headphones.jpg"
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Fitness tracking smart watch with heart rate monitor.",
    price: 59.99,
    category: "Wearables",
    image: "https://example.com/images/smartwatch.jpg"
  },
  {
    id: 3,
    name: "Gaming Chair",
    description: "Ergonomic gaming chair with lumbar support.",
    price: 129.99,
    category: "Furniture",
    image: "https://example.com/images/gaming-chair.jpg"
  },
  {
    id: 4,
    name: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with USB charging port.",
    price: 25.5,
    category: "Home & Office",
    image: "https://example.com/images/desk-lamp.jpg"
  },
  {
    id: 5,
    name: "Portable Speaker",
    description: "Waterproof portable Bluetooth speaker.",
    price: 39.95,
    category: "Audio",
    image: "https://example.com/images/speaker.jpg"
  },
  {
    id: 6,
    name: "Running Shoes",
    description: "Lightweight running shoes for men and women.",
    price: 49.99,
    category: "Fashion",
    image: "https://example.com/images/running-shoes.jpg"
  },
  {
    id: 7,
    name: "Laptop Stand",
    description: "Adjustable laptop stand for better ergonomics.",
    price: 19.99,
    category: "Accessories",
    image: "https://example.com/images/laptop-stand.jpg"
  },
  {
    id: 8,
    name: "Electric Toothbrush",
    description: "Rechargeable electric toothbrush with 5 modes.",
    price: 34.99,
    category: "Health",
    image: "https://example.com/images/toothbrush.jpg"
  },
  {
    id: 9,
    name: "Yoga Mat",
    description: "Non-slip yoga mat with carrying strap.",
    price: 22.0,
    category: "Fitness",
    image: "https://example.com/images/yoga-mat.jpg"
  },
  {
    id: 10,
    name: "USB-C Hub",
    description: "Multi-port USB-C hub with HDMI and card reader.",
    price: 29.99,
    category: "Tech",
    image: "https://example.com/images/usb-hub.jpg"
  }
];
