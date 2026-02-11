
const API_BASE_URL = 'https://api.example.com'; // Replace with actual API URL

export const login = async (email, password) => {
  // Simulate API call - replace with actual implementation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'password') {
        resolve({
          token: 'demo-token-' + Date.now(),
          user: {
            id: '1',
            email: 'demo@example.com',
            name: 'Demo User',
            role: 'user',
            verified: true
          }
        });
      } else if (email === 'admin@example.com' && password === 'admin') {
        resolve({
          token: 'admin-token-' + Date.now(),
          user: {
            id: '2',
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'admin',
            verified: true
          }
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};

export const register = async (userData) => {
  // Simulate API call - replace with actual implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'new-token-' + Date.now(),
        user: {
          id: Date.now().toString(),
          email: userData.email,
          name: userData.fullName,
          role: 'user',
          verified: false
        }
      });
    }, 1000);
  });
};

export const loginWithGoogle = async () => {
  // Prepare for Google OAuth integration
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'google-token-' + Date.now(),
        user: {
          id: 'google-' + Date.now(),
          email: 'user@gmail.com',
          name: 'Google User',
          role: 'user',
          verified: true
        }
      });
    }, 1000);
  });
};

export const validateToken = async (token) => {
  // Simulate token validation - replace with actual implementation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token && token.startsWith('demo-token')) {
        resolve({
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User',
          role: 'user',
          verified: true
        });
      } else if (token && token.startsWith('admin-token')) {
        resolve({
          id: '2',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
          verified: true
        });
      } else if (token) {
        resolve({
          id: '3',
          email: 'user@example.com',
          name: 'Regular User',
          role: 'user',
          verified: false
        });
      } else {
        reject(new Error('Invalid token'));
      }
    }, 500);
  });
};

export const logout = async () => {
  // Call backend logout endpoint if needed
  return Promise.resolve();
};
