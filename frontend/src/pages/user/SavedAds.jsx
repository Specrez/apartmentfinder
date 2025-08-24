import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SavedAds.css';

const SavedAds = () => {
  // Sample saved apartments data - matching employee form structure
  const [savedApartments] = useState([
    {
      id: 1,
      unitNumber: "101",
      title: "Modern 2BR Downtown Unit",
      address: "789 Sunset Blvd, Downtown",
      size: 850,
      rent: 1200,
      deposit: 2400,
      bedrooms: "2",
      bathrooms: "2",
      availableDate: "2024-10-01",
      petPolicy: "Cats allowed",
      parking: "1 assigned space",
      features: ["Hardwood Floors", "Air Conditioning", "Dishwasher", "Balcony"],
      description: "Beautiful modern 2-bedroom unit with city views.",
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"],
      saved: true
    },
    {
      id: 2,
      unitNumber: "102",
      title: "Cozy 1BR Garden View", 
      address: "456 Green Valley Ave, Suburbs",
      size: 600,
      rent: 900,
      deposit: 1800,
      bedrooms: "1",
      bathrooms: "1",
      availableDate: "2024-09-15",
      petPolicy: "No pets",
      parking: "Street parking",
      features: ["Garden View", "Carpet", "Heating", "Storage"],
      description: "Comfortable 1-bedroom unit with peaceful garden views.",
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"],
      saved: true
    }
  ]);

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
