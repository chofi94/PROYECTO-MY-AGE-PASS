
const API_BASE_URL = 'https://api.example.com';

export const getProfile = async () => {
  const token = localStorage.getItem('authToken');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        phone: '+1234567890',
        company: 'Example Corp',
        verified: true,
        createdAt: '2024-01-15'
      });
    }, 500);
  });
};

export const updateProfile = async (profileData) => {
  const token = localStorage.getItem('authToken');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...profileData,
        updatedAt: new Date().toISOString()
      });
    }, 1000);
  });
};

export const getVerificationHistory = async () => {
  const token = localStorage.getItem('authToken');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          type: 'ID Verification',
          status: 'approved',
          date: '2024-01-20',
          document: 'Passport'
        },
        {
          id: '2',
          type: 'NFC Verification',
          status: 'pending',
          date: '2024-01-22',
          document: 'Driver License'
        },
        {
          id: '3',
          type: 'Document Verification',
          status: 'approved',
          date: '2024-01-18',
          document: 'ID Card'
        }
      ]);
    }, 500);
  });
};
