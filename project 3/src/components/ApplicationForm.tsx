import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

type Step = {
  id: number
  title: string
  emoji: string
}

const steps: Step[] = [
  { id: 1, title: "Current Status" },
  { id: 2, title: "Student List" },
  { id: 3, title: "Admissions Contact" },
  { id: 4, title: "Response Speed" },
  { id: 5, title: "Final Step" }
]

export default function ApplicationForm() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
   name: '',
    is_undergraduate: false,
    current_year: null as number | null,
    major: '',
    can_access_student_list: false,
    student_list_confidence: null as number | null,
    has_admissions_contact: false,
    admissions_contact_confidence: null as number | null,
    response_speed: 0
  })

  const handleNext = async () => {
    if (currentStep === 5) {
      setIsProcessing(true)
      try {
        // Validate required fields
        if (!formData.name.trim()) {
          throw new Error('Name is required')
        }

        if (!formData.is_undergraduate) {
          throw new Error('Must be an undergraduate student')
        }

        if (formData.is_undergraduate && !formData.current_year) {
          throw new Error('Graduation year is required')
        }

        if (formData.is_undergraduate && !formData.major?.trim()) {
          throw new Error('Major is required')
        }

        // Check if all requirements are met
        const meetsRequirements = 
          formData.is_undergraduate &&
          formData.can_access_student_list &&
          (formData.student_list_confidence ?? 0) > 6 &&
          formData.has_admissions_contact &&
          (formData.admissions_contact_confidence ?? 0) > 6 &&
          formData.response_speed > 6

        if (meetsRequirements) {
          // Save to Supabase
          const userId = localStorage.getItem('bolt_user_id') || crypto.randomUUID()
          if (!localStorage.getItem('bolt_user_id')) {
            localStorage.setItem('bolt_user_id', userId)
          }

          const { error } = await supabase
            .from('applications')
            .insert([{ ...formData, user_id: userId }])

          if (error) {
            throw new Error(`Failed to save application: ${error.message}`)
          }

          navigate('/success')
        } else {
          navigate('/rejection')
        }
      } catch (error) {
        setIsProcessing(false)
        alert((error as Error).message)
        return
      }
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
           <h2>What's your name? {steps[0].emoji}</h2>
           <input
             type="text"
             value={formData.name}
             onChange={(e) => setFormData(prev => ({
               ...prev,
               name: e.target.value
             }))}
             className="text-input"
             placeholder="Enter your full name"
             required
           />

            <h2>Are you a current undergraduate? {steps[0].emoji}</h2>
            <select 
              value={formData.is_undergraduate.toString()}
              onChange={(e) => {
                const value = e.target.value === 'true'
                setFormData(prev => ({
                  ...prev,
                  is_undergraduate: value,
                  current_year: value ? prev.current_year : null,
                  major: value ? prev.major : ''
                }))
              }}
              className="select-input"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>

            {formData.is_undergraduate && (
              <>
                <h3>Please select your current year:</h3>
                <select
                  value={formData.current_year?.toString() || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    current_year: parseInt(e.target.value)
                  }))}
                  className="select-input"
                >
                  <option value="">Select year</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>

                <h3>Please enter your major:</h3>
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    major: e.target.value
                  }))}
                  className="text-input"
                  placeholder="Enter your major"
                />
              </>
            )}
          </div>
        )

      case 2:
        return (
          <div className="step-content">
            <h2>Student List Access {steps[1].emoji}</h2>
            <p>Can you access or curate a list of 500-1000 students at your university?</p>
            <p className="description-note">
              For example, having access to or ability to legally scrape student contacts (.edu emails) from sources like yalies.io
            </p>
            <select
              value={formData.can_access_student_list.toString()}
              onChange={(e) => {
                const value = e.target.value === 'true'
                setFormData(prev => ({
                  ...prev,
                  can_access_student_list: value,
                  student_list_confidence: value ? prev.student_list_confidence : null
                }))
              }}
              className="select-input"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>

            {formData.can_access_student_list && (
              <>
                <h3>Rate your ability to scrape your school's emails regularly:</h3>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.student_list_confidence || 1}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    student_list_confidence: parseInt(e.target.value)
                  }))}
                  className="range-input"
                />
                <div className="range-labels">
                  <span>Not likely</span>
                  <span>Very confident</span>
                </div>
              </>
            )}
          </div>
        )

      case 3:
        return (
          <div className="step-content">
            <h2>Admissions Contact {steps[2].emoji}</h2>
            <p>Do you have access to warm contact info of a key admissions decision maker?</p>
            <p className="description-note">
              For example, having a connection with your former principal or a current admissions officer
            </p>
            <select
              value={formData.has_admissions_contact.toString()}
              onChange={(e) => {
                const value = e.target.value === 'true'
                setFormData(prev => ({
                  ...prev,
                  has_admissions_contact: value,
                  admissions_contact_confidence: value ? prev.admissions_contact_confidence : null
                }))
              }}
              className="select-input"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>

            {formData.has_admissions_contact && (
              <>
                <h3>How confident are you in getting a prompt response?</h3>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.admissions_contact_confidence || 1}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    admissions_contact_confidence: parseInt(e.target.value)
                  }))}
                  className="range-input"
                />
                <div className="range-labels">
                  <span>Not likely</span>
                  <span>Very confident</span>
                </div>
              </>
            )}
          </div>
        )

      case 4:
        return (
          <div className="step-content">
            <h2>Response Speed</h2>
            <p>How fast could you connect with that decision maker?</p>
            <p className="description-note">
              A rating of 10 would mean you live next to your old principal
            </p>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.response_speed}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                response_speed: parseInt(e.target.value)
              }))}
              className="range-input"
            />
            <div className="range-labels">
              <span>Slow</span>
              <span>Very fast</span>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="step-content">
            <div className="final-step">
              <h2>Final Step {steps[4].emoji}</h2>
              {isProcessing ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Processing your application...</p>
                  <p className="processing-note">This may take a few moments</p>
                </div>
              ) : (
                <div className="submission-ready">
                  <p>Ready to submit your application?</p>
                  <p className="submission-note">Click submit to finalize your application</p>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="application-form">
      <div 
        className="progress-bar" 
        style={{ '--current-step': currentStep } as React.CSSProperties} 
      />

      {renderStep()}

      <div className="navigation-buttons">
        {currentStep > 1 && (
          <button onClick={handlePrevious} className="btn-previous">
            Previous
          </button>
        )}
        <button onClick={handleNext} className="btn-next">
          {currentStep === 5 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  )
}