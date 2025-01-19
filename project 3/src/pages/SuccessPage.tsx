import React from 'react'
import '../styles/SuccessPage.css'

export default function SuccessPage() {
  return (
    <main className="success-page">
      <div className="content">
        <div className="success-header">
          <h1>Congratulations! 🎉</h1>
          <p className="subtitle">You're a perfect fit for our mission</p>
        </div>
        
        <div className="next-steps">
          <h2>Next Steps:</h2>
          <ol>
            <li>Book your interview below</li>
            <li>Prepare your student list strategy</li>
            <li>Review admissions contact details</li>
          </ol>
        </div>

        <div className="booking-section">
          <p className="urgency">Limited spots available - Book now!</p>
          <a 
            href="https://calendly.com/seanhargrow/chat" 
            className="cta-button"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Schedule Interview
          </a>
          <p className="deadline">Interviews must be scheduled by January 31st</p>
        </div>

        <div className="contact-info">
          <p>Questions? Contact us at <a href="mailto:info@augustlearn.com">info@augustlearn.com</a></p>
          <p className="social-follow">Follow us on <a href="https://www.linkedin.com/company/august-learn" target="_blank" rel="noopener noreferrer">LinkedIn</a> for updates on all August openings!</p>
        </div>
      </div>
    </main>
  )
}