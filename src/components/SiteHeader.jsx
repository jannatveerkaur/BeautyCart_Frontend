import { Heart, Menu, Search, ShoppingBag, Sparkles, UserRound, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

function SiteHeader({ cartCount = 0, onSearchClick, onAccountClick, user }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="announcement">Free shipping on rituals over $75 <span>•</span> Thoughtful care, delivered</div>
      <nav className="nav-shell">
        <button className="mobile-menu" type="button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <Link className="brand" to="/"><Sparkles size={18} strokeWidth={1.7} /><span>BeautyCart</span></Link>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop all</NavLink>
          <NavLink to="/shop?category=rituals" onClick={() => setMenuOpen(false)}>Rituals</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>Our philosophy</NavLink>
        </div>
        <div className="nav-actions">
          <button
            type="button"
            aria-label="Search"
            onClick={() => onSearchClick?.()}
          >
            <Search size={19} />
          </button>
          <Link
            to={user ? '/account' : '#'}
            onClick={(e) => {
              if (!user) {
                e.preventDefault()
                onAccountClick?.()
              }
            }}
            aria-label="Your account"
            title={user ? `${user.name}` : 'Log in'}
          >
            <UserRound size={19} />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist">
            <Heart size={19} />
          </Link>
          <Link className="bag-link" to="/cart" aria-label="Shopping bag">
            <ShoppingBag size={19} />
            <span>{cartCount}</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default SiteHeader
