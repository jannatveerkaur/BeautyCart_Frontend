import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import './SearchModal.css'

function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [inputRef, setInputRef] = useState(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    
    const lowerQuery = query.toLowerCase()
    return products.filter((product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      (product.type && product.type.toLowerCase().includes(lowerQuery))
    )
  }, [query])

  useEffect(() => {
    if (isOpen && inputRef) {
      inputRef.focus()
    }
  }, [isOpen, inputRef])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <div className="search-input-wrapper">
            <Search size={18} />
            <input
              ref={setInputRef}
              type="text"
              placeholder="Search skincare, rituals, ingredients..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="search-close"
          >
            <X size={20} />
          </button>
        </div>

        {query.trim() && (
          <div className="search-results">
            {results.length > 0 ? (
              results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="search-result-item"
                  onClick={onClose}
                >
                  <img src={product.image} alt={product.name} />
                  <div className="search-result-info">
                    <h4>{product.name}</h4>
                    <p>{product.category}</p>
                    <strong>${product.price}</strong>
                  </div>
                </Link>
              ))
            ) : (
              <div className="search-empty">
                <p>No rituals found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchModal
