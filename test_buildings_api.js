// Simple test to check buildings API response
async function testBuildingsAPI() {
  try {
    console.log('Testing buildings API...');
    const response = await fetch('http://localhost:8080/api/admin/buildings/pending');
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Buildings data:', data);
      console.log('Number of buildings:', data.length);
      
      if (data.length > 0) {
        console.log('First building structure:', data[0]);
        console.log('Building has id:', !!data[0].id);
        console.log('Building has buildingName:', !!data[0].buildingName);
        console.log('Building has createdAt:', !!data[0].createdAt);
      }
    } else {
      console.error('API call failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error testing buildings API:', error);
  }
}

// Run the test
testBuildingsAPI();