import { ArrowUpRight, Mail, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'

function SiteFooter() {
  return <footer className="site-footer"><div className="footer-lead"><p className="eyebrow">A NOTE FROM BEAUTYCART</p><h2>Care that feels<br />like coming home.</h2><p>Join our quiet corner of the internet for new rituals, thoughtful notes, and first access.</p><form className="newsletter"><input type="email" placeholder="Your email address" aria-label="Email address" /><button type="submit" aria-label="Subscribe"><ArrowUpRight size={18} /></button></form></div><div className="footer-links"><div><Link className="footer-brand" to="/"><Mail size={16} /> BeautyCart</Link><p>Skincare for slower mornings<br />and softer evenings.</p></div><div><p className="footer-label">Explore</p><Link to="/shop">Shop all</Link><Link to="/about">Our philosophy</Link><Link to="/cart">Your bag</Link></div><div><p className="footer-label">Say hello</p><a href="mailto:hello@beautycart.co">hello@beautycart.co</a><a href="#instagram"><Share2 size={15} /> Instagram</a></div></div></footer>
}

export default SiteFooter
