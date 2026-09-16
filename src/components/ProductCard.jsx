import { Heart, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

function ProductCard({ product, onAdd, onWishlistToggle, isInWishlist }) {
  const inWishlist = isInWishlist ? isInWishlist(product.id) : false
  
  const handleWishlistClick = (event) => {
    event.preventDefault()
    if (onWishlistToggle) {
      onWishlistToggle(product)
    }
  }
  
  return <article className="product-card"><Link to={`/product/${product.id}`} className="product-image-link"><div className={`product-image ${product.color}`}><img src={product.image} alt={product.name} loading="lazy" /><button type="button" aria-label={`Save ${product.name}`} onClick={handleWishlistClick}><Heart size={17} fill={inWishlist ? "currentColor" : "none"} /></button><span className="quick-add" onClick={(event) => { event.preventDefault(); onAdd(product) }}><Plus size={15} /> Add</span></div></Link><div className="product-meta"><div><h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3><p>{product.type} <span>•</span> {product.size}</p></div><strong>${product.price}</strong></div></article>
}

export default ProductCard
