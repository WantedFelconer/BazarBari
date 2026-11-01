import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react"
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Bell,
  Box,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Camera,
  CirclePlay,
  Clock3,
  CreditCard,
  Filter,
  Globe2,
  Heart,
  Home,
  LampDesk,
  Languages,
  MapPin,
  Menu,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Star,
  Store,
  Trash2,
  Truck,
  User,
  Wallet,
  X,
  Zap,
  Check,
  AlertCircle,
  RotateCcw,
  Headphones,
  Download,
  Eye,
  Send,
  LockKeyhole,
} from "lucide-react"
import {
  addressData,
  categories,
  products,
  sampleOrder,
  type Product,
} from "./data"
import { getProduct, money, StoreProvider, useStore, type Order } from "./store"

const heroFashion =
  "https://images.unsplash.com/photo-1727934404073-797950f15a76?auto=format&fit=crop&w=1200&q=85"
const heroTech =
  "https://images.unsplash.com/photo-1758520387659-9956c4516891?auto=format&fit=crop&w=1200&q=85"

function navigate(path: string) {
  const parts = path.split("#")
  const hash = parts[1]
  window.history.pushState({}, "", path)
  window.dispatchEvent(new PopStateEvent("popstate"))
  if (hash) {
    const el = document.getElementById(hash)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      return
    }
  }
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function Link({
  to,
  className = "",
  children,
  label,
  onClick,
  style,
}: {
  to: string
  className?: string
  children: ReactNode
  label?: string
  onClick?: () => void
  style?: React.CSSProperties
}) {
  return (
    <a
      href={to}
      aria-label={label}
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault()
        if (onClick) onClick()
        navigate(to)
      }}
    >
      {children}
    </a>
  )
}

function Button({
  children,
  className = "",
  variant = "primary",
  onClick,
  disabled,
  type = "button",
  ariaLabel,
  style,
}: {
  children: ReactNode
  className?: string
  variant?: "primary" | "outline" | "soft" | "ghost" | "danger"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit"
  ariaLabel?: string
  style?: React.CSSProperties
}) {
  return (
    <button
      aria-label={ariaLabel}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  )
}

function useRoute() {
  const [route, setRoute] = useState(
    window.location.pathname + window.location.search,
  )
  useEffect(() => {
    const update = () =>
      setRoute(window.location.pathname + window.location.search)
    window.addEventListener("popstate", update)
    return () => window.removeEventListener("popstate", update)
  }, [])

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80)
      }
    }
  }, [route])

  return route
}

function Logo() {
  return (
    <Link to="/" className="logo">
      <span>Bazar</span>Bari<small>.com.bd</small>
    </Link>
  )
}

function Header() {
  const { cart, wishlist, locale, setLocale, t } = useStore()
  const [search, setSearch] = useState("")
  const [focused, setFocused] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const searchContainerRef = useRef<HTMLFormElement>(null)

  const suggestions = useMemo(
    () =>
      products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.brand.toLowerCase().includes(search.toLowerCase()),
        )
        .slice(0, 5),
    [search],
  )

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`)
    } else {
      navigate("/category/electronics")
    }
    setFocused(false)
  }

  const handleChipClick = (term: string) => {
    setSearch(term)
    setFocused(false)
    navigate(`/search?q=${encodeURIComponent(term)}`)
  }

  return (
    <>
      <div className="announcement">
        <div className="shell">
          <span>
            <Zap size={14} /> Free delivery over ৳5,000 across Bangladesh
          </span>
          <strong>11.11 Mega Sale · Up to 70% off</strong>
          <Link to="/support">Help & Support</Link>
        </div>
      </div>
      <header className="header">
        <div className="shell header-main">
          <button
            className="mobile-menu"
            aria-label="Open mobile menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu />
          </button>
          <Logo />
          <form className="search" onSubmit={submit} ref={searchContainerRef}>
            <Search size={19} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder={t.search}
              aria-label={t.search}
            />
            {focused && (
              <div className="search-popover">
                <div className="search-head">
                  <b>{search ? "Suggested products" : "Trending searches"}</b>
                  <button
                    onClick={() => setFocused(false)}
                    type="button"
                    aria-label="Close search popover"
                  >
                    <X size={17} />
                  </button>
                </div>
                {!search && (
                  <div className="chips">
                    <button
                      type="button"
                      onClick={() => handleChipClick("Samsung")}
                    >
                      Samsung
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChipClick("Apple")}
                    >
                      Apple
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChipClick("Rice")}
                    >
                      Miniket rice
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChipClick("Kurti")}
                    >
                      Cotton kurti
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChipClick("Blender")}
                    >
                      Blender
                    </button>
                  </div>
                )}
                {(search ? suggestions : products.slice(0, 4)).map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.slug}`}
                    className="suggestion"
                    onClick={() => setFocused(false)}
                  >
                    <img src={p.image} alt={p.name} />
                    <span>
                      <b>{p.name}</b>
                      <small>
                        {p.brand} · {money(p.price, locale)}
                      </small>
                    </span>
                    <ChevronRight size={16} />
                  </Link>
                ))}
              </div>
            )}
          </form>
          <div className="header-actions">
            <button
              className="lang"
              onClick={() => setLocale(locale === "en" ? "bn" : "en")}
              title={locale === "en" ? "Switch to Bangla" : "Switch to English"}
            >
              <Languages size={18} />
              <span>{locale === "en" ? "বাংলা" : "EN"}</span>
            </button>
            <Link to="/wishlist" label={t.wishlist}>
              <Heart />
              <span>{t.wishlist}</span>
              {wishlist.length > 0 && <em>{wishlist.length}</em>}
            </Link>
            <Link to="/account" label={t.account}>
              <User />
              <span>{t.account}</span>
            </Link>
            <Link to="/cart" label={t.cart}>
              <ShoppingCart />
              <span>{t.cart}</span>
              {cart.length > 0 && (
                <em>{cart.reduce((s, x) => s + x.quantity, 0)}</em>
              )}
            </Link>
          </div>
        </div>
        <nav className="category-nav">
          <div className="shell">
            <Link to="/category/electronics" className="all-cat">
              <Menu size={17} /> All Categories
            </Link>
            <Link to="/#flash">Flash Sale</Link>
            {categories.map((c) => (
              <Link key={c.slug} to={`/category/${c.slug}`}>
                {locale === "bn" ? c.bn : c.label}
              </Link>
            ))}
            <Link to="/track-order">Track Order</Link>
            <Link to="/support">Customer Care</Link>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head" style={{ marginBottom: 20 }}>
              <Logo />
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              <div
                style={{
                  padding: "12px 14px",
                  background: "#f8fafb",
                  borderRadius: 9,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600 }}>
                  Language / ভাষা:
                </span>
                <Button
                  variant="outline"
                  onClick={() => setLocale(locale === "en" ? "bn" : "en")}
                  className="py-1 px-3 text-xs"
                >
                  <Languages size={14} />{" "}
                  {locale === "en" ? "বাংলা সংস্করণ" : "English"}
                </Button>
              </div>

              <div
                style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: 10 }}
              >
                <small
                  style={{
                    color: "#697386",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    fontSize: 10,
                  }}
                >
                  Categories
                </small>
                <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/category/${c.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        padding: "8px 4px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      <span>{locale === "bn" ? c.bn : c.label}</span>
                      <ChevronRight size={16} color="#9ca3af" />
                    </Link>
                  ))}
                </div>
              </div>

              <div
                style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: 10 }}
              >
                <small
                  style={{
                    color: "#697386",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    fontSize: 10,
                  }}
                >
                  Quick Access
                </small>
                <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                  <Link
                    to="/#flash"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: "8px 4px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontWeight: 600,
                    }}
                  >
                    <Zap size={16} color="#e5484d" /> Flash Sale
                  </Link>
                  <Link
                    to="/track-order"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: "8px 4px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontWeight: 600,
                    }}
                  >
                    <Truck size={16} color="#087f5b" /> Track Your Order
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: "8px 4px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontWeight: 600,
                    }}
                  >
                    <ShoppingCart size={16} color="#087f5b" /> Shopping Cart (
                    {cart.reduce((s, x) => s + x.quantity, 0)})
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: "8px 4px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontWeight: 600,
                    }}
                  >
                    <Heart size={16} color="#087f5b" /> Wishlist (
                    {wishlist.length})
                  </Link>
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: "8px 4px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontWeight: 600,
                    }}
                  >
                    <User size={16} color="#087f5b" /> My Account
                  </Link>
                  <Link
                    to="/support"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: "8px 4px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontWeight: 600,
                    }}
                  >
                    <Headphones size={16} color="#087f5b" /> Help & Support
                  </Link>
                </div>
              </div>

              <div
                style={{ padding: "10px 0", color: "#697386", fontSize: 12 }}
              >
                <p style={{ margin: 0 }}>
                  Customer Helpline: <b>09678-888-777</b>
                </p>
                <p style={{ margin: "4px 0 0" }}>Daily 8:00 AM – 11:00 PM</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

function BottomNav() {
  const { cart, t } = useStore()
  return (
    <nav className="bottom-nav">
      <Link to="/">
        <Home />
        <span>{t.home}</span>
      </Link>
      <Link to="/category/electronics">
        <SlidersHorizontal />
        <span>{t.categories}</span>
      </Link>
      <Link to="/wishlist">
        <Heart />
        <span>{t.wishlist}</span>
      </Link>
      <Link to="/account">
        <User />
        <span>{t.account}</span>
      </Link>
      <Link to="/cart">
        <ShoppingCart />
        <span>{t.cart}</span>
        {cart.length > 0 && <em>{cart.reduce((s, x) => s + x.quantity, 0)}</em>}
      </Link>
    </nav>
  )
}

function Footer() {
  return (
    <footer>
      <div className="shell footer-grid">
        <div>
          <Logo />
          <p>
            Bangladesh’s trusted destination for authentic products, fair prices
            and dependable nationwide delivery.
          </p>
          <div className="socials">
            <Globe2 />
            <Camera />
            <CirclePlay />
          </div>
        </div>
        <div>
          <h4>Customer Service</h4>
          <Link to="/support">Help Center</Link>
          <Link to="/track-order">Track Order</Link>
          <Link to="/return-policy">Returns & Refunds</Link>
          <Link to="/shipping-policy">Shipping Policy</Link>
        </div>
        <div>
          <h4>About BazarBari</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
        <div>
          <h4>Pay your way</h4>
          <div className="payment-logos">
            <span>bKash</span>
            <span>Nagad</span>
            <span>VISA</span>
            <span>COD</span>
          </div>
          <p>
            <Headphones size={18} /> 09678-888-777
            <br />
            Every day, 8am–11pm
          </p>
        </div>
      </div>
      <div className="copyright">
        © 2026 BazarBari Retail Technologies Ltd. All rights reserved.
      </div>
    </footer>
  )
}

function Rating({
  value,
  reviews,
}: {
  value: number
  reviews?: number
}) {
  return (
    <span className="rating">
      <Star size={14} fill="currentColor" />
      {value}
      {reviews !== undefined && <small>({reviews.toLocaleString()})</small>}
    </span>
  )
}

function ProductCard({ product }: { product: Product }) {
  const { addCart, toggleWishlist, wishlist, locale, t } = useStore()
  const off = Math.round((1 - product.price / product.originalPrice) * 100)
  const isWish = wishlist.includes(product.id)
  return (
    <article className="product-card">
      <div className="product-media">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} loading="lazy" alt={product.name} />
        </Link>
        <span className="discount">{off}% OFF</span>
        <button
          className={`wish ${isWish ? "active" : ""}`}
          onClick={() => toggleWishlist(product)}
          aria-label={isWish ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart fill={isWish ? "currentColor" : "none"} />
        </button>
        <Link className="quick" to={`/product/${product.slug}`}>
          Quick view
        </Link>
      </div>
      <div className="product-info">
        <small>{product.brand}</small>
        <Link to={`/product/${product.slug}`} className="product-title">
          {product.name}
        </Link>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="price">
          <b>{money(product.price, locale)}</b>
          <del>{money(product.originalPrice, locale)}</del>
        </div>
        <div className="stock">
          <span></span>
          {product.stock > 10 ? "In stock" : `Only ${product.stock} left`}
        </div>
        <Button onClick={() => addCart(product)}>
          <ShoppingCart size={17} />
          {t.add}
        </Button>
      </div>
    </article>
  )
}

function Section({
  title,
  subtitle,
  children,
  action,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <section className="section shell">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

function Countdown() {
  const [seconds, setSeconds] = useState(4 * 3600 + 45 * 60 + 32)
  useEffect(() => {
    const id = setInterval(() => setSeconds((v) => Math.max(0, v - 1)), 1000)
    return () => clearInterval(id)
  }, [])
  const pad = (n: number) => String(n).padStart(2, "0")
  return (
    <div className="countdown">
      <Clock3 size={18} />
      <span>{pad(Math.floor(seconds / 3600))}</span>:
      <span>{pad(Math.floor((seconds % 3600) / 60))}</span>:
      <span>{pad(seconds % 60)}</span>
    </div>
  )
}

function HomePage() {
  const { locale, t, notify } = useStore()
  const [slide, setSlide] = useState(0)
  const [newsletterEmail, setNewsletterEmail] = useState("")

  const slides = [
    {
      eyebrow: "POHELA BOISHAKH 1433",
      title: "Celebrate in color",
      copy: "Fresh fashion, festive essentials and joyful savings up to 70%.",
      image: heroFashion,
    },
    {
      eyebrow: "ELECTRONICS UPGRADE",
      title: "Smarter tech, better prices",
      copy: "Official devices and appliances with dependable local warranty.",
      image: heroTech,
    },
    {
      eyebrow: "11.11 MEGA FESTIVAL",
      title: "The biggest cart of the year",
      copy: "Limited-time drops every hour. Add favorites before they’re gone.",
      image: products[1].image,
    },
  ]

  useEffect(() => {
    const id = setInterval(() => setSlide((v) => (v + 1) % 3), 6000)
    return () => clearInterval(id)
  }, [])

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (newsletterEmail.trim()) {
      notify("Thank you for subscribing to BazarBari offers!")
      setNewsletterEmail("")
    }
  }

  const s = slides[slide]
  return (
    <main>
      <section className="hero shell">
        <div className="hero-main">
          <div className="hero-copy">
            <span>{s.eyebrow}</span>
            <h1>{s.title}</h1>
            <p>{s.copy}</p>
            <Button onClick={() => navigate("/category/fashion")}>
              Shop the collection <ArrowRight size={18} />
            </Button>
          </div>
          <img src={s.image} alt="BazarBari seasonal campaign" />
          <button
            className="hero-prev"
            onClick={() => setSlide((slide + 2) % 3)}
            aria-label="Previous slide"
          >
            <ArrowLeft />
          </button>
          <button
            className="hero-next"
            onClick={() => setSlide((slide + 1) % 3)}
            aria-label="Next slide"
          >
            <ArrowRight />
          </button>
          <div className="dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={i === slide ? "active" : ""}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <aside className="deal-card">
          <div className="deal-head">
            <div>
              <small>ENDS SOON</small>
              <h3>Flash deal</h3>
            </div>
            <Countdown />
          </div>
          <img src={products[3].image} alt={products[3].name} />
          <b>{products[3].name}</b>
          <div className="price">
            <strong>{money(products[3].price, locale)}</strong>
            <del>{money(products[3].originalPrice, locale)}</del>
          </div>
          <Button onClick={() => navigate(`/product/${products[3].slug}`)}>
            Grab the deal
          </Button>
        </aside>
      </section>

      <Section
        title={locale === "bn" ? "জনপ্রিয় ক্যাটাগরি" : "Shop popular categories"}
        subtitle="Everything you need, in one trusted place"
      >
        <div className="category-cards">
          {categories.map((c, i) => {
            const Icons = [Smartphone, Shirt, ShoppingBasket, LampDesk]
            const Icon = Icons[i] || Smartphone
            return (
              <Link key={c.slug} to={`/category/${c.slug}`}>
                <span>
                  <Icon />
                </span>
                <b>{locale === "bn" ? c.bn : c.label}</b>
                <small>
                  {products.filter((p) => p.category === c.slug).length}+ items
                </small>
              </Link>
            )
          })}
          <Link to="/category/electronics">
            <span>
              <Store />
            </span>
            <b>Top brands</b>
            <small>Official stores</small>
          </Link>
        </div>
      </Section>

      <section className="flash-wrap" id="flash">
        <Section
          title={t.flash}
          subtitle="Limited stock. Prices return when the timer ends."
          action={
            <div className="flash-actions">
              <Countdown />
              <Link to="/category/electronics">
                {t.viewAll}
                <ChevronRight />
              </Link>
            </div>
          }
        >
          <div className="product-grid">
            {products.slice(0, 5).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>
      </section>

      <Section
        title="Recommended for you"
        subtitle="Popular picks based on what Bangladesh is shopping today"
        action={
          <Link to="/category/electronics">
            {t.viewAll}
            <ChevronRight />
          </Link>
        }
      >
        <div className="product-grid">
          {products.slice(10, 15).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <section className="promo shell">
        <div>
          <small>WEEKLY GROCERY</small>
          <h2>Stock the pantry, skip the queue</h2>
          <p>Fresh essentials delivered from ৳60 across Dhaka.</p>
          <Button onClick={() => navigate("/category/grocery")}>
            Shop groceries
          </Button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
          alt="Fresh grocery market"
        />
      </section>

      <Section
        title="Trending electronics"
        subtitle="Official devices with warranty"
      >
        <div className="product-grid">
          {products
            .filter((p) => p.category === "electronics")
            .slice(5, 10)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </Section>

      <Section
        title="Daily essentials"
        subtitle="Fair prices on family favorites"
      >
        <div className="product-grid">
          {products
            .filter((p) => p.category === "grocery")
            .slice(0, 5)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </Section>

      <Trust />

      <section className="newsletter">
        <div className="shell">
          <div>
            <small>BETTER DEALS, ON TIME</small>
            <h2>Get offers worth opening</h2>
            <p>Weekly drops, local campaigns and useful shopping updates.</p>
          </div>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Email address"
            />
            <Button type="submit">
              Subscribe <Send size={18} />
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}

function Trust() {
  const items = [
    [ShieldCheck, "Authentic products", "Verified official sellers"],
    [Truck, "Nationwide delivery", "64 districts covered"],
    [RotateCcw, "Easy returns", "7-day return window"],
    [LockKeyhole, "Secure checkout", "Protected mock payments"],
  ]
  return (
    <section className="trust shell">
      {items.map(([Icon, title, text]) => {
        const I = Icon as typeof ShieldCheck
        return (
          <div key={String(title)}>
            <I />
            <span>
              <b>{String(title)}</b>
              <small>{String(text)}</small>
            </span>
          </div>
        )
      })}
    </section>
  )
}

type Filters = {
  brands: string[]
  max: number
  rating: number
  express: boolean
}
function ProductListing({
  category,
  query,
}: {
  category?: string
  query?: string
}) {
  const base = useMemo(
    () =>
      products.filter(
        (p) =>
          (!category || p.category === category) &&
          (!query ||
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase())),
      ),
    [category, query],
  )

  const brands = useMemo(() => [...new Set(base.map((p) => p.brand))], [base])
  const [filters, setFilters] = useState<Filters>({
    brands: [],
    max: 150000,
    rating: 0,
    express: false,
  })
  const [sort, setSort] = useState("relevance")
  const [drawer, setDrawer] = useState(false)

  // Reset filters when category or query changes
  useEffect(() => {
    setFilters({ brands: [], max: 150000, rating: 0, express: false })
    setSort("relevance")
  }, [category, query])

  const filtered = useMemo(() => {
    let out = base.filter(
      (p) =>
        (!filters.brands.length || filters.brands.includes(p.brand)) &&
        p.price <= filters.max &&
        p.rating >= filters.rating &&
        (!filters.express || p.express),
    )
    if (sort === "low") out = [...out].sort((a, b) => a.price - b.price)
    if (sort === "high") out = [...out].sort((a, b) => b.price - a.price)
    if (sort === "rating") out = [...out].sort((a, b) => b.rating - a.rating)
    if (sort === "new")
      out = [...out].sort((a, b) => Number(b.isNew) - Number(a.isNew))
    return out
  }, [base, filters, sort])

  const title = query
    ? `Results for “${query}”`
    : category
      ? category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "All products"

  const sidebar = (
    <FiltersPanel brands={brands} filters={filters} setFilters={setFilters} />
  )

  return (
    <main className="listing-page shell">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <span>{query ? "Search" : title}</span>
      </div>
      <div className="listing-title">
        <div>
          <h1>{title}</h1>
          <p>
            {base.length
              ? `${filtered.length} of ${base.length} products available`
              : "We could not find an exact match. Try “Samsung”, “Rice” or “iPhone”."}
          </p>
        </div>
        <div className="sort">
          <label>Sort by</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevance">Relevance</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="new">Newest Arrivals</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
        <Button
          variant="outline"
          className="filter-mobile"
          onClick={() => setDrawer(true)}
        >
          <Filter size={18} /> Filters{" "}
          {filters.brands.length > 0 ? `(${filters.brands.length})` : ""}
        </Button>
      </div>
      <div className="listing-layout">
        <aside className="filters">{sidebar}</aside>
        <div className="results">
          {filtered.length ? (
            <div className="product-grid four">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <Empty
              icon={<Search />}
              title="No products found"
              text="Try clearing filters or searching for something else."
              action={
                <Button
                  onClick={() =>
                    setFilters({
                      brands: [],
                      max: 150000,
                      rating: 0,
                      express: false,
                    })
                  }
                >
                  Clear all filters
                </Button>
              }
            />
          )}
        </div>
      </div>
      {drawer && (
        <div className="drawer-backdrop" onClick={() => setDrawer(false)}>
          <aside className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <h2>Filters</h2>
              <button
                onClick={() => setDrawer(false)}
                aria-label="Close filters"
              >
                <X />
              </button>
            </div>
            {sidebar}
            <Button onClick={() => setDrawer(false)} style={{ marginTop: 20 }}>
              Show {filtered.length} products
            </Button>
          </aside>
        </div>
      )}
    </main>
  )
}

function FiltersPanel({
  brands,
  filters,
  setFilters,
}: {
  brands: string[]
  filters: Filters
  setFilters: (v: Filters) => void
}) {
  const count =
    filters.brands.length +
    Number(filters.rating > 0) +
    Number(filters.express) +
    Number(filters.max < 150000)
  return (
    <>
      <div className="filter-top">
        <h3>Filters {count > 0 && <span>{count}</span>}</h3>
        <button
          type="button"
          onClick={() =>
            setFilters({ brands: [], max: 150000, rating: 0, express: false })
          }
        >
          Clear all
        </button>
      </div>
      <div className="filter-group">
        <h4>
          Price range <ChevronDown size={14} />
        </h4>
        <input
          type="range"
          min="500"
          max="150000"
          step="500"
          value={filters.max}
          onChange={(e) =>
            setFilters({ ...filters, max: Number(e.target.value) })
          }
        />
        <div className="range-label">
          <span>৳500</span>
          <b>Up to {money(filters.max)}</b>
        </div>
      </div>
      {brands.length > 0 && (
        <div className="filter-group">
          <h4>
            Brand <ChevronDown size={14} />
          </h4>
          {brands.map((b) => (
            <label key={b}>
              <input
                type="checkbox"
                checked={filters.brands.includes(b)}
                onChange={() =>
                  setFilters({
                    ...filters,
                    brands: filters.brands.includes(b)
                      ? filters.brands.filter((x) => x !== b)
                      : [...filters.brands, b],
                  })
                }
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      )}
      <div className="filter-group">
        <h4>
          Customer rating <ChevronDown size={14} />
        </h4>
        {[4.5, 4, 3].map((r) => (
          <label key={r}>
            <input
              type="checkbox"
              checked={filters.rating === r}
              onChange={() =>
                setFilters({ ...filters, rating: filters.rating === r ? 0 : r })
              }
            />
            <span className="rating-filter">
              <Star size={13} fill="currentColor" />
              {r} & above
            </span>
          </label>
        ))}
      </div>
      <div className="filter-group">
        <h4>
          Delivery <ChevronDown size={14} />
        </h4>
        <label>
          <input
            type="checkbox"
            checked={filters.express}
            onChange={(e) =>
              setFilters({ ...filters, express: e.target.checked })
            }
          />
          <span>Express delivery eligible</span>
        </label>
      </div>
    </>
  )
}

function ProductPage({ slug }: { slug: string }) {
  const product = getProduct(slug) || products[0]
  const { addCart, toggleWishlist, wishlist, locale, t, notify } = useStore()
  const [option, setOption] = useState<string | undefined>(product.options?.[0])
  const [color, setColor] = useState<string | undefined>(product.colors?.[0])
  const [activeThumb, setActiveThumb] = useState(0)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState("Description")
  const [division, setDivision] = useState("Dhaka")
  const [zoom, setZoom] = useState(false)
  const [qaQuestion, setQaQuestion] = useState("")

  // Sync state whenever slug changes
  useEffect(() => {
    setOption(product.options?.[0])
    setColor(product.colors?.[0])
    setActiveThumb(0)
    setQty(1)
  }, [slug, product])

  const discount = Math.round((1 - product.price / product.originalPrice) * 100)
  const isWish = wishlist.includes(product.id)

  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault()
    if (qaQuestion.trim()) {
      notify("Question submitted to verified seller and community!")
      setQaQuestion("")
    }
  }

  return (
    <main className="pdp shell">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${product.category}`}>
          {product.category.replace("-", " ")}
        </Link>
        <ChevronRight size={14} />
        <span>{product.name}</span>
      </div>
      <div className="pdp-main">
        <section className="gallery">
          <div className="thumbs">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                className={activeThumb === i ? "active" : ""}
                onClick={() => setActiveThumb(i)}
                aria-label={`View photo ${i + 1}`}
              >
                <img
                  src={product.image}
                  alt={`${product.name} view ${i + 1}`}
                />
                {i === 3 && <Eye size={14} />}
              </button>
            ))}
          </div>
          <button
            className="main-image"
            onClick={() => setZoom(true)}
            aria-label="Enlarge product image"
          >
            <img src={product.image} alt={product.name} />
            <span>
              <Search size={16} /> Click to enlarge
            </span>
          </button>
        </section>
        <section className="pdp-info">
          <span className="brand-label">{product.brand} Official Store</span>
          <h1>{product.name}</h1>
          <div className="pdp-meta">
            <Rating value={product.rating} reviews={product.reviews} />
            <span>SKU: {product.sku}</span>
            <span className="verified">
              <BadgeCheck size={15} /> Authentic Local Stock
            </span>
          </div>
          <div className="pdp-price">
            <b>{money(product.price, locale)}</b>
            <del>{money(product.originalPrice, locale)}</del>
            <span>{discount}% OFF</span>
          </div>
          <p className="saving">
            You save {money(product.originalPrice - product.price, locale)}
          </p>
          <p className="description">{product.description}</p>
          <div className="availability">
            <BadgeCheck size={16} /> In stock · {product.stock} items available
          </div>
          {product.colors && (
            <div className="variant">
              <label>
                Color: <b>{color}</b>
              </label>
              <div>
                {product.colors.map((c, i) => (
                  <button
                    key={c}
                    type="button"
                    className={color === c ? "active" : ""}
                    onClick={() => setColor(c)}
                  >
                    <i className={`swatch swatch-${i}`} />
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
          {product.options && (
            <div className="variant">
              <label>
                {product.category === "fashion" ? "Size" : "Capacity"}:{" "}
                <b>{option}</b>
              </label>
              <div>
                {product.options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    className={option === o ? "active" : ""}
                    onClick={() => setOption(o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="purchase-row">
            <Quantity value={qty} setValue={setQty} max={product.stock} />
            <Button
              className="add-big"
              onClick={() => addCart(product, option, qty, color)}
            >
              <ShoppingCart size={18} />
              {t.add}
            </Button>
            <Button
              variant="outline"
              ariaLabel={isWish ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => toggleWishlist(product)}
            >
              <Heart fill={isWish ? "currentColor" : "none"} />
            </Button>
          </div>
          <Button
            className="buy-now"
            variant="outline"
            onClick={() => {
              addCart(product, option, qty, color)
              navigate("/checkout")
            }}
          >
            {t.buy}
          </Button>
          <div className="delivery-box">
            <div>
              <MapPin size={18} />
              <span>
                <b>Deliver to</b>
                <small>Realistic delivery estimates across 64 districts</small>
              </span>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
              >
                {Object.keys(addressData).map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="delivery-options">
              <span>
                <Truck size={17} />
                <b>Standard</b>
                <small>
                  {product.price > 5000 ? "2–3 days · FREE" : "2–3 days · ৳60"}
                </small>
              </span>
              <span>
                <Zap size={17} />
                <b>Express</b>
                <small>
                  {division === "Dhaka"
                    ? product.price > 5000
                      ? "Tomorrow · ৳60"
                      : "Tomorrow · ৳120"
                    : "Unavailable"}
                </small>
              </span>
            </div>
          </div>
          <div className="payment-strip">
            <span>
              <Wallet size={16} /> bKash
            </span>
            <span>Nagad</span>
            <span>VISA</span>
            <span>Mastercard</span>
            <span>
              <Banknote size={16} /> COD
            </span>
          </div>
        </section>
      </div>
      <section className="tabs">
        <div className="tab-nav">
          {[
            "Description",
            "Specifications",
            "Reviews",
            "Q&A",
            "Delivery & Returns",
          ].map((x) => (
            <button
              className={tab === x ? "active" : ""}
              onClick={() => setTab(x)}
              key={x}
              type="button"
            >
              {x}
              {x === "Reviews" && ` (${product.reviews.toLocaleString()})`}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {tab === "Description" && (
            <>
              <h2>Made for everyday confidence</h2>
              <p>
                {product.description} Every item is quality checked and
                fulfilled with transparent delivery estimates.
              </p>
              <ul>
                <li>Official local distribution and authentic guarantee</li>
                <li>Easy seven-day replacement or return eligibility</li>
                <li>Nationwide delivery with reliable courier partners</li>
              </ul>
            </>
          )}
          {tab === "Specifications" && (
            <div className="specs">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k}>
                  <b>{k}</b>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "Reviews" && <Reviews product={product} />}
          {tab === "Q&A" && (
            <div>
              <Empty
                icon={<CircleHelp />}
                title="Ask about this product"
                text="Have questions regarding sizing, warranty, or delivery? Ask here."
              />
              <form
                onSubmit={handleAskQuestion}
                style={{
                  maxWidth: 500,
                  margin: "20px auto 0",
                  display: "flex",
                  gap: 8,
                }}
              >
                <input
                  value={qaQuestion}
                  onChange={(e) => setQaQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  style={{
                    flex: 1,
                    padding: "0 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    height: 42,
                  }}
                />
                <Button type="submit">Submit Question</Button>
              </form>
            </div>
          )}
          {tab === "Delivery & Returns" && (
            <>
              <h2>Simple, transparent delivery & returns</h2>
              <p>
                Standard delivery typically takes 2–3 business days in Dhaka and
                3–5 days outside Dhaka. Eligible unopened items can be returned
                within seven days of receipt.
              </p>
            </>
          )}
        </div>
      </section>
      {zoom && (
        <div className="modal-backdrop" onClick={() => setZoom(false)}>
          <div className="image-modal">
            <button onClick={() => setZoom(false)} aria-label="Close zoom">
              <X />
            </button>
            <img src={product.image} alt={product.name} />
          </div>
        </div>
      )}
    </main>
  )
}

function Reviews({ product }: { product: Product }) {
  const [helpfulCounts, setHelpfulCounts] = useState<{ [key: string]: number }>(
    { "rev-1": 24, "rev-2": 18 },
  )
  const [hasVoted, setHasVoted] = useState<{ [key: string]: boolean }>({})

  const toggleHelpful = (id: string) => {
    if (hasVoted[id]) {
      setHelpfulCounts((c) => ({ ...c, [id]: c[id] - 1 }))
      setHasVoted((v) => ({ ...v, [id]: false }))
    } else {
      setHelpfulCounts((c) => ({ ...c, [id]: c[id] + 1 }))
      setHasVoted((v) => ({ ...v, [id]: true }))
    }
  }

  return (
    <div className="reviews">
      <div className="review-summary">
        <strong>{product.rating}</strong>
        <Rating value={product.rating} />
        <span>
          Based on {product.reviews.toLocaleString()} verified ratings
        </span>
        {[5, 4, 3, 2, 1].map((n) => (
          <div key={n}>
            <small>{n} star</small>
            <i>
              <span style={{ width: `${n === 5 ? 78 : n === 4 ? 16 : 2}%` }} />
            </i>
          </div>
        ))}
      </div>
      <div className="review-list">
        <article>
          <div>
            <b>Nusrat Jahan</b>
            <span>Verified purchase</span>
          </div>
          <Rating value={5} />
          <p>
            Delivery was prompt and the parcel was securely packed. 100%
            authentic product matching the description.
          </p>
          <small>Dhaka · 12 October 2026</small>
          <button type="button" onClick={() => toggleHelpful("rev-1")}>
            Helpful ({helpfulCounts["rev-1"]}) {hasVoted["rev-1"] ? "✓" : ""}
          </button>
        </article>
        <article>
          <div>
            <b>Tanvir Ahmed</b>
            <span>Verified purchase</span>
          </div>
          <Rating value={4.7} />
          <p>
            Great value for money. Warranty card and official seals were intact.
            BazarBari kept me notified via SMS.
          </p>
          <small>Chattogram · 29 September 2026</small>
          <button type="button" onClick={() => toggleHelpful("rev-2")}>
            Helpful ({helpfulCounts["rev-2"]}) {hasVoted["rev-2"] ? "✓" : ""}
          </button>
        </article>
      </div>
    </div>
  )
}

function Quantity({
  value,
  setValue,
  max,
}: {
  value: number
  setValue: (n: number) => void
  max: number
}) {
  return (
    <div className="quantity">
      <button
        type="button"
        onClick={() => setValue(Math.max(1, value - 1))}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span>{value}</span>
      <button
        type="button"
        onClick={() => setValue(Math.min(max, value + 1))}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}

function CartPage() {
  const {
    cart,
    subtotal,
    shipping,
    discount,
    total,
    updateQty,
    removeCart,
    toggleSelected,
    selectAll,
    saveForLater,
    applyCoupon,
    locale,
    t,
  } = useStore()
  const [code, setCode] = useState("")

  if (!cart.length) {
    return (
      <main className="shell page-space">
        <Empty
          icon={<ShoppingCart />}
          title="Your cart is ready for something great"
          text="Explore customer favorites and add what you love."
          action={<Button onClick={() => navigate("/")}>Start shopping</Button>}
        />
      </main>
    )
  }

  const allSelected = cart.length > 0 && cart.every((x) => x.selected)

  return (
    <main className="cart-page shell">
      <div className="page-title">
        <h1>Shopping cart</h1>
        <p>{cart.reduce((s, x) => s + x.quantity, 0)} items saved in cart</p>
      </div>
      <div className="cart-layout">
        <section className="cart-lines">
          <label className="select-all">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => selectAll(!allSelected)}
            />
            <b>Select all items ({cart.length})</b>
          </label>
          {cart.map((line) => (
            <article
              className={!line.selected ? "muted" : ""}
              key={`${line.product.id}-${line.option || ""}-${line.color || ""}`}
            >
              <input
                type="checkbox"
                checked={line.selected}
                onChange={() => toggleSelected(line.product.id, line.option)}
                aria-label={`Select ${line.product.name}`}
              />
              <img src={line.product.image} alt={line.product.name} />
              <div className="line-detail">
                <Link to={`/product/${line.product.slug}`}>
                  {line.product.name}
                </Link>
                <small>
                  {line.option && `${line.option} · `}
                  {line.color && `${line.color} · `}SKU: {line.product.sku}
                </small>
                <span className="in-stock">In stock</span>
                <div>
                  <button
                    type="button"
                    onClick={() => removeCart(line.product.id, line.option)}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                  <button
                    type="button"
                    onClick={() => saveForLater(line.product, line.option)}
                  >
                    <Heart size={14} /> Save for later
                  </button>
                </div>
              </div>
              <div className="line-price">
                <b>{money(line.product.price * line.quantity, locale)}</b>
                <small>{money(line.product.price, locale)} each</small>
                <Quantity
                  value={line.quantity}
                  setValue={(v) => updateQty(line.product.id, v, line.option)}
                  max={line.product.stock}
                />
              </div>
            </article>
          ))}
        </section>
        <OrderSummary
          code={code}
          setCode={setCode}
          apply={() => applyCoupon(code)}
          subtotal={subtotal}
          shipping={shipping}
          discount={discount}
          total={total}
          action={
            <Button
              disabled={!cart.some((x) => x.selected)}
              onClick={() => navigate("/checkout")}
            >
              {t.checkout}
              <ArrowRight size={18} />
            </Button>
          }
        />
      </div>
    </main>
  )
}

function OrderSummary({
  code,
  setCode,
  apply,
  subtotal,
  shipping,
  discount,
  total,
  action,
}: {
  code: string
  setCode: (v: string) => void
  apply: () => void
  subtotal: number
  shipping: number
  discount: number
  total: number
  action: ReactNode
}) {
  return (
    <aside className="order-summary">
      <h2>Order summary</h2>
      <div className="coupon">
        <label>Have a voucher?</label>
        <div>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. WELCOME100"
          />
          <Button onClick={apply} variant="outline">
            Apply
          </Button>
        </div>
        <small>
          Try{" "}
          <button
            type="button"
            onClick={() => setCode("WELCOME100")}
            style={{
              background: "none",
              border: "none",
              color: "#087f5b",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            WELCOME100
          </button>
          ,{" "}
          <button
            type="button"
            onClick={() => setCode("EID15")}
            style={{
              background: "none",
              border: "none",
              color: "#087f5b",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            EID15
          </button>{" "}
          or{" "}
          <button
            type="button"
            onClick={() => setCode("SAVE500")}
            style={{
              background: "none",
              border: "none",
              color: "#087f5b",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            SAVE500
          </button>
        </small>
      </div>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{money(subtotal)}</dd>
        </div>
        <div>
          <dt>Estimated delivery</dt>
          <dd>{shipping ? money(shipping) : "FREE"}</dd>
        </div>
        {discount > 0 && (
          <div className="discount-row">
            <dt>Voucher discount</dt>
            <dd>−{money(discount)}</dd>
          </div>
        )}
        <div className="summary-total">
          <dt>Total</dt>
          <dd>{money(total)}</dd>
        </div>
      </dl>
      {action}
      <p>
        <ShieldCheck size={16} /> Secure, encrypted checkout
      </p>
    </aside>
  )
}

function CheckoutPage() {
  const { cart, subtotal, discount, notify, addOrder, clearCart } = useStore()
  const [form, setForm] = useState({
    name: "Sabbir Hasan",
    phone: "01711002233",
    email: "sabbir.hasan@example.com",
    division: "Dhaka",
    district: "Dhaka",
    thana: "Uttara",
    postal: "1230",
    street: "House 14, Road 5, Sector 3",
  })
  const [payment, setPayment] = useState("bKash")
  const [express, setExpress] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState(false)

  const districts = Object.keys(addressData[form.division] || {})
  const thanas =
    (addressData[form.division] && addressData[form.division][form.district]) ||
    []

  const validPhone = /^(\+?880|0)?1[3-9]\d{8}$/.test(
    form.phone.replace(/[\s-]/g, ""),
  )
  const valid = form.name.trim() && validPhone && form.street.trim() && payment

  const deliveryFee = express
    ? subtotal > 5000
      ? 60
      : 120
    : subtotal > 5000
      ? 0
      : 60
  const totalPayable = Math.max(0, subtotal + deliveryFee - discount)

  const place = () => {
    if (!valid) return
    if (payment === "Cash on Delivery" && !otp) {
      setOtp(true)
      return
    }
    setLoading(true)

    const orderId = `BB-20261101-${Math.floor(10000 + Math.random() * 90000)}`
    const now = new Date()
    const dateStr =
      now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      ", " +
      now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

    const newOrder: Order = {
      id: orderId,
      date: dateStr,
      status: "Order Placed",
      courier: "Pathao Courier",
      tracking: `PTH-${Math.floor(10000000 + Math.random() * 90000000)}`,
      customer: { ...form },
      paymentMethod:
        payment === "Cash on Delivery"
          ? "Cash on Delivery"
          : `${payment} Online`,
      paymentStatus:
        payment === "Cash on Delivery" ? "Cash on Delivery" : "Paid",
      items: cart.filter((x) => x.selected),
      subtotal,
      shipping: deliveryFee,
      discount,
      total: totalPayable,
    }

    setTimeout(() => {
      setLoading(false)
      addOrder(newOrder)
      clearCart()
      notify("Order placed successfully!")
      if (payment === "Cash on Delivery") {
        navigate(`/order-confirmation/${orderId}`)
      } else {
        navigate(`/payment/success?orderId=${orderId}`)
      }
    }, 1200)
  }

  if (!cart.length) {
    return (
      <main className="shell page-space">
        <Empty
          icon={<ShoppingBag />}
          title="Your checkout is empty"
          text="Add products to your cart before proceeding to checkout."
          action={
            <Button onClick={() => navigate("/")}>Browse products</Button>
          }
        />
      </main>
    )
  }

  return (
    <main className="checkout shell">
      <div className="checkout-head">
        <div>
          <span>SECURE CHECKOUT</span>
          <h1>Complete your order</h1>
        </div>
        <p>
          <LockKeyhole size={16} /> Your information is protected
        </p>
      </div>
      <div className="checkout-layout">
        <div className="checkout-sections">
          <CheckoutSection number="1" title="Contact information" done>
            <div className="form-grid">
              <Field
                label="Full name"
                value={form.name}
                set={(v) => setForm({ ...form, name: v })}
              />
              <Field
                label="Phone number"
                value={form.phone}
                set={(v) => setForm({ ...form, phone: v })}
                error={
                  form.phone && !validPhone
                    ? "Enter a valid Bangladesh phone number"
                    : ""
                }
              />
              <Field
                label="Email address"
                value={form.email}
                set={(v) => setForm({ ...form, email: v })}
              />
            </div>
            <div className="auth-row">
              <Button variant="soft" onClick={() => setOtp(true)}>
                Verify with simulated OTP
              </Button>
              <span>or continue as guest</span>
            </div>
          </CheckoutSection>

          <CheckoutSection number="2" title="Shipping address">
            <div className="saved-address">
              <input type="radio" checked readOnly />
              <MapPin size={18} />
              <span>
                <b>Home</b>
                <small>
                  {form.street}, {form.thana}, {form.district} {form.postal}
                </small>
              </span>
              <BadgeCheck size={16} />
            </div>
            <div className="form-grid">
              <SelectField
                label="Division"
                value={form.division}
                options={Object.keys(addressData)}
                set={(v) => {
                  const firstDist = Object.keys(addressData[v] || {})[0] || ""
                  const firstThana =
                    (addressData[v] &&
                      addressData[v][firstDist] &&
                      addressData[v][firstDist][0]) ||
                    ""
                  setForm({
                    ...form,
                    division: v,
                    district: firstDist,
                    thana: firstThana,
                  })
                }}
              />
              <SelectField
                label="District"
                value={form.district}
                options={districts}
                set={(v) => {
                  const firstThana =
                    (addressData[form.division] &&
                      addressData[form.division][v] &&
                      addressData[form.division][v][0]) ||
                    ""
                  setForm({ ...form, district: v, thana: firstThana })
                }}
              />
              <SelectField
                label="Thana"
                value={form.thana}
                options={thanas}
                set={(v) => setForm({ ...form, thana: v })}
              />
              <Field
                label="Postal code"
                value={form.postal}
                set={(v) => setForm({ ...form, postal: v })}
              />
              <Field
                label="Detailed street address"
                value={form.street}
                set={(v) => setForm({ ...form, street: v })}
                wide
              />
            </div>
            <label className="check-row">
              <input type="checkbox" defaultChecked /> Billing address is the
              same as shipping
            </label>
          </CheckoutSection>

          <CheckoutSection number="3" title="Delivery method">
            <div className="choice-grid">
              <button
                type="button"
                className={!express ? "selected" : ""}
                onClick={() => setExpress(false)}
              >
                <span>
                  <Truck size={18} />
                  <b>Standard delivery</b>
                  <small>2–3 business days</small>
                </span>
                <strong>{subtotal > 5000 ? "FREE" : "৳60"}</strong>
              </button>
              <button
                type="button"
                className={express ? "selected" : ""}
                onClick={() => setExpress(true)}
              >
                <span>
                  <Zap size={18} />
                  <b>Express delivery</b>
                  <small>Next day in Dhaka metro</small>
                </span>
                <strong>{subtotal > 5000 ? "৳60" : "৳120"}</strong>
              </button>
            </div>
          </CheckoutSection>

          <CheckoutSection number="4" title="Payment method">
            <div className="payment-options">
              {[
                "bKash",
                "Nagad",
                "Rocket",
                "Visa / Mastercard",
                "Cash on Delivery",
              ].map((p, i) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPayment(p)}
                  className={payment === p ? "selected" : ""}
                >
                  <span>
                    {i < 3 ? (
                      <Wallet size={18} />
                    ) : i === 3 ? (
                      <CreditCard size={18} />
                    ) : (
                      <Banknote size={18} />
                    )}
                    <b>{p}</b>
                  </span>
                  <i>{payment === p && <Check size={16} />}</i>
                </button>
              ))}
            </div>
            <div className="gateway-note">
              <ShieldCheck size={18} />
              <span>
                <b>
                  {payment === "Cash on Delivery"
                    ? "OTP verification required"
                    : "Secure simulated gateway"}
                </b>
                <small>
                  {payment === "Cash on Delivery"
                    ? "We will verify your phone before order placement."
                    : "You will never be asked for a real PIN or card number in this prototype."}
                </small>
              </span>
            </div>
          </CheckoutSection>
        </div>

        <aside className="checkout-summary">
          <h2>Your order</h2>
          {cart
            .filter((x) => x.selected)
            .map((x) => (
              <div
                className="checkout-item"
                key={`${x.product.id}-${x.option || ""}-${x.color || ""}`}
              >
                <img src={x.product.image} alt={x.product.name} />
                <span>
                  <b>{x.product.name}</b>
                  <small>
                    Qty {x.quantity} {x.option && `· ${x.option}`}{" "}
                    {x.color && `· ${x.color}`}
                  </small>
                </span>
                <strong>{money(x.product.price * x.quantity)}</strong>
              </div>
            ))}
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>{deliveryFee ? money(deliveryFee) : "FREE"}</dd>
            </div>
            {discount > 0 && (
              <div>
                <dt>Discount</dt>
                <dd>−{money(discount)}</dd>
              </div>
            )}
            <div>
              <dt>Total payable</dt>
              <dd>{money(totalPayable)}</dd>
            </div>
          </dl>
          <Button disabled={!valid || loading} onClick={place}>
            {loading
              ? "Creating order…"
              : payment === "Cash on Delivery"
                ? "Place order"
                : "Proceed to payment"}
            <ArrowRight size={18} />
          </Button>
          <p>
            By placing your order, you agree to BazarBari’s terms and return
            policy.
          </p>
        </aside>
      </div>
      {otp && (
        <OTPModal
          onClose={() => setOtp(false)}
          onVerified={() => {
            setOtp(false)
            notify("Phone number verified successfully!")
          }}
        />
      )}
    </main>
  )
}

function CheckoutSection({
  number,
  title,
  children,
  done,
}: {
  number: string
  title: string
  children: ReactNode
  done?: boolean
}) {
  return (
    <section className="checkout-section">
      <div className="checkout-section-title">
        <span className={done ? "done" : ""}>
          {done ? <Check size={14} /> : number}
        </span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Field({
  label,
  value,
  set,
  error,
  wide,
}: {
  label: string
  value: string
  set: (v: string) => void
  error?: string
  wide?: boolean
}) {
  return (
    <label className={`field ${wide ? "wide" : ""}`}>
      <span>{label}</span>
      <input value={value} onChange={(e) => set(e.target.value)} />
      {error && <small className="error">{error}</small>}
    </label>
  )
}

function SelectField({
  label,
  value,
  options,
  set,
}: {
  label: string
  value: string
  options: string[]
  set: (v: string) => void
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(e) => set(e.target.value)}>
        {options.map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
    </label>
  )
}

function OTPModal({
  onClose,
  onVerified,
}: {
  onClose: () => void
  onVerified: () => void
}) {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  return (
    <div className="modal-backdrop">
      <div className="otp-modal">
        <button className="close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>
        <span className="otp-icon">
          <Smartphone size={28} />
        </span>
        <h2>Verify your phone</h2>
        <p>
          This is a simulation. Enter <b>123456</b> to continue. No SMS will be
          sent.
        </p>
        <input
          autoFocus
          value={value}
          maxLength={6}
          onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
          placeholder="• • • • • •"
        />
        {error && (
          <small
            className="error"
            style={{ color: "#dc2626", display: "block", marginBottom: 10 }}
          >
            {error}
          </small>
        )}
        <Button
          onClick={() =>
            value === "123456"
              ? onVerified()
              : setError("Invalid OTP. Use 123456.")
          }
        >
          Verify OTP
        </Button>
        <button
          type="button"
          className="resend"
          onClick={() => setValue("123456")}
        >
          Quick fill: 123456
        </button>
      </div>
    </div>
  )
}

function PaymentResult({
  type,
  orderId,
}: {
  type: "success" | "failed" | "pending"
  orderId?: string
}) {
  const { getOrder, orders } = useStore()
  const order =
    (orderId ? getOrder(orderId) : undefined) ||
    orders[0] ||
    sampleOrder as unknown as Order

  const cfg = {
    success: {
      icon: <Check size={32} />,
      title: "Payment successful",
      text: "Your payment was confirmed and your order is now being prepared for shipment.",
    },
    failed: {
      icon: <X size={32} />,
      title: "Payment failed",
      text: "The payment gateway could not confirm your charge. No debit was made from your balance.",
    },
    pending: {
      icon: <Clock3 size={32} />,
      title: "Payment is processing",
      text: "We are awaiting final webhook confirmation from the payment provider.",
    },
  }[type]

  return (
    <main className={`result-page ${type}`}>
      <div className="result-card">
        <span className="result-icon">{cfg.icon}</span>
        <small>SIMULATED PAYMENT RESULT</small>
        <h1>{cfg.title}</h1>
        <p>{cfg.text}</p>
        <div className="receipt-box">
          <div>
            <span>Reference</span>
            <b>PAY-BB-{order.id.slice(-6)}</b>
          </div>
          <div>
            <span>Order ID</span>
            <b>{order.id}</b>
          </div>
          <div>
            <span>Amount</span>
            <b>{money(order.total)}</b>
          </div>
          <div>
            <span>Method</span>
            <b>{order.paymentMethod}</b>
          </div>
        </div>
        <div className="result-actions">
          {type === "success" ? (
            <>
              <Button
                onClick={() => navigate(`/order-confirmation/${order.id}`)}
              >
                View order details <ArrowRight size={18} />
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Continue shopping
              </Button>
            </>
          ) : type === "failed" ? (
            <>
              <Button onClick={() => navigate("/checkout")}>
                Retry payment
              </Button>
              <Button variant="outline" onClick={() => navigate("/checkout")}>
                Change payment method
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate(`/order-confirmation/${order.id}`)}
              >
                Check status
              </Button>
              <Button variant="outline" onClick={() => navigate("/account")}>
                Go to account
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

function ConfirmationPage({ id }: { id: string }) {
  const { getOrder, orders, notify } = useStore()
  const order = getOrder(id) || orders[0] || sampleOrder as unknown as Order

  const handlePrint = () => {
    notify("Printing receipt...")
    window.print()
  }

  return (
    <main className="confirmation">
      <div className="conf-card">
        <div className="conf-top">
          <span>
            <Check size={28} />
          </span>
          <small>ORDER CONFIRMED</small>
          <h1>Your order is in good hands</h1>
          <p>
            Thank you for shopping with BazarBari, {order.customer.name}. We’ll
            send updates to your phone.
          </p>
          <div className="order-id">
            Order ID: <b>{order.id}</b>
          </div>
        </div>
        <Timeline status={order.status} />
        <div className="confirmation-grid">
          <section>
            <h2>Delivery details</h2>
            <p>
              <b>{order.customer.name}</b>
              <br />
              {order.customer.street}
              <br />
              {order.customer.thana}, {order.customer.district}{" "}
              {order.customer.postal}
              <br />
              {order.customer.phone}
            </p>
            <div className="eta">
              <Truck size={18} />
              <span>
                <small>Estimated delivery courier</small>
                <b>
                  {order.courier} · Tracking: {order.tracking}
                </b>
              </span>
            </div>
          </section>
          <section>
            <h2>Payment & Order summary</h2>
            <dl>
              <div>
                <dt>Payment status</dt>
                <dd className="paid">{order.paymentStatus}</dd>
              </div>
              <div>
                <dt>Method</dt>
                <dd>{order.paymentMethod}</dd>
              </div>
              <div>
                <dt>Items ({order.items.length})</dt>
                <dd>{money(order.subtotal)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>{order.shipping ? money(order.shipping) : "FREE"}</dd>
              </div>
              {order.discount > 0 && (
                <div>
                  <dt>Discount</dt>
                  <dd>−{money(order.discount)}</dd>
                </div>
              )}
              <div>
                <dt>Total</dt>
                <dd style={{ fontWeight: 800 }}>{money(order.total)}</dd>
              </div>
            </dl>
          </section>
        </div>
        <div className="result-actions" style={{ padding: 24 }}>
          <Button onClick={() => navigate(`/track-order?orderId=${order.id}`)}>
            Track your order <ArrowRight size={18} />
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Download size={16} /> Download receipt
          </Button>
          <Button variant="ghost" onClick={() => navigate("/")}>
            Continue shopping
          </Button>
        </div>
      </div>
    </main>
  )
}

function Timeline({ status }: { status?: string }) {
  const stages = [
    "Order placed",
    "Processing",
    "Shipped",
    "Out for delivery",
    "Delivered",
  ]
  const activeIndex =
    status === "Delivered"
      ? 4
      : status === "Out for delivery"
        ? 3
        : status === "Shipped"
          ? 2
          : 1
  return (
    <div className="timeline">
      {stages.map((x, i) => (
        <div className={i <= activeIndex ? "active" : ""} key={x}>
          <span>
            {i < activeIndex ? (
              <Check size={14} />
            ) : i === activeIndex ? (
              <Truck size={14} />
            ) : (
              <Box size={14} />
            )}
          </span>
          <b>{x}</b>
          <small>
            {i <= activeIndex
              ? i === 0
                ? "01 Nov · 10:42"
                : i === 1
                  ? "01 Nov · 12:15"
                  : "02 Nov · 09:30"
              : "Pending"}
          </small>
        </div>
      ))}
    </div>
  )
}

function TrackPage() {
  const { orders } = useStore()
  const searchParams = new URLSearchParams(window.location.search)
  const initialId =
    searchParams.get("orderId") || orders[0]?.id || sampleOrder.id

  const [orderIdInput, setOrderIdInput] = useState(initialId)
  const [phoneInput, setPhoneInput] = useState("01711002233")
  const [searchedOrder, setSearchedOrder] = useState<Order | undefined>(
    () =>
      orders.find((o) => o.id === initialId) || sampleOrder as unknown as Order,
  )

  const handleTrack = (e: FormEvent) => {
    e.preventDefault()
    const cleanId = orderIdInput.trim()
    const found =
      orders.find((o) => o.id.toLowerCase() === cleanId.toLowerCase()) ||
      sampleOrder as unknown as Order
    setSearchedOrder(found)
  }

  return (
    <main className="track-page shell">
      <div className="track-hero">
        <span>ORDER TRACKING</span>
        <h1>Know where your order is</h1>
        <p>
          Enter your BazarBari order ID and phone number for live status
          tracking.
        </p>
        <form onSubmit={handleTrack}>
          <input
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            placeholder="Order ID (e.g. BB-20261101-89421)"
            aria-label="Order ID"
          />
          <input
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            placeholder="Phone number"
            aria-label="Phone number"
          />
          <Button type="submit">
            Track order <Search size={16} />
          </Button>
        </form>
      </div>

      {searchedOrder && (
        <section className="tracking-card">
          <div className="tracking-head">
            <div>
              <small>ORDER {searchedOrder.id}</small>
              <h2>On the way to {searchedOrder.customer.district}</h2>
              <p>
                Recipient: {searchedOrder.customer.name} ·{" "}
                {searchedOrder.customer.street}
              </p>
            </div>
            <span className="status-pill">
              <Truck size={14} /> {searchedOrder.status}
            </span>
          </div>
          <Timeline status={searchedOrder.status} />
          <div className="shipment-info">
            <div>
              <small>Courier partner</small>
              <b>{searchedOrder.courier}</b>
            </div>
            <div>
              <small>Tracking reference</small>
              <b>{searchedOrder.tracking}</b>
            </div>
            <div>
              <small>Delivery destination</small>
              <b>
                {searchedOrder.customer.thana},{" "}
                {searchedOrder.customer.district}
              </b>
            </div>
          </div>
          <div className="tracking-note">
            <Bell size={18} />
            <p>
              <b>Next update</b>
              <br />
              You’ll receive an automated SMS update when the parcel is
              dispatched by {searchedOrder.courier}.
            </p>
          </div>
        </section>
      )}
    </main>
  )
}

function AccountPage({ orderDetail = false }: { orderDetail?: boolean }) {
  const [tab, setTab] = useState(orderDetail ? "orders" : "overview")
  const nav = [
    ["overview", Home, "Overview"],
    ["orders", ShoppingBag, "My orders"],
    ["wishlist", Heart, "My wishlist"],
    ["addresses", MapPin, "Saved addresses"],
    ["profile", User, "Personal information"],
    ["notifications", Bell, "Notifications"],
    ["support", CircleHelp, "Help & support"],
  ]
  return (
    <main className="account shell">
      <div className="account-head">
        <div>
          <span>SH</span>
          <div>
            <small>Welcome back</small>
            <h1>Sabbir Hasan</h1>
            <p>Member since 2024 · Verified Account</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate("/")}>
          Sign out
        </Button>
      </div>
      <div className="account-layout">
        <aside>
          {nav.map(([id, Icon, label]) => {
            const I = Icon as typeof Home
            return (
              <button
                key={id as string}
                className={tab === id ? "active" : ""}
                onClick={() => setTab(id as string)}
                type="button"
              >
                <I size={18} />
                {label as string}
                <ChevronRight size={16} />
              </button>
            )
          })}
        </aside>
        <section className="account-content">
          {tab === "overview" && <AccountOverview setTab={setTab} />}
          {tab === "orders" && <Orders />}
          {tab === "wishlist" && <WishlistPage embedded />}
          {tab === "addresses" && <Addresses />}
          {tab === "profile" && <Profile />}
          {tab === "notifications" && (
            <Empty
              icon={<Bell />}
              title="You’re all caught up"
              text="Delivery updates, promo discounts, and order notifications will appear here."
            />
          )}
          {tab === "support" && <SupportPage embedded />}
        </section>
      </div>
    </main>
  )
}

function AccountOverview({ setTab }: { setTab: (x: string) => void }) {
  const { wishlist, orders } = useStore()
  const latestOrder = orders[0] || sampleOrder as unknown as Order
  return (
    <>
      <div className="account-title">
        <div>
          <h2>Account overview</h2>
          <p>Here’s what’s happening with your BazarBari account.</p>
        </div>
      </div>
      <div className="stats">
        <div>
          <ShoppingBag size={20} />
          <span>
            <b>{orders.length}</b>
            <small>Total orders</small>
          </span>
        </div>
        <div>
          <Truck size={20} />
          <span>
            <b>1</b>
            <small>In transit</small>
          </span>
        </div>
        <div>
          <Heart size={20} />
          <span>
            <b>{wishlist.length}</b>
            <small>Wishlist items</small>
          </span>
        </div>
        <div>
          <Wallet size={20} />
          <span>
            <b>৳3,420</b>
            <small>Total savings</small>
          </span>
        </div>
      </div>
      <div className="recent-order">
        <div>
          <h3>Recent order</h3>
          <button type="button" onClick={() => setTab("orders")}>
            View all
          </button>
        </div>
        <article>
          <img
            src={latestOrder.items[0]?.product.image || products[0].image}
            alt=""
          />
          <span>
            <small>{latestOrder.id}</small>
            <b>
              {latestOrder.items[0]?.product.name || "Samsung Galaxy M34 5G"}
            </b>
            <p>
              Placed {latestOrder.date} · {latestOrder.items.length} item(s)
            </p>
          </span>
          <span className="status-pill">
            <Truck size={14} /> {latestOrder.status}
          </span>
          <strong>{money(latestOrder.total)}</strong>
          <Button
            variant="outline"
            onClick={() => navigate(`/track-order?orderId=${latestOrder.id}`)}
          >
            Track
          </Button>
        </article>
      </div>
    </>
  )
}

function Orders() {
  const { orders } = useStore()
  return (
    <div>
      <div className="account-title">
        <div>
          <h2>My orders</h2>
          <p>View, track and review your orders across Bangladesh.</p>
        </div>
      </div>
      {orders.map((o) => (
        <article className="order-row" key={o.id}>
          <div>
            <small>{o.id}</small>
            <b>{o.date}</b>
          </div>
          <div className="order-products">
            <img src={o.items[0]?.product.image || products[0].image} alt="" />
            <span>
              {o.items[0]?.product.name || "BazarBari Item"}{" "}
              {o.items.length > 1 && `+ ${o.items.length - 1} more`}
            </span>
          </div>
          <strong>{money(o.total)}</strong>
          <span
            className={`status-pill ${
              o.status === "Delivered" ? "delivered" : ""
            }`}
          >
            {o.status}
          </span>
          <Button
            variant="outline"
            onClick={() => navigate(`/track-order?orderId=${o.id}`)}
          >
            Track order
          </Button>
        </article>
      ))}
    </div>
  )
}

function Addresses() {
  const { notify } = useStore()
  const [editing, setEditing] = useState(false)
  const [label, setLabel] = useState("Office")
  const [street, setStreet] = useState(
    "Level 6, Simpletree Anarkali, Gulshan 2, Dhaka",
  )

  const handleSave = () => {
    setEditing(false)
    notify("Address saved to your address book!")
  }

  return (
    <div>
      <div className="account-title">
        <div>
          <h2>Saved addresses</h2>
          <p>Manage delivery addresses for faster checkout.</p>
        </div>
        <Button onClick={() => setEditing(!editing)}>
          <Plus size={16} /> Add address
        </Button>
      </div>
      <div className="address-card">
        <span>DEFAULT</span>
        <h3>Home</h3>
        <p>
          <b>Sabbir Hasan</b>
          <br />
          House 14, Road 5, Sector 3<br />
          Uttara, Dhaka 1230
          <br />
          +8801711002233
        </p>
        <Button variant="outline" onClick={() => setEditing(true)}>
          Edit
        </Button>
      </div>
      {editing && (
        <div
          className="inline-form"
          style={{
            marginTop: 20,
            padding: 20,
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            background: "#f9fafb",
          }}
        >
          <h3>Add / Edit address</h3>
          <Field
            label="Address label (e.g. Office, Parent's Home)"
            value={label}
            set={setLabel}
          />
          <Field
            label="Street address with Thana and District"
            value={street}
            set={setStreet}
            wide
          />
          <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
            <Button onClick={handleSave}>Save address</Button>
            <Button variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function Profile() {
  const { notify } = useStore()
  const [name, setName] = useState("Sabbir Hasan")
  const [email, setEmail] = useState("sabbir.hasan@example.com")
  const [phone, setPhone] = useState("+8801711002233")

  const handleSave = () => {
    notify("Profile updated successfully!")
  }

  return (
    <div>
      <div className="account-title">
        <div>
          <h2>Personal information</h2>
          <p>Keep your contact details up to date for deliveries.</p>
        </div>
      </div>
      <div className="profile-form">
        <div className="avatar">
          SH
          <button type="button" aria-label="Change photo">
            <Eye size={14} />
          </button>
        </div>
        <Field label="Full name" value={name} set={setName} />
        <Field label="Email" value={email} set={setEmail} />
        <Field label="Phone number" value={phone} set={setPhone} />
        <Button onClick={handleSave}>Save changes</Button>
      </div>
    </div>
  )
}

function WishlistPage({ embedded = false }: { embedded?: boolean }) {
  const { wishlist } = useStore()
  const list = products.filter((p) => wishlist.includes(p.id))

  const content = (
    <>
      {!embedded && (
        <div className="page-title">
          <h1>My wishlist</h1>
          <p>{list.length} products saved for later</p>
        </div>
      )}
      {embedded && (
        <div className="account-title">
          <div>
            <h2>My wishlist</h2>
            <p>Your saved products, synced everywhere.</p>
          </div>
        </div>
      )}
      {list.length ? (
        <div className="product-grid four">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <Empty
          icon={<Heart />}
          title="Your wishlist is empty"
          text="Tap the heart icon on any product to save it here."
          action={
            <Button onClick={() => navigate("/")}>Discover products</Button>
          }
        />
      )}
    </>
  )

  return embedded ? (
    <div>{content}</div>
  ) : (
    <main className="shell page-space">{content}</main>
  )
}

const faq = [
  [
    "How do I track my order?",
    "Open Track Order from the menu, then enter your BazarBari order ID (e.g. BB-20261101-89421) and your registered phone number.",
  ],
  [
    "Which payment methods are supported?",
    "We support bKash, Nagad, Rocket, Visa/Mastercard, and Cash on Delivery with SMS OTP confirmation.",
  ],
  [
    "Can I return an item?",
    "Eligible products may be returned within 7 days in their original packaging. Simply contact customer care or start a return from your account.",
  ],
  [
    "How much does delivery cost?",
    "Standard delivery is FREE on orders over ৳5,000, and ৳60 for other orders across Bangladesh. Express Dhaka metro delivery is available.",
  ],
]

function SupportPage({ embedded = false }: { embedded?: boolean }) {
  const [open, setOpen] = useState(0)
  const [q, setQ] = useState("")

  const handleCategoryClick = (categoryName: string) => {
    setQ(categoryName.toLowerCase())
  }

  const content = (
    <>
      <div className="support-hero">
        <span>BAZARBARI HELP CENTER</span>
        <h1>How can we help?</h1>
        <div>
          <Search size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search orders, delivery, payments and returns"
            aria-label="Search help topics"
          />
        </div>
      </div>
      <div className="support-cards">
        {[
          [ShoppingBag, "Orders"],
          [Wallet, "Payments"],
          [Truck, "Delivery"],
          [RotateCcw, "Returns"],
        ].map(([I, x]) => {
          const Icon = I as typeof ShoppingBag
          return (
            <button
              key={x as string}
              type="button"
              onClick={() => handleCategoryClick(x as string)}
            >
              <Icon size={20} />
              <b>{x as string}</b>
              <small>Get help fast</small>
            </button>
          )
        })}
      </div>
      <section className="faq">
        <h2>Frequently asked questions</h2>
        {faq
          .filter(
            (x) =>
              x[0].toLowerCase().includes(q.toLowerCase()) ||
              x[1].toLowerCase().includes(q.toLowerCase()),
          )
          .map((x, i) => (
            <article key={x[0]}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <b>{x[0]}</b>
                <ChevronDown size={18} />
              </button>
              {open === i && <p>{x[1]}</p>}
            </article>
          ))}
      </section>
      <section className="contact-panel">
        <div>
          <small>STILL NEED HELP?</small>
          <h2>Talk to a real person</h2>
          <p>
            Our Bangladesh-based support team is available every day from 8am to
            11pm.
          </p>
        </div>
        <div>
          <Button onClick={() => window.open("tel:09678888777")}>
            <Headphones size={18} /> Call 09678-888-777
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open("https://wa.me/8801711002233", "_blank")}
          >
            WhatsApp support
          </Button>
        </div>
      </section>
    </>
  )
  return embedded ? (
    <div>{content}</div>
  ) : (
    <main className="support-page shell">{content}</main>
  )
}

const infoContent: Record<string, {
  title: string
  eyebrow: string
  intro: string
  sections: [string, string][]
}> = {
  about: {
    title: "Commerce that feels closer to home",
    eyebrow: "ABOUT BAZARBARI",
    intro:
      "We are building a more dependable digital shopping experience for every household in Bangladesh.",
    sections: [
      [
        "Our purpose",
        "BazarBari brings authentic products, transparent prices and responsive support into one locally informed marketplace.",
      ],
      [
        "Built for Bangladesh",
        "From Bangla typography to local payments and last-mile delivery realities, our decisions begin with how people here actually shop.",
      ],
      [
        "Trust at every step",
        "We clearly label mock estimates, verify sellers and design every checkout decision to be understandable.",
      ],
    ],
  },
  contact: {
    title: "We’re here to help",
    eyebrow: "CONTACT US",
    intro: "Reach our support team for orders, payments, delivery or feedback.",
    sections: [
      ["Customer care", "Call 09678-888-777 every day from 8am to 11pm."],
      [
        "Corporate office",
        "BazarBari Retail Technologies Ltd., Gulshan Avenue, Dhaka 1212.",
      ],
      [
        "Email",
        "support@bazarbari.com.bd for customer support and partners@bazarbari.com.bd for business enquiries.",
      ],
    ],
  },
  "shipping-policy": {
    title: "Shipping policy",
    eyebrow: "LAST UPDATED 01 NOVEMBER 2026",
    intro:
      "Clear delivery estimates and transparent charges for customers across Bangladesh.",
    sections: [
      [
        "Delivery coverage",
        "We deliver to all 64 districts through approved courier partners. Remote-area timelines may vary.",
      ],
      [
        "Estimated timelines",
        "Dhaka metro orders usually arrive within 1–3 days. Other districts typically take 2–5 business days.",
      ],
      [
        "Delivery charges",
        "Fees are calculated by location, item size and speed before order placement. Orders over ৳5,000 qualify for free standard shipping.",
      ],
    ],
  },
  "return-policy": {
    title: "Return & refund policy",
    eyebrow: "SIMPLE, FAIR RETURNS",
    intro: "Eligible products can be returned within seven days of delivery.",
    sections: [
      [
        "Eligibility",
        "Items must be unused, complete and in original packaging unless received damaged or defective.",
      ],
      [
        "How to request",
        "Open the order in your account or contact support with photos and the order ID.",
      ],
      [
        "Refund timeline",
        "Approved refunds are returned to your original payment method (bKash, Nagad, card) within 7–10 business days.",
      ],
    ],
  },
  "privacy-policy": {
    title: "Privacy policy",
    eyebrow: "YOUR DATA, RESPECTED",
    intro:
      "This prototype demonstrates privacy-conscious experiences and does not process real payments.",
    sections: [
      [
        "Information we use",
        "Contact, address and shopping activity support checkout, delivery and account experiences.",
      ],
      [
        "How we protect it",
        "Production systems should use encryption, strict access controls and limited retention.",
      ],
      [
        "Your choices",
        "You may request account access, correction or deletion through customer support.",
      ],
    ],
  },
  terms: {
    title: "Terms & conditions",
    eyebrow: "BAZARBARI CUSTOMER TERMS",
    intro:
      "These terms describe fair use of BazarBari services and the limitations of this interactive prototype.",
    sections: [
      [
        "Prototype notice",
        "Payment, OTP, courier and order events shown here are simulated and are not real transactions.",
      ],
      [
        "Orders and pricing",
        "A production order is accepted only after inventory and payment confirmation.",
      ],
      [
        "Responsible use",
        "Customers must provide accurate information and avoid misuse, fraud or unauthorized access.",
      ],
    ],
  },
}

function InfoPage({ type }: { type: string }) {
  const c = infoContent[type] || infoContent.about
  return (
    <main className="info-page">
      <section>
        <div className="shell">
          <span>{c.eyebrow}</span>
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
        </div>
      </section>
      <div className="shell info-body">
        <aside>
          <b>On this page</b>
          {c.sections.map((x) => (
            <a href={`#${x[0].replace(/ /g, "-")}`} key={x[0]}>
              {x[0]}
            </a>
          ))}
        </aside>
        <article>
          {c.sections.map((x, i) => (
            <section id={x[0].replace(/ /g, "-")} key={x[0]}>
              <span>0{i + 1}</span>
              <h2>{x[0]}</h2>
              <p>{x[1]}</p>
            </section>
          ))}
        </article>
      </div>
    </main>
  )
}

function Empty({
  icon,
  title,
  text,
  action,
}: {
  icon: ReactNode
  title: string
  text: string
  action?: ReactNode
}) {
  return (
    <div className="empty">
      <span>{icon}</span>
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  )
}

function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="toasts">
      {toasts.map((t) => (
        <div key={t.id}>
          <Check size={16} />
          {t.message}
        </div>
      ))}
    </div>
  )
}

function Router() {
  const route = useRoute()
  const path = route.split("?")[0]
  const searchParams = new URLSearchParams(route.split("?")[1] || "")

  let page: ReactNode

  if (path === "/") page = <HomePage />
  else if (path.startsWith("/category/"))
    page = <ProductListing category={path.split("/")[2]} />
  else if (path === "/search")
    page = <ProductListing query={searchParams.get("q") || ""} />
  else if (path.startsWith("/product/"))
    page = <ProductPage slug={path.split("/")[2]} />
  else if (path === "/cart") page = <CartPage />
  else if (path === "/checkout") page = <CheckoutPage />
  else if (path.startsWith("/payment/")) {
    const pType =
      path.split("/")[2] as "success" | "failed" | "pending" || "pending"
    page = (
      <PaymentResult
        type={pType}
        orderId={searchParams.get("orderId") || undefined}
      />
    )
  } else if (path.startsWith("/order-confirmation/"))
    page = <ConfirmationPage id={path.split("/")[2]} />
  else if (path === "/track-order") page = <TrackPage />
  else if (path === "/account") page = <AccountPage />
  else if (path.startsWith("/account/orders/"))
    page = <AccountPage orderDetail />
  else if (path === "/wishlist") page = <WishlistPage />
  else if (path === "/support") page = <SupportPage />
  else if (
    [
      "/about",
      "/contact",
      "/shipping-policy",
      "/return-policy",
      "/privacy-policy",
      "/terms",
    ].includes(path)
  ) {
    page = <InfoPage type={path.slice(1)} />
  } else {
    page = (
      <main className="shell page-space">
        <Empty
          icon={<AlertCircle />}
          title="Page not found"
          text="The page may have moved or no longer exists."
          action={<Button onClick={() => navigate("/")}>Back to home</Button>}
        />
      </main>
    )
  }

  return (
    <>
      <Header />
      {page}
      <Footer />
      <BottomNav />
      <Toasts />
    </>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  )
}
