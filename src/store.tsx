import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { products, sampleOrder, type Product } from "./data"

export type CartLine = {
  product: Product
  quantity: number
  selected: boolean
  option?: string
  color?: string
}
export type Locale = "en" | "bn"
export type Toast = {
  id: number
  message: string
}

export type Order = {
  id: string
  date: string
  status: "Order Placed" | "Processing" | "Shipped" | "Out for Delivery" | "Delivered"
  courier: string
  tracking: string
  customer: {
    name: string
    phone: string
    email: string
    division: string
    district: string
    thana: string
    postal: string
    street: string
  }
  paymentMethod: string
  paymentStatus: "Paid" | "Pending" | "Cash on Delivery"
  items: CartLine[]
  subtotal: number
  shipping: number
  discount: number
  total: number
}

const copy = {
  en: {
    search: "Search in BazarBari...",
    cart: "Cart",
    wishlist: "Wishlist",
    account: "Account",
    home: "Home",
    categories: "Categories",
    add: "Add to Cart",
    buy: "Buy Now",
    checkout: "Proceed to Checkout",
    flash: "Flash Sale",
    viewAll: "View all",
    products: "products",
    delivery: "Delivery",
    total: "Total",
  },
  bn: {
    search: "বাজারবাড়িতে খুঁজুন...",
    cart: "কার্ট",
    wishlist: "পছন্দের তালিকা",
    account: "অ্যাকাউন্ট",
    home: "হোম",
    categories: "ক্যাটাগরি",
    add: "কার্টে যোগ করুন",
    buy: "এখনই কিনুন",
    checkout: "চেকআউট করুন",
    flash: "ফ্ল্যাশ সেল",
    viewAll: "সব দেখুন",
    products: "পণ্য",
    delivery: "ডেলিভারি",
    total: "মোট",
  },
}

type Store = {
  locale: Locale
  setLocale: (v: Locale) => void
  t: typeof copy.en
  cart: CartLine[]
  wishlist: number[]
  coupon: string
  discount: number
  addCart: (
    p: Product,
    option?: string,
    quantity?: number,
    color?: string,
  ) => void
  updateQty: (id: number, qty: number, option?: string) => void
  removeCart: (id: number, option?: string) => void
  toggleSelected: (id: number, option?: string) => void
  selectAll: (selected: boolean) => void
  clearCart: () => void
  saveForLater: (product: Product, option?: string) => void
  toggleWishlist: (p: Product) => void
  applyCoupon: (code: string) => boolean
  subtotal: number
  shipping: number
  total: number
  toasts: Toast[]
  notify: (message: string) => void
  orders: Order[]
  addOrder: (order: Order) => void
  getOrder: (id: string) => Order | undefined
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      return localStorage.getItem("bb-locale") as Locale || "en"
    } catch {
      return "en"
    }
  })

  const [cart, setCart] = useState<CartLine[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("bb-cart") || "[]")
    } catch {
      return []
    }
  })

  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("bb-wishlist") || "[]")
    } catch {
      return []
    }
  })

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem("bb-orders")
      if (saved) return JSON.parse(saved)
    } catch {
      // fallback below
    }
    return [sampleOrder as unknown as Order]
  })

  const [coupon, setCoupon] = useState("")
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    try {
      localStorage.setItem("bb-cart", JSON.stringify(cart))
    } catch {}
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem("bb-wishlist", JSON.stringify(wishlist))
    } catch {}
  }, [wishlist])

  useEffect(() => {
    try {
      localStorage.setItem("bb-locale", locale)
    } catch {}
  }, [locale])

  useEffect(() => {
    try {
      localStorage.setItem("bb-orders", JSON.stringify(orders))
    } catch {}
  }, [orders])

  const notify = (message: string) => {
    const id = Date.now() + Math.random()
    setToasts((v) => [...v, { id, message }])
    setTimeout(() => setToasts((v) => v.filter((x) => x.id !== id)), 2800)
  }

  const addCart = (
    product: Product,
    option?: string,
    quantity: number = 1,
    color?: string,
  ) => {
    setCart((lines) => {
      const found = lines.find(
        (x) =>
          x.product.id === product.id &&
          x.option === option &&
          x.color === color,
      )
      if (found) {
        return lines.map((x) =>
          x === found
            ? { ...x, quantity: Math.min(product.stock, x.quantity + quantity) }
            : x,
        )
      }
      return [
        ...lines,
        {
          product,
          quantity: Math.min(product.stock, quantity),
          selected: true,
          option,
          color,
        },
      ]
    })
    notify(locale === "bn" ? "কার্টে যোগ করা হয়েছে" : "Added to cart")
  }

  const updateQty = (id: number, qty: number, option?: string) => {
    setCart((v) =>
      v.map((x) =>
        x.product.id === id && x.option === option
          ? { ...x, quantity: Math.max(1, Math.min(x.product.stock, qty)) }
          : x,
      ),
    )
  }

  const removeCart = (id: number, option?: string) => {
    setCart((v) =>
      v.filter((x) => !(x.product.id === id && x.option === option)),
    )
    notify(locale === "bn" ? "পণ্য সরানো হয়েছে" : "Product removed from cart")
  }

  const toggleSelected = (id: number, option?: string) => {
    setCart((v) =>
      v.map((x) =>
        x.product.id === id && x.option === option
          ? { ...x, selected: !x.selected }
          : x,
      ),
    )
  }

  const selectAll = (selected: boolean) => {
    setCart((v) => v.map((x) => ({ ...x, selected })))
  }

  const clearCart = () => {
    setCart([])
  }

  const saveForLater = (product: Product, option?: string) => {
    removeCart(product.id, option)
    if (!wishlist.includes(product.id)) {
      setWishlist((v) => [...v, product.id])
    }
    notify(locale === "bn" ? "পছন্দের তালিকায় সংরক্ষিত" : "Saved to wishlist")
  }

  const toggleWishlist = (p: Product) => {
    const has = wishlist.includes(p.id)
    setWishlist((v) => (has ? v.filter((id) => id !== p.id) : [...v, p.id]))
    notify(has ? "Removed from wishlist" : "Added to wishlist")
  }

  const subtotal = useMemo(
    () =>
      cart
        .filter((x) => x.selected)
        .reduce((s, x) => s + x.product.price * x.quantity, 0),
    [cart],
  )

  const discount = useMemo(() => {
    if (!coupon || !subtotal) return 0
    if (coupon === "WELCOME100") return Math.min(subtotal, 100)
    if (coupon === "EID15") return Math.min(1500, Math.round(subtotal * 0.15))
    if (coupon === "SAVE500") return subtotal >= 5000 ? 500 : 0
    return 0
  }, [coupon, subtotal])

  const shipping = subtotal ? (subtotal > 5000 ? 0 : 60) : 0

  const applyCoupon = (code: string) => {
    const c = code.trim().toUpperCase()
    if (
      c === "WELCOME100" ||
      c === "EID15" ||
      (c === "SAVE500" && subtotal >= 5000)
    ) {
      setCoupon(c)
      notify("Coupon applied successfully!")
      return true
    }
    if (c === "SAVE500" && subtotal < 5000) {
      notify("Coupon SAVE500 requires a minimum order of ৳5,000")
      return false
    }
    notify("Invalid coupon code. Try WELCOME100 or EID15")
    return false
  }

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev.filter((o) => o.id !== order.id)])
  }

  const getOrder = (id: string) => {
    return orders.find((o) => o.id === id) || sampleOrder as unknown as Order
  }

  const total = Math.max(0, subtotal + shipping - discount)

  return (
    <StoreContext.Provider
      value={{
        locale,
        setLocale,
        t: copy[locale],
        cart,
        wishlist,
        coupon,
        discount,
        addCart,
        updateQty,
        removeCart,
        toggleSelected,
        selectAll,
        clearCart,
        saveForLater,
        toggleWishlist,
        applyCoupon,
        subtotal,
        shipping,
        total,
        toasts,
        notify,
        orders,
        addOrder,
        getOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const value = useContext(StoreContext)
  if (!value) throw new Error("StoreProvider missing")
  return value
}

export const money = (amount: number, locale: Locale = "en") => {
  const formatted = new Intl.NumberFormat(
    locale === "bn" ? "bn-BD" : "en-BD",
  ).format(amount)
  return `৳${formatted}`
}

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug)
