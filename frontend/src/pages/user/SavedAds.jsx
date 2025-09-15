import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SavedAds.css';

const SavedAds = () => {
  // Sample saved apartments data - Will be fetched from backend
  const [savedApartments, setSavedApartments] = useState([]);

  return (
    <div className="saved-ads-page">
      <div className="container">
        <div className="page-header">
          <h1>Saved Properties</h1>
          <p>All your favorite apartments in one place.</p>
        </div>
        
        <div className="apartments-grid">
          {savedApartments.length === 0 ? (
            <div className="no-saved">
              <p>You have no saved properties yet.</p>
              <Link to="/" className="btn btn-primary">Browse Properties</Link>
            </div>
          ) : (
            savedApartments.map(apartment => (
              <div key={apartment.id} className="apartment-card">
                <img src={apartment.images[0]} alt={apartment.title} className="apartment-image" />
                <div className="apartment-info">
                  <h3 className="apartment-name">{apartment.title}</h3>
                  <p className="apartment-location">{apartment.address}</p>
                  <div className="apartment-details">
                    <span>{apartment.bedrooms} bed • {apartment.bathrooms} bath • {apartment.size} sq ft</span>
                  </div>
                  <p className="apartment-price">Rs. {apartment.rent.toLocaleString()} / month</p>
                  <p className="apartment-availability">Available: {apartment.availableDate}</p>
                  <div className="apartment-actions">
                    <Link to={`/apartment/${apartment.id}`} className="btn btn-sm btn-primary">View Details</Link>
                    <button className="btn btn-sm btn-outline">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedAds;
