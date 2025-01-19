import { useNavigate } from 'react-router-dom'
import '../styles/LandingPage.css'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <main>
      <nav>
        <a href="https://augustlearn.com/" className="brand">August</a>
      </nav>
      
      <div className="hero">
        <h1>Welcome to August</h1>
        <p className="mission">
          Are you ready to join Yale and 50+ university ambassadors on a mission to decentralize college admissions for all?
        </p>
        <button className="cta" onClick={() => navigate('/apply')}>
          Apply Today
        </button>
      </div>

      <footer>
        <div className="marquee">
          <div className="marquee-content">
            <span>Yale</span>
            <span>Harvard</span>
            <span>Columbia</span>
            <span>Princeton</span>
            <span>Stanford</span>
            <span>MIT</span>
            <span>UPenn</span>
            <span>Dartmouth</span>
            <span>Brown</span>
            <span>Cornell</span>
            <span>Duke</span>
            <span>Northwestern</span>
            <span>Johns Hopkins</span>
            <span>Vanderbilt</span>
            <span>Rice</span>
            <span>Berkeley</span>
            <span>UCLA</span>
            <span>USC</span>
            <span>Georgetown</span>
            <span>Carnegie Mellon</span>
            <span>NYU</span>
            <span>Tufts</span>
            <span>Michigan</span>
            <span>UVA</span>
            <span>Notre Dame</span>
          </div>
          <div className="marquee-content" aria-hidden="true">
            <span>Yale</span>
            <span>Harvard</span>
            <span>Columbia</span>
            <span>Princeton</span>
            <span>Stanford</span>
            <span>MIT</span>
            <span>UPenn</span>
            <span>Dartmouth</span>
            <span>Brown</span>
            <span>Cornell</span>
            <span>Duke</span>
            <span>Northwestern</span>
            <span>Johns Hopkins</span>
            <span>Vanderbilt</span>
            <span>Rice</span>
            <span>Berkeley</span>
            <span>UCLA</span>
            <span>USC</span>
            <span>Georgetown</span>
            <span>Carnegie Mellon</span>
            <span>NYU</span>
            <span>Tufts</span>
            <span>Michigan</span>
            <span>UVA</span>
            <span>Notre Dame</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default LandingPage