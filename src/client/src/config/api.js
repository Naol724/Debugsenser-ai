// API Configuration for DebugSense AI
// Handles different environments and deployment setups

// Get API URL from environment or fallback
const getApiBaseUrl = () => {
  // Production: Use environment variable from Vercel/Netlify
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Development: Use local backend
  if (import.meta.env.DEV) {
    return 'http://localhost:5000';
  }
  
  // Production fallback: Use current origin for same-domain deployment
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Ultimate fallback
  return 'https://debugsense-ai.onrender.com';
};

const API_BASE_URL = getApiBaseUrl();

export const API = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    EXPLAIN: `${API_BASE_URL}/api/explain`,
    HEALTH: `${API_BASE_URL}/api/health`,
    HISTORY: (sessionId) => `${API_BASE_URL}/api/history/${sessionId}`,
    DELETE_HISTORY: (id) => `${API_BASE_URL}/api/history/${id}`,
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 30000,
  
  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // Base delay in ms
    BACKOFF: 2, // Exponential backoff multiplier
  }
};

// Enhanced fetch with retry logic and better error handling
export const apiRequest = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API.TIMEOUT);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - server is waking up');
    }
    
    throw error;
  }
};

// API request with retry logic
export const apiRequestWithRetry = async (url, options = {}, attempt = 1) => {
  try {
    return await apiRequest(url, options);
  } catch (error) {
    if (attempt < API.RETRY.MAX_ATTEMPTS && 
        (error.message.includes('timeout') || 
         error.message.includes('fetch') ||
         error.message.includes('waking up'))) {
      
      // Calculate delay with exponential backoff
      const delay = API.RETRY.DELAY * Math.pow(API.RETRY.BACKOFF, attempt - 1);
      
      console.log(`API request failed (attempt ${attempt}), retrying in ${delay}ms...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return apiRequestWithRetry(url, options, attempt + 1);
    }
    
    throw error;
  }
};

// Health check with retry
export const checkHealth = async () => {
  try {
    return await apiRequestWithRetry(API.ENDPOINTS.HEALTH);
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

// Explain error with retry and better error handling
export const explainError = async (errorData) => {
  try {
    const response = await apiRequestWithRetry(API.ENDPOINTS.EXPLAIN, {
      method: 'POST',
      body: JSON.stringify(errorData),
    });
    
    return response;
  } catch (error) {
    console.error('Error explanation failed:', error);
    
    // Provide user-friendly error message
    if (error.message.includes('timeout')) {
      throw new Error('Server is waking up. Please try again in a moment.');
    } else if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check your connection.');
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  }
};

// Get history with retry
export const getHistory = async (sessionId) => {
  try {
    return await apiRequestWithRetry(API.ENDPOINTS.HISTORY(sessionId));
  } catch (error) {
    console.error('Failed to get history:', error);
    throw new Error('Unable to load history. Please try again.');
  }
};

// Delete history item
export const deleteHistoryItem = async (id) => {
  try {
    return await apiRequest(API.ENDPOINTS.DELETE_HISTORY(id), {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Failed to delete history item:', error);
    throw new Error('Unable to delete item. Please try again.');
  }
};

export default API;
