import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <h1 className="page-title">About Lanka Property</h1>
          <p className="page-subtitle">
            Your trusted partner in finding the perfect place to call home
          </p>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              At Lanka Property, we believe that everyone deserves to find their perfect home. 
              Our mission is to simplify the apartment hunting process by providing a comprehensive, 
              user-friendly platform that connects renters with their ideal living spaces.
            </p>
          </div>

          <div className="about-section">
            <h2>What We Offer</h2>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">🔍</div>
                <div className="feature-text">
                  <h3>Advanced Search</h3>
                  <p>Filter by location, price, amenities, and more to find exactly what you're looking for.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">✅</div>
                <div className="feature-text">
                  <h3>Verified Listings</h3>
                  <p>All our property listings are verified to ensure accuracy and prevent fraud.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <div className="feature-text">
                  <h3>Mobile Friendly</h3>
                  <p>Search for apartments on the go with our responsive mobile design.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <div className="feature-text">
                  <h3>Direct Contact</h3>
                  <p>Connect directly with landlords and property managers for quick responses.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2025, Lanka Property was born out of the frustration of searching for 
              apartments across multiple platforms with inconsistent information. We wanted to create 
              a single, reliable source for apartment hunting that puts users first.
            </p>
            <p>
              Our team of experienced developers and real estate professionals work tirelessly to 
              ensure that our platform remains current, accurate, and easy to use. We're constantly 
              improving our search algorithms and adding new features based on user feedback.
            </p>
          </div>

          <div className="about-section">
            <h2>Contact Us</h2>
            <div className="contact-info">
              <div className="contact-item">
                <strong>Email:</strong> contact@lankaproperty.com
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> (555) 123-4567
              </div>
              <div className="contact-item">
                <strong>Address:</strong> 123 Main Street, City, State 12345
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
