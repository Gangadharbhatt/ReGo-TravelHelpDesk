/**
 * Authentication Service
 * Handles all authentication-related API calls
 * Automatically switches between mock and real API based on environment
 * 
 * BACKEND INTEGRATION:
 * - Backend login: POST /api/LoginRequest?username={email}&password={password}
 * - Returns: Response<int> where Result is RefRoleId (1-8)
 * - NO JWT tokens - simple role-based auth
 * - Must fetch employee data separately after login to get full user details
 */

import apiClient from '../api/client';
import mockDataService from './mockDataService';
import apiConfig, { ENDPOINTS, mapBackendResponse, mapRoleId } from '../config/apiConfig';
import { STORAGE_KEYS } from '../utils/constants';

const authService = {
  /**
   * Login user
   * @param {object} credentials - { email, password }
   * @returns {Promise<object>} - { user, token, refreshToken }
   */
  login: async (credentials) => {
    let response;

    if (apiConfig.USE_MOCK_API) {
      console.log('🔵 Using MOCK API for login');
      response = await mockDataService.login(credentials);

      if (response.data.success) {
        const { user, token, refreshToken } = response.data.data;

        // Store in localStorage
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

        console.log('✅ Login successful (MOCK):', user.email);
        return response.data.data;
      }

      throw new Error(response.data.error?.message || 'Login failed');
    }

    // ============================================
    // REAL BACKEND LOGIN
    // ============================================
    console.log('🟢 Using REAL API for login');

    try {
      // Step 1: Validate login credentials
      // POST /api/LoginRequest?username={email}&password={password}
      const loginUrl = apiConfig.buildUrl(ENDPOINTS.AUTH.LOGIN, {
        username: credentials.email,
        password: credentials.password
      });

      const loginResponse = await apiClient.post(loginUrl);
      console.log('Backend login response:', loginResponse.data);

      // Map backend response format
      const mappedResponse = mapBackendResponse(loginResponse.data);

      if (!mappedResponse.success) {
        throw new Error(mappedResponse.error?.message || 'Invalid credentials');
      }

      // Result is RefRoleId (integer)
      const roleId = mappedResponse.data;
      const roleName = mapRoleId(roleId);

      console.log(`✅ Login validated. RoleId: ${roleId}, Role: ${roleName}`);

      // Step 2: Fetch employee details
      // POST /api/Employee/GetEmployeeData?IDorEmail={email}
      const employeeUrl = apiConfig.buildUrl(ENDPOINTS.EMPLOYEE.GET_DATA, {
        IDorEmail: credentials.email
      });

      const employeeResponse = await apiClient.post(employeeUrl);
      console.log('Backend employee response:', employeeResponse.data);

      const mappedEmployeeResponse = mapBackendResponse(employeeResponse.data);

      if (!mappedEmployeeResponse.success) {
        throw new Error('Failed to fetch employee details');
      }

      const employeeData = mappedEmployeeResponse.data;

      // Step 3: Build user object for frontend
      const user = {
        id: employeeData.EmpId,
        empId: employeeData.EmpId,
        email: employeeData.Email,
        name: employeeData.Name,
        firstName: employeeData.Name.split(' ')[0] || employeeData.Name,
        lastName: employeeData.Name.split(' ').slice(1).join(' ') || '',
        role: roleName,
        roleId: roleId,
        rptEmpId: employeeData.RptEmpId,
        department: 'General' // Backend doesn't have department field
      };

      // For backend, we don't use JWT tokens
      // Store a simple flag to indicate authenticated state
      const token = `backend-auth-${user.empId}-${Date.now()}`;
      const refreshToken = token; // Same as token since no refresh mechanism

      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

      console.log('✅ Login successful (REAL):', user.email, 'Role:', user.role);

      return { user, token, refreshToken };

    } catch (error) {
      console.error('❌ Login error:', error);

      // Handle backend-specific errors
      if (error.response?.data) {
        const backendError = mapBackendResponse(error.response.data);
        throw new Error(backendError.error?.message || 'Login failed');
      }

      throw error;
    }
  },

  /**
   * Register a new user
   * @param {object} userData - User registration data
   * @returns {Promise<object>} - { user, token, refreshToken }
   */
  register: async (userData) => {
    let response;

    if (apiConfig.USE_MOCK_API) {
      console.log('🔵 Using MOCK API for register');
      response = await mockDataService.register(userData);
    } else {
      console.log('🟢 Using REAL API for register');
      // Backend doesn't have register endpoint yet
      throw new Error('Registration not implemented in backend yet');
    }

    if (response.data.success) {
      const { user, token, refreshToken } = response.data.data;

      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

      console.log('✅ Registration successful:', user.email);
      return response.data.data;
    }

    throw new Error(response.data.error?.message || 'Registration failed');
  },

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  logout: async () => {
    try {
      if (apiConfig.USE_MOCK_API) {
        console.log('🔵 Using MOCK API for logout');
        await mockDataService.logout();
      } else {
        console.log('🟢 Using REAL API for logout');
        // Backend doesn't have logout endpoint
        // Just clear local storage
      }
    } finally {
      // Clear localStorage even if API call fails
      authService.clearLocalStorage();
      console.log('✅ Logged out successfully');
    }
  },

  /**
   * Refresh access token
   * @returns {Promise<object>} - { token }
   */
  refreshToken: async () => {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    if (apiConfig.USE_MOCK_API) {
      // For mock, just return the existing token
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      return { token };
    }

    // Backend doesn't have token refresh
    // Just return existing token
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    return { token };
  },

  /**
   * Get user profile
   * @returns {Promise<object>} - User object
   */
  getProfile: async () => {
    let response;

    if (apiConfig.USE_MOCK_API) {
      console.log('🔵 Using MOCK API for getProfile');
      response = await mockDataService.getProfile();
    } else {
      console.log('🟢 Using REAL API for getProfile');

      // Get current user from localStorage
      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error('No user logged in');
      }

      // Fetch latest employee data
      const employeeUrl = apiConfig.buildUrl(ENDPOINTS.EMPLOYEE.GET_DATA, {
        IDorEmail: user.email
      });

      const employeeResponse = await apiClient.post(employeeUrl);
      const mappedResponse = mapBackendResponse(employeeResponse.data);

      if (!mappedResponse.success) {
        throw new Error('Failed to fetch profile');
      }

      const employeeData = mappedResponse.data;

      // Update user object
      const updatedUser = {
        ...user,
        name: employeeData.Name,
        firstName: employeeData.Name.split(' ')[0] || employeeData.Name,
        lastName: employeeData.Name.split(' ').slice(1).join(' ') || '',
        email: employeeData.Email,
        rptEmpId: employeeData.RptEmpId
      };

      // Update localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));

      return updatedUser;
    }

    if (response.data.success) {
      const user = response.data.data;

      // Update localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

      return user;
    }

    throw new Error('Failed to get profile');
  },

  /**
   * Update user profile
   * @param {object} updates - Profile updates
   * @returns {Promise<object>} - Updated user object
   */
  updateProfile: async (updates) => {
    let response;

    if (apiConfig.USE_MOCK_API) {
      console.log('🔵 Using MOCK API for updateProfile');
      response = await mockDataService.updateProfile(updates);
    } else {
      console.log('🟢 Using REAL API for updateProfile');
      // Backend doesn't have update profile endpoint yet
      throw new Error('Profile update not implemented in backend yet');
    }

    if (response.data.success) {
      const user = response.data.data;

      // Update localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

      return user;
    }

    throw new Error('Failed to update profile');
  },

  /**
   * Change password
   * @param {object} passwords - { currentPassword, newPassword }
   * @returns {Promise<void>}
   */
  changePassword: async (passwords) => {
    let response;

    if (apiConfig.USE_MOCK_API) {
      console.log('🔵 Using MOCK API for changePassword');
      // Mock doesn't actually change password
      response = { data: { success: true } };
    } else {
      console.log('🟢 Using REAL API for changePassword');
      // Backend doesn't have change password endpoint yet
      throw new Error('Password change not implemented in backend yet');
    }

    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to change password');
    }
  },

  /**
   * Get current user from localStorage
   * @returns {object|null} - User object or null
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  },

  /**
   * Get access token from localStorage
   * @returns {string|null} - Access token or null
   */
  getAccessToken: () => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if authenticated
   */
  isAuthenticated: () => {
    const token = authService.getAccessToken();
    const user = authService.getCurrentUser();
    return !!(token && user);
  },

  /**
   * Clear all auth data from localStorage
   */
  clearLocalStorage: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }
};

export default authService;