import { ArrowLeft, Heart, LogOut, ShoppingBag } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function Account({ user, onLogout }) {
  const navigate = useNavigate()

  if (!user) {
    return (
      <section className="account-page">
        <div className="empty-state">
          <h2>Please log in to view your account.</h2>
          <Link className="primary-button" to="/">
            <ArrowLeft size={15} /> Return home
          </Link>
        </div>
      </section>
    )
  }

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <section className="account-page">
      <div className="page-heading">
        <p className="eyebrow">YOUR ACCOUNT</p>
        <h1>Welcome, {user.name}.</h1>
      </div>

      <div className="account-layout">
        <div className="account-content">
          <div className="account-section">
            <h3>Profile Information</h3>
            <div className="account-info">
              <div>
                <p className="label">Name</p>
                <p className="value">{user.name}</p>
              </div>
              <div>
                <p className="label">Email</p>
                <p className="value">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="account-section">
            <h3>Quick Links</h3>
            <div className="account-links">
              <Link to="/wishlist" className="account-link">
                <Heart size={18} />
                <span>My Wishlist</span>
              </Link>
              <Link to="/cart" className="account-link">
                <ShoppingBag size={18} />
                <span>My Bag</span>
              </Link>
            </div>
          </div>

          <div className="account-section">
            <button
              className="logout-button"
              type="button"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Account
