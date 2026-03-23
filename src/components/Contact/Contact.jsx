import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebookF } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import './Contact.css'

export default function Contact() {

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!form.name || !form.phone || !form.email) {
      setErrorMsg("⚠️ Please fill all required fields")
      setTimeout(() => setErrorMsg(''), 3000)
      return
    }

    setSending(true)

    emailjs.send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      form,
      import.meta.env.VITE_EMAIL_PUBLIC_KEY
    )
      .then(() => {
        setSending(false)
        setSent(true)

        // Build dynamic WhatsApp message
        const whatsappMessage = `Hi, I just submitted a request.\n\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.service || "Not specified"}`

        // Delay for better UX (let success show first)
        setTimeout(() => {
          const goToWhatsapp = window.confirm(
            "✅ Your request has been submitted successfully!\n\nDo you want to continue on WhatsApp for faster response?"
          )

          if (goToWhatsapp) {
            window.open(
              `https://wa.me/918524822544?text=${encodeURIComponent(whatsappMessage)}`,
              "_blank"
            )
          }
        }, 200) // small delay = smooth UX

        // Reset form
        setForm({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: ''
        })

        // Hide success message
        setTimeout(() => setSent(false), 5000)
      })
      .catch((error) => {
        setSending(false)
        setErrorMsg('❌ Failed to send message. Try again.')
        console.error("EmailJS Error:", error)

        setTimeout(() => setErrorMsg(''), 5000)
      })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Get in Touch</span>
          <h2 className="section-title">Let's Create Magic Together</h2>
          <p className="section-desc">Have a design in mind? Or need help with custom stitching? Reach out to us today!</p>
        </motion.div>

        <motion.div
          className="contact-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Left Column: Contact Info */}
          <motion.div className="contact-info-column" variants={itemVariants}>
            <div className="contact-info-card">
              <h3 className="contact-info-title">Contact Information</h3>
              <p className="contact-info-subtitle">Fill out the form and our team will get back to you within 24 hours.</p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-item-icon"><FaPhoneAlt /></div>
                  <div className="contact-item-body">
                    <span className="label">Phone</span>
                    <a href="tel:+918524822544" className="value">+91 85248 22544</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon"><FaEnvelope /></div>
                  <div className="contact-item-body">
                    <span className="label">Email</span>
                    <a href="mailto:dhavanaimithun@gmail.com" className="value">dhavanaimithun@gmail.com</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon"><FaMapMarkerAlt /></div>
                  <div className="contact-item-body">
                    <span className="label">Address</span>
                    <p className="value">5/204,Dhavanai village and post <br />The Nilgiris - 643007</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <a href="https://www.instagram.com/_.mithun._25/" className="social-link"><FaInstagram /></a>
                <a href="#" className="social-link"><FaFacebookF /></a>
              </div>

              <button
                className="wa-action-btn"
                onClick={() => window.open("https://wa.me/918524822544")}
              >
                <FaWhatsapp /> Chat on WhatsApp
              </button>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div className="contact-form-column" variants={itemVariants}>
            <div className="contact-form-card">
              <motion.form onSubmit={handleSubmit} className="contact-form-actual">
                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label">NAME</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control-custom"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">PHONE</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control-custom"
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control-custom"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">SERVICE</label>
                  <select
                    name="service"
                    className="form-control-custom"
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option value="">Select Service</option>
                    <option>Blouse Stitching</option>
                    <option>Saree Work</option>
                    <option>Alterations</option>
                    <option>Custom Design</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">YOUR MESSAGE</label>
                  <textarea
                    name="message"
                    className="form-control-custom"
                    placeholder="Type your message here..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="form-submit-btn"
                  disabled={sending}
                >
                  {sending ? '⏳ Sending...' : 'Send Message'}
                </button>

                {/* SUCCESS MESSAGE */}
                {sent && (
                  <motion.div
                    className="form-toast success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✅ Message sent successfully!
                  </motion.div>
                )}

                {/* ERROR MESSAGE */}
                {errorMsg && (
                  <motion.div
                    className="form-toast error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errorMsg}
                  </motion.div>
                )}
              </motion.form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}