import { prisma } from "../lib/prisma";

const products = [
  {
    name: "Heavyweight Oversized Tee",
    slug: "heavyweight-oversized-tee",
    description:
      "A heavyweight oversized tee designed for everyday streetwear.",
    price: "1499.00",
    category: "T-Shirts",
    brand: "DRIP",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    ],
    stock: 50,
  },
  {
    name: "Utility Cargo Pants",
    slug: "utility-cargo-pants",
    description:
      "Relaxed utility cargo pants with a modern streetwear silhouette.",
    price: "2499.00",
    category: "Bottoms",
    brand: "DRIP",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    ],
    stock: 35,
  },
  {
    name: "Essential Oversized Hoodie",
    slug: "essential-oversized-hoodie",
    description:
      "Heavyweight oversized hoodie made for everyday comfort.",
    price: "2999.00",
    category: "Hoodies",
    brand: "DRIP",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    ],
    stock: 25,
  },
  {
    name: "Relaxed Street Jacket",
    slug: "relaxed-street-jacket",
    description:
      "A relaxed everyday jacket with a minimal streetwear aesthetic.",
    price: "3499.00",
    category: "Outerwear",
    brand: "DRIP",
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    ],
    stock: 20,
  },
  {
    name: "Everyday Cap",
    slug: "everyday-cap",
    description: "Minimal everyday cap with the DRIP aesthetic.",
    price: "999.00",
    category: "Accessories",
    brand: "DRIP",
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85",
    ],
    stock: 40,
  },
  {
    name: "Wide Leg Cargo",
    slug: "wide-leg-cargo",
    description:
      "Wide-leg cargo trousers designed for a relaxed silhouette.",
    price: "2799.00",
    category: "Bottoms",
    brand: "DRIP",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
    ],
    stock: 30,
  },
];

async function main(){
    console.log("Deleting existing products...");

    await prisma.product.deleteMany();

    console.log("Seeding DRIP products...");

    await prisma.product.createMany({
        data: products,
    });

    console.log("DRIP products seeded successfully");
}

main()
    .catch((error) =>{
        console.error("Error seeding database:", error);
        process.exit(1);
    })
    .finally(async ()=>{
        await prisma.$disconnect();
    });