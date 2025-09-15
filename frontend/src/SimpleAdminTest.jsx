import React, { useState, useEffect } from 'react';

const SimpleAdminTest = () => {
  const [pendingBuildings, setPendingBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      console.log('Fetching buildings...');
      setLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:8080/api/admin/buildings/pending');
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Buildings data:', data);
        console.log('Number of buildings:', data.length);
        setPendingBuildings(data);
      } else {
        setError(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching buildings:', error);
      setError('Network Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Simple Admin Test</h1>
      <button onClick={fetchBuildings}>Refresh Buildings</button>
      
      <div style={{ marginTop: '20px' }}>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        {!loading && !error && (
          <div>
            <h2>Buildings ({pendingBuildings.length})</h2>
            {pendingBuildings.length === 0 ? (
              <div>No pending buildings</div>
            ) : (
              <div>
                {pendingBuildings.map(building => (
                  <div key={building.id} style={{ 
                    border: '1px solid #ccc', 
                    padding: '10px', 
                    margin: '10px 0',
                    backgroundColor: '#f9f9f9' 
                  }}>
                    <h3>{building.buildingName}</h3>
                    <p><strong>ID:</strong> {building.id}</p>
                    <p><strong>Address:</strong> {building.address}</p>
                    <p><strong>Status:</strong> {building.status}</p>
                    <p><strong>Created:</strong> {building.createdAt}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleAdminTest;