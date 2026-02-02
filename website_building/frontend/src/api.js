const API_URL = 'http://localhost:5000/api';

export const checkBackendHealth = async () => {
    try {
        const response = await fetch('http://localhost:5000/');
        const data = await response.json();
        return { success: true, message: data.message };
    } catch (error) {
        return { success: false, message: 'Backend not reachable' };
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const getBookings = async (userId, role, token) => {
    try {
        const response = await fetch(`${API_URL}/bookings/${userId}?role=${role}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
    } catch (error) {
        throw error;
    }
};

// Get all services
export const getAllServices = async () => {
    try {
        const response = await fetch(`${API_URL}/services`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch services');
        return data;
    } catch (error) {
        throw error;
    }
};

// Get categorized services
export const getCategorizedServices = async () => {
    try {
        const response = await fetch(`${API_URL}/services/categorized`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch categorized services');
        return data;
    } catch (error) {
        throw error;
    }
};

// Get service by ID
export const getServiceById = async (serviceId) => {
    try {
        const response = await fetch(`${API_URL}/services/${serviceId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch service');
        return data;
    } catch (error) {
        throw error;
    }
};

// Create a new service (for providers)
export const createService = async (serviceData, token) => {
    try {
        const response = await fetch(`${API_URL}/services`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(serviceData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to create service');
        return data;
    } catch (error) {
        throw error;
    }
};

// Create a booking
export const createBooking = async (bookingData, token) => {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookingData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to create booking');
        return data;
    } catch (error) {
        throw error;
    }
};

// Toggle provider availability
export const toggleAvailability = async (userId, token) => {
    try {
        const response = await fetch(`${API_URL}/auth/toggle-availability`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to toggle availability');
        return data;
    } catch (error) {
        throw error;
    }
};

// Complete provider onboarding
export const completeOnboarding = async (userId, phone, address, token) => {
    try {
        const response = await fetch(`${API_URL}/auth/complete-onboarding`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, phone, address })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to complete onboarding');
        return data;
    } catch (error) {
        throw error;
    }
};

// Get booking by ID
export const getBookingById = async (bookingId, token) => {
    try {
        const response = await fetch(`${API_URL}/bookings/detail/${bookingId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch booking details');
        return data;
    } catch (error) {
        throw error;
    }
};


// Update booking status
export const updateBookingStatus = async (bookingId, status, token) => {
    try {
        const response = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to update booking status');
        return data;
    } catch (error) {
        throw error;
    }
};

// Rate booking
export const rateBooking = async (bookingId, rating, review, token) => {
    try {
        const response = await fetch(`${API_URL}/bookings/${bookingId}/rate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ rating, review })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to submit rating');
        return data;
    } catch (error) {
        throw error;
    }
};
