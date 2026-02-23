import axios from 'axios';

// La URL de tu API de Laravel
const API_URL = 'http://localhost:8000/api'; 

export const getVerificationHistory = async () => {
  // Intentamos pillar el token de las dos formas posibles
  const token = localStorage.getItem('token') || localStorage.getItem('authToken');
  
  if (!token) {
    console.error("No se encontró ningún token en el localStorage");
    return [];
  }

  try {
    const response = await axios.get(`${API_URL}/operations`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    // Devolvemos los datos que vienen de la tabla 'operations' de MySQL
    return response.data; 
  } catch (error) {
    console.error("Error al obtener el historial de MySQL:", error);
    // Si hay error, devolvemos un array vacío para que la tabla no rompa
    return [];
  }
};