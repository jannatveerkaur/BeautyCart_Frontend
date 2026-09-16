import { Filter, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

function Shop({ onAdd, onWishlistToggle, isInWishlist }) {
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('Featured')
  const filteredProducts = useMemo(() => { const result = category === 'All' ? [...products] : products.filter((product) => product.category === category); if (sort === 'Price: low to high') result.sort((a, b) => a.price - b.price); if (sort === 'Price: high to low') result.sort((a, b) => b.price - a.price); return result }, [category, sort])
  return <><section className="page-heading"><p className="eyebrow">THE FULL EDIT</p><h1>Find your ritual.</h1><p>Considered skincare for every kind of day.</p></section><section className="shop-layout"><aside className="filter-panel"><div className="filter-title"><span><Filter size={16} /> Filter</span><button type="button" onClick={() => setCategory('All')}>Reset</button></div><p className="footer-label">Category</p>{['All', 'Cleanser', 'Moisturizer', 'Serum', 'Oil', 'Mask', 'SPF'].map((item) => <button className={category === item ? 'filter-option active' : 'filter-option'} type="button" key={item} onClick={() => setCategory(item)}>{item}<span>{item === 'All' ? products.length : products.filter((product) => product.category === item).length}</span></button>)}</aside><div className="shop-results"><div className="results-toolbar"><p>{filteredProducts.length} products</p><label><SlidersHorizontal size={15} /><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option>Featured</option><option>Price: low to high</option><option>Price: high to low</option></select></label></div><div className="product-grid shop-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} onWishlistToggle={onWishlistToggle} isInWishlist={isInWishlist} />)}</div></div></section></>
}

export default Shop
