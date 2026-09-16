import { X } from 'lucide-react'
import { GoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import './AuthModal.css'
import { apiUrl } from '../config/auth.js'

function AuthModal({ isOpen, onClose, onLoginSuccess, googleSignInEnabled }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password, confirmPassword: formData.confirmPassword }

      const response = await fetch(`${apiUrl}${endpoint.replace('/api', '')}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'An error occurred')
        setLoading(false)
        return
      }

      // Success
      onLoginSuccess(data.user)
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
      onClose()
    } catch (err) {
      setError(err.message || 'An error occurred')
      setLoading(false)
    }
  }

  const handleGoogleLogin = async (credential) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${apiUrl}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Google sign-in failed')
        setLoading(false)
        return
      }

      onLoginSuccess(data.user)
      onClose()
    } catch (err) {
      setError(err.message || 'Google sign-in failed')
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="auth-close"
        >
          <X size={20} />
        </button>

        <div className="auth-header">
          <h2>{isLogin ? 'Welcome back' : 'Create an account'}</h2>
          <p>{isLogin ? 'Sign in to your BeautyCart account' : 'Join our quiet corner of skincare'}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          )}

          <button type="submit" disabled={loading} className="auth-submit">
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {isLogin && googleSignInEnabled && (
          <>
            <div className="auth-divider"><span>or</span></div>
            <div className="google-login">
              <GoogleLogin
                onSuccess={({ credential }) => credential && handleGoogleLogin(credential)}
                onError={() => {
                  setLoading(false)
                  setError('Google sign-in failed')
                }}
                useOneTap={false}
                theme="outline"
                size="large"
                width="336"
              />
            </div>
          </>
        )}

        {isLogin && !googleSignInEnabled && (
          <p className="google-login-unavailable">Google sign-in is not configured yet.</p>
        )}

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
                setFormData({ name: '', email: '', password: '', confirmPassword: '' })
              }}
              className="auth-toggle-btn"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
