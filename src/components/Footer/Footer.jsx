/**
 * Footer — Elegant minimal dark footer with quick links, contact info, socials
 */
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'
import './Footer.css'

const QUICK_LINKS = [
  { label: 'Home',         href: '#hero' },
  { label: 'About Us',     href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Portfolio',    href: '#portfolio' },
  { label: 'Why Choose Us',href: '#why-us' },
  { label: 'Contact',      href: '#contact' },
]

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">

          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              Sujatha Tailors
              <span>Premium Tailoring Since 2010</span>
            </div>
            <p className="footer-tagline">
              Crafting elegance, stitch by stitch. Specializing in blouse stitching,
              saree styling, and expert alterations.
            </p>
            {/* Socials */}
            <div className="footer-socials">
              <a href="https://wa.me/918524822544" target="_blank" rel="noreferrer" className="social-icon">
                <FaWhatsapp />
              </a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaFacebook /></a>
              <a href="tel:+918524822544" className="social-icon"><FaPhone size={14} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6 col-6">
            <div className="footer-col-title">Our Services</div>
            <ul className="footer-links">
              {['Blouse Stitching', 'Saree Fall & Pico', 'Alterations', 'Lehenga & Gowns', 'Home Fabrics', 'Embellishments'].map((s) => (
                <li key={s}><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('#services') }}>{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-col-title">Contact Us</div>
            <div className="footer-contact-item">
              <span className="icon"><FaPhone size={12} /></span>
              <span className="text">+91 85248 22544</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon"><FaWhatsapp size={13} /></span>
              <span className="text">+91 85248 22544</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon"><FaEnvelope size={12} /></span>
              <span className="text">dhavanaimithun@gmail.com</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon"><FaMapMarkerAlt size={13} /></span>
              <span className="text">5/204 Dhavanai Villa, Nd Post, The Nilgiris — 643007</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026 <span>Sujatha Tailors</span>. All rights reserved.
          </div>
          <div className="footer-made">
            Crafted with ❤️ for elegance
          </div>
        </div>
      </div>
    </footer>
  )
}
