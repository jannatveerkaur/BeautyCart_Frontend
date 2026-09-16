import { ArrowRight, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

function Wishlist({ wishlist, onRemove, onAdd }) {
  return (
    <section className="wishlist-page">
      <div className="page-heading">
        <p className="eyebrow">YOUR RITUAL LIST</p>
        <h1>Saved rituals.</h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <div className="empty-mark">♡</div>
          <h2>Your ritual list is waiting.</h2>
          <p>Save products you love and return to them anytime.</p>
          <Link className="primary-button" to="/shop">
            Explore the shop <ArrowRight size={15} />
          </Link>
        </div>
      ) : (
        <div className="wishlist-layout">
          <div className="wishlist-items">
            {wishlist.map((product) => (
              <article className="wishlist-item" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div>
                  <p className="eyebrow">{product.category}</p>
                  <h3>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p>{product.size}</p>
                  <div className="wishlist-item-actions">
                    <strong>${product.price}</strong>
                    <button
                      className="primary-button add-button"
                      type="button"
                      onClick={() => onAdd(product)}
                    >
                      Add to bag
                    </button>
                    <button
                      className="remove-button"
                      type="button"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => onRemove(product.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="wishlist-summary">
            <p className="eyebrow">SUMMARY</p>
            <h2>Ready when you are.</h2>
            <div>
              <span>Items</span>
              <strong>{wishlist.length}</strong>
            </div>
            <div>
              <span>Estimated total</span>
              <strong>${wishlist.reduce((sum, p) => sum + p.price, 0)}</strong>
            </div>
            <Link className="primary-button checkout-button" to="/shop">
              Continue shopping <ArrowRight size={15} />
            </Link>
          </aside>
        </div>
      )}
    </section>
  )
}

export default Wishlist
