import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'
import SearchModal from './components/SearchModal'
import AuthModal from './components/AuthModal'
import Toast from './components/Toast'
import About from './pages/About'
import Cart from './pages/Cart'
import Account from './pages/Account'
import Wishlist from './pages/Wishlist'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Shop from './pages/Shop'
import { apiUrl } from './config/auth'

function App({ googleSignInEnabled }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('beautycart-cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('beautycart-wishlist')
    return savedWishlist ? JSON.parse(savedWishlist) : []
  })

  const [searchOpen, setSearchOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    localStorage.setItem('beautycart-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('beautycart-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${apiUrl}/auth/profile`, {
          credentials: 'include'
        })
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        }
      } catch (err) {
        console.error('Auth check failed:', err)
      }
    }
    checkAuth()
  }, [])

  const addToCart = (product) => {
    setCart((current) =>
      current.some((item) => item.id === product.id)
        ? current
        : [...current, product]
    )
    setToast({ message: 'Added to bag', type: 'success', duration: 2000 })
  }

  const removeFromCart = (id) => {
    setCart((current) =>
      current.filter((product) => product.id !== id)
    )
  }

  const toggleWishlist = (product) => {
    setWishlist((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]
    )
  }

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.id === productId)

  const handleLoginSuccess = (userData) => {
    setUser(userData)
    setAuthOpen(false)
    setToast({
      message: `Welcome, ${userData.name}!`,
      type: 'success',
      duration: 3000
    })
  }

  const handleLogout = () => {
    fetch(`${apiUrl}/auth/logout`, {
      credentials: 'include'
    })
    setUser(null)
    setToast({
      message: 'Logged out successfully',
      type: 'info',
      duration: 3000
    })
  }

  const handleRemoveFromWishlist = (productId) => {
    if (user) {
      fetch(`${apiUrl}/auth/wishlist/${productId}`, {
        method: 'DELETE',
        credentials: 'include'
      }).catch((err) => console.error('Wishlist remove failed:', err))
    }
    const product = wishlist.find((p) => p.id === productId)
    if (product) {
      toggleWishlist(product)
    }
  }

  return (
    <BrowserRouter>
      <SiteHeader
        cartCount={cart.length}
        onSearchClick={() => setSearchOpen(true)}
        onAccountClick={() => (user ? null : setAuthOpen(true))}
        user={user}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onAdd={addToCart}
                onWishlistToggle={toggleWishlist}
                isInWishlist={isInWishlist}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                onAdd={addToCart}
                onWishlistToggle={toggleWishlist}
                isInWishlist={isInWishlist}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                onAdd={addToCart}
                onWishlistToggle={toggleWishlist}
                isInWishlist={isInWishlist}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart cart={cart} onRemove={removeFromCart} />} />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                onRemove={handleRemoveFromWishlist}
                onAdd={addToCart}
              />
            }
          />
          <Route path="/account" element={<Account user={user} onLogout={handleLogout} />} />
          <Route
            path="*"
            element={
              <Home
                onAdd={addToCart}
                onWishlistToggle={toggleWishlist}
                isInWishlist={isInWishlist}
              />
            }
          />
        </Routes>
      </main>
      <SiteFooter />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        googleSignInEnabled={googleSignInEnabled}
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      )}
    </BrowserRouter>
  )
}

export default App
