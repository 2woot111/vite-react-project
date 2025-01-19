import { useNavigate } from 'react-router-dom'
import '../styles/RejectionPage.css'

export default function RejectionPage() {
  const navigate = useNavigate()

  return (
    <main className="rejection-page">
      <div className="rejection-card">
        <div className="rejection-header">
          <span className="emoji">🙏</span>
          <h1>Thanks for your interest</h1>
        </div>
        
        <div className="rejection-message">
          <p>
            We appreciate you taking the time to apply. While we carefully review all applications,
            we're currently looking for candidates who meet specific criteria for this role.
          </p>
          <p>
            Feel free to reach out to <a href="mailto:info@augustlearn.com">info@augustlearn.com</a> if
            you have any questions.
            <br />
            Follow us on <a href="https://www.linkedin.com/company/august-learn" target="_blank" rel="noopener noreferrer">LinkedIn</a> for updates on all August openings!
          </p>
        </div>

        <div className="rejection-actions">
          <button 
            onClick={() => navigate('/')} 
            className="return-home-btn"
          >
            Return Home
          </button>
        </div>
      </div>
    </main>
  )
}