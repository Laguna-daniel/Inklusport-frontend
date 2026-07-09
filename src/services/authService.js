import API from './api';

// Envío de datos al endpoint de registro (El gateway redirige a users-ms)
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/users/register', {
      nombreCompleto: userData.fullName,
      email: userData.email,
      telefono: userData.phone,
      tipoDiscapacidad: userData.disabilityType,
      password: userData.password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error en el registro de usuario';
  }
};

// Envío de credenciales al endpoint de login (El gateway redirige a auth-ms)
export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/auth/login', {
      email: credentials.email,
      password: credentials.password
    });
    
    // Si el backend responde con éxito, guardamos el token localmente
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Credenciales incorrectas';
  }
};
