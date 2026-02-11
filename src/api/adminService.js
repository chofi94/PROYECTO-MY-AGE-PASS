
const API_BASE_URL = 'https://api.example.com';

export const getUsers = async (filters = {}) => {
  const token = localStorage.getItem('authToken');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          verified: true,
          status: 'active',
          createdAt: '2024-01-10'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'user',
          verified: false,
          status: 'active',
          createdAt: '2024-01-15'
        },
        {
          id: '3',
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'user',
          verified: true,
          status: 'inactive',
          createdAt: '2024-01-05'
        }
      ]);
    }, 500);
  });
};

export const getVerifications = async (filters = {}) => {
  const token = localStorage.getItem('authToken');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          userId: '2',
          userName: 'Jane Smith',
          type: 'NFC Verification',
          status: 'pending',
          submittedAt: '2024-01-22',
          document: 'Passport'
        },
        {
          id: '2',
          userId: '1',
          userName: 'John Doe',
          type: 'ID Verification',
          status: 'approved',
          submittedAt: '2024-01-20',
          document: 'Driver License'
        },
        {
          id: '3',
          userId: '3',
          userName: 'Bob Johnson',
          type: 'Document Verification',
          status: 'rejected',
          submittedAt: '2024-01-18',
          document: 'ID Card'
        }
      ]);
    }, 500);
  });
};

export const approveVerification = async (verificationId) => {
  const token = localStorage.getItem('authToken');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: verificationId,
        status: 'approved',
        approvedAt: new Date().toISOString()
      });
    }, 1000);
  });
};

export const rejectVerification = async (verificationId, reason) => {
  const token = localStorage.getItem('authToken');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: verificationId,
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
        reason
      });
    }, 1000);
  });
};

export const deactivateUser = async (userId) => {
  const token = localStorage.getItem('authToken');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        status: 'inactive',
        deactivatedAt: new Date().toISOString()
      });
    }, 1000);
  });
};
