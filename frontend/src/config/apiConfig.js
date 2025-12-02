/**
 * API Configuration
 * Centralized API configuration for the ReGo Travel Management System
 * Controls mock/real API toggle and defines all API endpoints
 * 
 * BACKEND INTEGRATION NOTES:
 * - Backend runs on https://localhost:7133 (HTTPS) or http://localhost:5255 (HTTP)
 * - All endpoints are under /api
 * - Backend uses Response<T> wrapper with Status and Result properties
 * - Login does NOT use JWT - returns RefRoleId (int) only
 * - Most endpoints use POST with query parameters, not JSON body
 */

// ============================================
// MOCK API TOGGLE
// ============================================

/**
 * Toggle between mock and real API
 * Controlled by environment variable REACT_APP_ENABLE_MOCK_API
 * Defaults to true for local development
 */
const USE_MOCK_API = process.env.REACT_APP_ENABLE_MOCK_API === 'true' ||
  process.env.REACT_APP_ENABLE_MOCK_API === undefined;

// ============================================
// API BASE URL
// ============================================

/**
 * Real API base URL from environment variable
 * Falls back to .NET backend default URL
 * TODO: Update .env file with REACT_APP_API_URL=https://localhost:7133/api
 */
const REAL_API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:7133/api';

/**
 * Current API base URL (mock or real)
 */
const API_BASE_URL = USE_MOCK_API ? '' : REAL_API_BASE_URL;

// ============================================
// REQUEST CONFIGURATION
// ============================================

const TIMEOUT = 30000; // 30 seconds
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 second

const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// ============================================
// API ENDPOINTS (.NET BACKEND)
// ============================================

const ENDPOINTS = {
  // ==========================================
  // AUTHENTICATION ENDPOINTS
  // ==========================================
  AUTH: {
    // POST /api/LoginRequest?username={email}&password={password}
    // Returns: Response<int> where Result is RefRoleId
    LOGIN: '/LoginRequest',

    // GET /api/GetRollMaster
    // Returns: Response<List<RollMaster>>
    GET_ROLES: '/GetRollMaster',

    // Legacy endpoints (kept for compatibility, not used with .NET backend)
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    GET_PROFILE: '/auth/profile',
    UPDATE_PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email'
  },

  // ==========================================
  // EMPLOYEE ENDPOINTS
  // ==========================================
  EMPLOYEE: {
    // POST /api/Employee/GetEmployeeData?IDorEmail={id}
    // Returns: Response<Employee>
    GET_DATA: '/Employee/GetEmployeeData',

    // POST /api/Employee/TravelDetailByEmpId?id={empId}
    // Returns: Response<TravelMaster>
    GET_TRAVEL_DETAILS: '/Employee/TravelDetailByEmpId'
  },

  // ==========================================
  // MANAGER ENDPOINTS
  // ==========================================
  MANAGER: {
    // POST /api/Manager/GetEmployeesByRptId?ID={managerId}
    // Returns: Response<List<EmployeeByRptId>>
    GET_TEAM_EMPLOYEES: '/Manager/GetEmployeesByRptId',

    // POST /api/Manager/TravelDetailByRptId?id={managerId}
    // Returns: Response<List<TravelMaster>>
    GET_TEAM_TRAVEL_DETAILS: '/Manager/TravelDetailByRptId',

    // POST /api/Manager/InsertTravelDetail
    // Body: List<TravelMaster>
    // Returns: Response<string>
    CREATE_TRAVEL_REQUEST: '/Manager/InsertTravelDetail'
  },

  // ==========================================
  // TRAVEL STATUS UPDATE
  // ==========================================
  TRAVEL: {
    // POST /api/UpdateTravelStatus?empId={empId}&status={statusCode}
    // Returns: Response<string>
    UPDATE_STATUS: '/UpdateTravelStatus'
  },

  // ==========================================
  // HELP DESK ENDPOINTS (Empty in backend)
  // ==========================================
  HELPDESK: {
    // No endpoints implemented yet in backend
  },

  // ==========================================
  // DASHBOARD ENDPOINTS (Legacy - for mock)
  // ==========================================
  DASHBOARD: {
    STATS: '/dashboard/stats',
    EMPLOYEE_STATS: '/dashboard/employee/stats',
    MANAGER_STATS: '/dashboard/manager/stats',
    TRAVEL_DESK_STATS: '/dashboard/travel-desk/stats',
    FINANCE_STATS: '/dashboard/finance/stats'
  },

  // ==========================================
  // LEGACY ENDPOINTS (Kept for mock compatibility)
  // ==========================================
  TRAVEL_REQUESTS: {
    LIST: '/travel-requests',
    CREATE: '/travel-requests',
    GET: '/travel-requests/:id',
    UPDATE: '/travel-requests/:id',
    DELETE: '/travel-requests/:id',
    SUBMIT: '/travel-requests/:id/submit',
    CANCEL: '/travel-requests/:id/cancel',
    TIMELINE: '/travel-requests/:id/timeline',
    MY_REQUESTS: '/travel-requests/my-requests',
    TEAM_REQUESTS: '/travel-requests/team-requests'
  },

  APPROVALS: {
    PENDING: '/approvals/pending',
    HISTORY: '/approvals/history',
    GET: '/approvals/:id',
    APPROVE: '/approvals/:id/approve',
    REJECT: '/approvals/:id/reject',
    DELEGATE: '/approvals/:id/delegate',
    ADD_COMMENT: '/approvals/:id/comment',
    BULK_APPROVE: '/approvals/bulk-approve',
    BULK_REJECT: '/approvals/bulk-reject'
  },

  DOCUMENTS: {
    LIST: '/documents',
    UPLOAD: '/documents/upload',
    GET: '/documents/:id',
    DOWNLOAD: '/documents/:id/download',
    DELETE: '/documents/:id',
    VERIFY: '/documents/:id/verify',
    REJECT: '/documents/:id/reject',
    OCR_STATUS: '/documents/:id/ocr-status',
    BY_REQUEST: '/documents/request/:requestId'
  },

  BOOKINGS: {
    LIST: '/bookings',
    CREATE: '/bookings',
    GET: '/bookings/:id',
    UPDATE: '/bookings/:id',
    CANCEL: '/bookings/:id',
    BY_REQUEST: '/bookings/request/:requestId',
    CONFIRM: '/bookings/:id/confirm'
  },

  EXPENSES: {
    LIST: '/expenses',
    CREATE: '/expenses',
    GET: '/expenses/:id',
    UPDATE: '/expenses/:id',
    DELETE: '/expenses/:id',
    SUBMIT: '/expenses/:id/submit',
    APPROVE: '/expenses/:id/approve',
    REJECT: '/expenses/:id/reject',
    REIMBURSE: '/expenses/:id/reimburse',
    BY_REQUEST: '/expenses/request/:requestId',
    MY_EXPENSES: '/expenses/my-expenses',
    PENDING_REIMBURSEMENT: '/expenses/pending-reimbursement'
  },

  AI: {
    FLIGHT_RECOMMENDATIONS: '/ai/flight-recommendations',
    HOTEL_RECOMMENDATIONS: '/ai/hotel-recommendations',
    DOCUMENT_EXTRACT: '/ai/document-extract',
    EXPENSE_ANOMALY_CHECK: '/ai/expense-anomaly-check',
    ITINERARY_SUGGESTIONS: '/ai/itinerary-suggestions'
  },

  NOTIFICATIONS: {
    LIST: '/notifications',
    GET: '/notifications/:id',
    MARK_READ: '/notifications/:id/read',
    MARK_ALL_READ: '/notifications/mark-all-read',
    UNREAD_COUNT: '/notifications/unread-count',
    PREFERENCES: '/notifications/preferences',
    DELETE: '/notifications/:id'
  },

  USERS: {
    LIST: '/users',
    GET: '/users/:id',
    CREATE: '/users',
    UPDATE: '/users/:id',
    DELETE: '/users/:id',
    ACTIVATE: '/users/:id/activate',
    DEACTIVATE: '/users/:id/deactivate',
    RESET_PASSWORD: '/users/:id/reset-password'
  },

  REPORTS: {
    TRAVEL_SUMMARY: '/reports/travel-summary',
    EXPENSE_SUMMARY: '/reports/expense-summary',
    DEPARTMENT_REPORT: '/reports/department',
    USER_REPORT: '/reports/user/:userId',
    EXPORT_CSV: '/reports/export/csv',
    EXPORT_PDF: '/reports/export/pdf'
  }
};

// ============================================
// BACKEND DATA MAPPING
// ============================================

/**
 * Role ID to Role Name mapping (from backend RollMaster table)
 * Backend returns RefRoleId as integer
 */
const ROLE_ID_MAP = {
  1: 'EMPLOYEE',
  2: 'MANAGER',
  3: 'AVP',
  4: 'SVP',
  5: 'CHRO',
  6: 'FINANCE',
  7: 'TRAVEL_DESK',
  8: 'ADMIN'
};

/**
 * Travel Status codes (from backend TravelMaster.Status)
 */
const TRAVEL_STATUS_MAP = {
  0: 'PENDING',
  1: 'MANAGER_APPROVED',
  2: 'AVP_APPROVED',
  3: 'SVP_APPROVED',
  4: 'CHRO_APPROVED',
  5: 'APPROVED',
  6: 'REJECTED',
  7: 'AWAITING_DOCUMENTS',
  8: 'UNDER_REVIEW',
  9: 'BOOKING_IN_PROGRESS',
  10: 'BOOKING_COMPLETED'
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Replace path parameters in endpoint URL
 * @param {string} endpoint - Endpoint with :params
 * @param {object} params - Parameters to replace
 * @returns {string} - Endpoint with replaced params
 */
const replaceParams = (endpoint, params = {}) => {
  let url = endpoint;
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  return url;
};

/**
 * Build full URL with query parameters
 * @param {string} endpoint - API endpoint
 * @param {object} queryParams - Query parameters
 * @returns {string} - Full URL with query string
 */
const buildUrl = (endpoint, queryParams = {}) => {
  const url = API_BASE_URL + endpoint;
  const params = new URLSearchParams();

  Object.keys(queryParams).forEach(key => {
    if (queryParams[key] !== null && queryParams[key] !== undefined) {
      params.append(key, queryParams[key]);
    }
  });

  const queryString = params.toString();
  return queryString ? `${url}?${queryString}` : url;
};

/**
 * Map backend Response<T> to frontend format
 * Backend returns: { Status: "Success"|"Functional Failure"|"Technical Failure", Result: T }
 * Frontend expects: { success: boolean, data: T, error: {...} }
 * @param {object} backendResponse - Backend response
 * @returns {object} - Frontend formatted response
 */
const mapBackendResponse = (backendResponse) => {
  const isSuccess = backendResponse.Status === 'Success';

  return {
    success: isSuccess,
    data: isSuccess ? backendResponse.Result : null,
    error: isSuccess ? null : {
      message: backendResponse.Status,
      code: backendResponse.Status === 'Functional Failure' ? 'FUNCTIONAL_ERROR' : 'TECHNICAL_ERROR'
    }
  };
};

/**
 * Map role ID to role name
 * @param {number} roleId - Role ID from backend
 * @returns {string} - Role name
 */
const mapRoleId = (roleId) => {
  return ROLE_ID_MAP[roleId] || 'EMPLOYEE';
};

/**
 * Map status code to status name
 * @param {number} statusCode - Status code from backend
 * @returns {string} - Status name
 */
const mapStatusCode = (statusCode) => {
  return TRAVEL_STATUS_MAP[statusCode] || 'PENDING';
};

// ============================================
// EXPORTS
// ============================================

const apiConfig = {
  USE_MOCK_API,
  API_BASE_URL,
  REAL_API_BASE_URL,
  TIMEOUT,
  RETRY_ATTEMPTS,
  RETRY_DELAY,
  HEADERS,
  ENDPOINTS,
  ROLE_ID_MAP,
  TRAVEL_STATUS_MAP,
  replaceParams,
  buildUrl,
  mapBackendResponse,
  mapRoleId,
  mapStatusCode
};

export default apiConfig;

// Named exports for convenience
export {
  USE_MOCK_API,
  API_BASE_URL,
  REAL_API_BASE_URL,
  TIMEOUT,
  RETRY_ATTEMPTS,
  RETRY_DELAY,
  HEADERS,
  ENDPOINTS,
  ROLE_ID_MAP,
  TRAVEL_STATUS_MAP,
  replaceParams,
  buildUrl,
  mapBackendResponse,
  mapRoleId,
  mapStatusCode
};