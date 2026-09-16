import { ArrowLeft, Check, Heart, Minus, Plus, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getProduct } from '../data/products'

function ProductDetails({ onAdd, onWishlistToggle, isInWishlist }) {
  const { id } = useParams()
  const product = getProduct(id)
  const inWishlist = isInWishlist ? isInWishlist(id) : false
  
  const handleWishlistClick = () => {
    if (onWishlistToggle) {
      onWishlistToggle(product)
    }
  }
  
  if (!product) return <section className="empty-state"><h1>That ritual has moved on.</h1><Link className="primary-button" to="/shop">Back to shop</Link></section>
  
  return <section className="detail-page"><Link className="back-link" to="/shop"><ArrowLeft size={15} /> Back to all products</Link><div className="detail-layout"><div className={`detail-image ${product.color}`}><img src={product.image} alt={product.name} /></div><div className="detail-copy"><p className="eyebrow">{product.category.toUpperCase()} / {product.type.toUpperCase()}</p><h1>{product.name}</h1><div className="rating"><Star size={14} fill="currentColor" /> {product.rating} <span>24 reviews</span></div><p className="detail-price">${product.price}</p><p className="detail-description">{product.description}</p><div className="detail-benefits"><span><Check size={14} /> Vegan formula</span><span><Check size={14} /> Made in small batches</span></div><div className="purchase-row"><div className="quantity"><button type="button" aria-label="Decrease quantity"><Minus size={14} /></button><span>1</span><button type="button" aria-label="Increase quantity"><Plus size={14} /></button></div><button className="primary-button add-button" type="button" onClick={() => onAdd(product)}>Add to bag <span>${product.price}</span></button><button className="wishlist-button" type="button" aria-label="Add to wishlist" onClick={handleWishlistClick}><Heart size={19} fill={inWishlist ? "currentColor" : "none"} /></button></div><div className="detail-note"><strong>Good to know</strong><p>Apply after cleansing, morning or evening. Let the texture settle before layering SPF.</p></div></div></div></section>
}

export default ProductDetails
