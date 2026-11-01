export type Category = "electronics" | "fashion" | "grocery" | "home-appliances"

export type Product = {
  id: number
  sku: string
  name: string
  slug: string
  category: Category
  brand: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  stock: number
  express: boolean
  isNew?: boolean
  description: string
  colors?: string[]
  options?: string[]
  specs: Record<string, string>
}

const images = {
  phone:
    "https://images.unsplash.com/photo-1617743220812-6522d771846c?auto=format&fit=crop&w=800&q=80",
  iphone:
    "https://images.unsplash.com/photo-1513595086754-ae9ec42d7e90?auto=format&fit=crop&w=800&q=80",
  audio:
    "https://images.unsplash.com/photo-1581663082795-52fa33c5793b?auto=format&fit=crop&w=800&q=80",
  laptop:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
  tv: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
  watch:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  shirt:
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
  kurti:
    "https://images.unsplash.com/photo-1662267486436-c2e8bd95c2d4?auto=format&fit=crop&w=800&q=80",
  shoe: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  panjabi:
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
  oil: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
  tea: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80",
  grocery:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
  cooker:
    "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
  blender:
    "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80",
  kettle:
    "https://images.unsplash.com/photo-1647619124290-10fb9273b4b5?auto=format&fit=crop&w=800&q=80",
  ac: "https://images.unsplash.com/photo-1631545806609-23f4058a6187?auto=format&fit=crop&w=800&q=80",
}

const seed = [
  [
    "Samsung Galaxy M34 5G (8GB/128GB)",
    "electronics",
    "Samsung",
    "phone",
    28500,
    32000,
  ],
  ["Apple iPhone 16 128GB", "electronics", "Apple", "iphone", 119999, 129999],
  ["Xiaomi Redmi Note 13 Pro", "electronics", "Xiaomi", "phone", 34999, 38999],
  ["Anker Soundcore R50i Earbuds", "electronics", "Anker", "audio", 2690, 3490],
  ["Sony WH-CH520 Headphones", "electronics", "Sony", "audio", 5990, 6990],
  ["HP 15s Ryzen 5 Laptop", "electronics", "HP", "laptop", 62990, 67990],
  ["Walton 43” FHD Smart TV", "electronics", "Walton", "tv", 32900, 38900],
  ["Noise ColorFit Pro 5", "electronics", "Noise", "watch", 4999, 6999],
  ["Realme Narzo 70 5G", "electronics", "Realme", "phone", 24999, 27999],
  ["Samsung Galaxy Buds FE", "electronics", "Samsung", "audio", 9990, 11990],
  ["Premium Oxford Casual Shirt", "fashion", "Yellow", "shirt", 1490, 1990],
  [
    "Women’s Cotton Embroidered Kurti",
    "fashion",
    "Aarong",
    "kurti",
    1890,
    2390,
  ],
  ["Nike Revolution 7 Sneakers", "fashion", "Nike", "shoe", 6999, 8500],
  ["Classic Cotton Panjabi", "fashion", "Sailor", "panjabi", 2490, 3190],
  ["Leather Office Loafers", "fashion", "Bata", "shoe", 3290, 3990],
  ["Linen Relaxed Fit Shirt", "fashion", "Ecstasy", "shirt", 1790, 2290],
  ["Festive Jamdani Kurti", "fashion", "Kay Kraft", "kurti", 2890, 3490],
  ["Canvas Everyday Sneakers", "fashion", "Apex", "shoe", 2190, 2790],
  ["Premium Miniket Rice 5kg", "grocery", "ACI Pure", "rice", 620, 680],
  ["Fresh Soybean Oil 5L", "grocery", "Fresh", "oil", 835, 890],
  ["Ispahani Mirzapore Tea 400g", "grocery", "Ispahani", "tea", 240, 260],
  [
    "Daily Essentials Family Pack",
    "grocery",
    "BazarBari",
    "grocery",
    1490,
    1690,
  ],
  ["Pran Chinigura Rice 2kg", "grocery", "PRAN", "rice", 390, 430],
  ["Radhuni Spice Combo", "grocery", "Radhuni", "grocery", 570, 650],
  ["Teer Fortified Soybean Oil 2L", "grocery", "Teer", "oil", 345, 370],
  ["Kazi & Kazi Organic Tea", "grocery", "Kazi & Kazi", "tea", 295, 330],
  [
    "Walton Rice Cooker 2.8L",
    "home-appliances",
    "Walton",
    "cooker",
    3990,
    4590,
  ],
  [
    "Philips Daily Collection Blender",
    "home-appliances",
    "Philips",
    "blender",
    5490,
    6190,
  ],
  [
    "Singer Electric Kettle 1.8L",
    "home-appliances",
    "Singer",
    "kettle",
    1490,
    1790,
  ],
  ["Gree 1.5 Ton Inverter AC", "home-appliances", "Gree", "ac", 72990, 79990],
  [
    "Vision Rice Cooker 1.8L",
    "home-appliances",
    "Vision",
    "cooker",
    2890,
    3290,
  ],
  [
    "Panasonic Mixer Grinder",
    "home-appliances",
    "Panasonic",
    "blender",
    6790,
    7590,
  ],
  ["Miyako Electric Kettle", "home-appliances", "Miyako", "kettle", 1290, 1590],
  ["Walton 1 Ton Inverter AC", "home-appliances", "Walton", "ac", 58990, 64990],
  ["Samsung Galaxy A55 5G", "electronics", "Samsung", "phone", 53999, 58999],
  ["Xiaomi Smart Band 9", "electronics", "Xiaomi", "watch", 4990, 5490],
] as const

export const products: Product[] = seed.map((p, i) => ({
  id: i + 1,
  sku: `${p[1].slice(0, 4).toUpperCase()}-${p[2].slice(0, 3).toUpperCase()}-${1000 + i}`,
  name: p[0],
  slug: p[0]
    .toLowerCase()
    .replace(/[”’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, ""),
  category: p[1] as Category,
  brand: p[2],
  image: images[p[3]],
  price: p[4],
  originalPrice: p[5],
  rating: Number((4.3 + (i % 7) / 10).toFixed(1)),
  reviews: 128 + i * 83,
  stock: 8 + ((i * 13) % 74),
  express: i % 3 !== 0,
  isNew: i % 5 === 0,
  description: `${p[0]} combines dependable quality, thoughtful design and official local support. Carefully selected for BazarBari customers across Bangladesh.`,
  colors:
    p[1] === "electronics" || p[1] === "fashion"
      ? ["Emerald", "Graphite", "Silver"]
      : undefined,
  options:
    p[1] === "electronics"
      ? ["128GB", "256GB"]
      : p[1] === "fashion"
        ? ["S", "M", "L", "XL"]
        : undefined,
  specs: {
    Brand: p[2],
    Warranty:
      p[1] === "grocery"
        ? "Authenticity guaranteed"
        : "1 year service warranty",
    Origin: "Official distribution",
    Delivery: "Nationwide",
  },
}))

export const categories = [
  {
    slug: "electronics",
    label: "Electronics",
    bn: "ইলেকট্রনিক্স",
    icon: "Smartphone",
  },
  { slug: "fashion", label: "Fashion", bn: "ফ্যাশন", icon: "Shirt" },
  { slug: "grocery", label: "Grocery", bn: "মুদি পণ্য", icon: "ShoppingBasket" },
  {
    slug: "home-appliances",
    label: "Appliances",
    bn: "হোম অ্যাপ্লায়েন্স",
    icon: "Lamp",
  },
] as const

export const addressData: Record<string, Record<string, string[]>> = {
  Dhaka: {
    Dhaka: ["Uttara", "Dhanmondi", "Mirpur", "Gulshan"],
    Gazipur: ["Tongi", "Sreepur"],
  },
  Chattogram: {
    Chattogram: ["Panchlaish", "Kotwali"],
    CoxsBazar: ["Sadar", "Teknaf"],
  },
  Rajshahi: { Rajshahi: ["Boalia", "Motihar"], Bogura: ["Sadar", "Sherpur"] },
  Sylhet: {
    Sylhet: ["Sadar", "Beanibazar"],
    Moulvibazar: ["Sreemangal", "Kulaura"],
  },
}

export const sampleOrder = {
  id: "BB-20261101-89421",
  date: "01 Nov 2026, 10:42 AM",
  status: "Shipped",
  courier: "Pathao Courier",
  tracking: "PTH-77290144",
  customer: {
    name: "Sabbir Hasan",
    phone: "+8801711002233",
    email: "sabbir.hasan@example.com",
    division: "Dhaka",
    district: "Dhaka",
    thana: "Uttara",
    postal: "1230",
    street: "House 14, Road 5, Sector 3",
  },
  paymentMethod: "bKash Online",
  paymentStatus: "Paid",
  items: [
    {
      product: products[0],
      quantity: 1,
      selected: true,
      option: "128GB",
      color: "Graphite",
    },
  ],
  subtotal: 28500,
  shipping: 60,
  discount: 1000,
  total: 27560,
}
