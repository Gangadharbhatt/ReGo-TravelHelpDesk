/**
 * Dashboard Service
 * Provides dashboard data for all user roles
 * Automatically switches between mock and real API based on environment
 * 
 * BACKEND INTEGRATION:
 * - Employee: GET /api/Employee/TravelDetailByEmpId?id={empId}
 * - Manager/AVP/SVP/CHRO: GET /api/Manager/TravelDetailByRptId?id={managerId}
 * - Travel Desk: Same as Manager (all pending requests)
 * - Backend returns TravelMaster objects with Status codes (0-10)
 */

import apiClient from '../api/client';
import apiConfig, { ENDPOINTS, mapBackendResponse, mapStatusCode } from '../config/apiConfig';
import {
  People as PeopleIcon,
  PendingActions as PendingActionsIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Flight as FlightIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';

const dashboardService = {
  /**
   * Get dashboard statistics
   * @param {string} role - User role
   * @param {string} empId - Employee ID
   * @returns {Promise<Array>} - Array of stat objects
   */
  getDashboardStats: async (role, empId) => {
    if (apiConfig.USE_MOCK_API) {
      console.log('🔵 Using MOCK data for dashboard stats');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(getMockStats(role));
        }, 500);
      });
    }

    // ============================================
    // REAL BACKEND - Fetch travel data and compute stats
    // ============================================
    console.log('🟢 Using REAL API for dashboard stats');

    try {
      let travelData = [];

      if (role === 'EMPLOYEE') {
        // Fetch employee's own travel details
        const url = apiConfig.buildUrl(ENDPOINTS.EMPLOYEE.GET_TRAVEL_DETAILS, { id: empId });
        const response = await apiClient.post(url);
        const mapped = mapBackendResponse(response.data);

        if (mapped.success && mapped.data) {
          travelData = [mapped.data]; // Single travel record
        }
      } else if (['MANAGER', 'AVP', 'SVP', 'CHRO', 'TRAVEL_DESK', 'ADMIN'].includes(role)) {
        // Fetch team's travel details
        const url = apiConfig.buildUrl(ENDPOINTS.MANAGER.GET_TEAM_TRAVEL_DETAILS, { id: empId });
        const response = await apiClient.post(url);
        const mapped = mapBackendResponse(response.data);

        if (mapped.success && mapped.data) {
          travelData = mapped.data; // Array of travel records
        }
      }

      // Compute stats from travel data
      return computeStatsFromTravelData(travelData, role);

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Return empty stats on error
      return getMockStats(role).map(stat => ({ ...stat, value: 0 }));
    }
  },

  /**
   * Get pending approvals
   * @param {string} empId - Manager/Approver ID
   * @returns {Promise<Array>} - Array of pending approval objects
   */
  getPendingApprovals: async (empId) => {
    if (apiConfig.USE_MOCK_API) {
      console.log('🔵 Using MOCK data for pending approvals');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(getMockPendingApprovals());
        }, 500);
      });
    }

    // ============================================
    // REAL BACKEND - Fetch team travel details
    // ============================================
    console.log('🟢 Using REAL API for pending approvals');

    try {
      const url = apiConfig.buildUrl(ENDPOINTS.MANAGER.GET_TEAM_TRAVEL_DETAILS, { id: empId });
      const response = await apiClient.post(url);
      const mapped = mapBackendResponse(response.data);

      if (!mapped.success || !mapped.data) {
        return [];
      }

      // Map backend TravelMaster to frontend format
      return mapped.data.map(travel => mapTravelMasterToRequest(travel));

    } catch (error) {
      console.error('Error fetching pending approvals:', error);
      return [];
    }
  },

  /**
   * Get pending travel desk requests
   * @param {string} empId - Travel desk employee ID
   * @returns {Promise<Array>} - Array of pending request objects
   */
  getPendingRequests: async (empId) => {
    if (apiConfig.USE_MOCK_API) {
      console.log('🔵 Using MOCK data for pending requests');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(getMockPendingRequests());
        }, 500);
      });
    }

    // ============================================
    // REAL BACKEND - Same as pending approvals
    // ============================================
    console.log('🟢 Using REAL API for pending requests');

    try {
      const url = apiConfig.buildUrl(ENDPOINTS.MANAGER.GET_TEAM_TRAVEL_DETAILS, { id: empId });
      const response = await apiClient.post(url);
      const mapped = mapBackendResponse(response.data);

      if (!mapped.success || !mapped.data) {
        return [];
      }

      // Filter for approved requests that need booking
      const approvedRequests = mapped.data.filter(travel =>
        travel.Status >= 5 && travel.Status <= 10 // Approved to Booking Completed
      );

      return approvedRequests.map(travel => mapTravelMasterToRequest(travel));

    } catch (error) {
      console.error('Error fetching pending requests:', error);
      return [];
    }
  },

  /**
   * Get employee's active travel request
   * @param {string} empId - Employee ID
   * @returns {Promise<object|null>} - Active travel request or null
   */
  getActiveRequest: async (empId) => {
    if (apiConfig.USE_MOCK_API) {
      console.log('🔵 Using MOCK data for active request');
      // Return mock data
      return null;
    }

    console.log('🟢 Using REAL API for active request');

    try {
      const url = apiConfig.buildUrl(ENDPOINTS.EMPLOYEE.GET_TRAVEL_DETAILS, { id: empId });
      const response = await apiClient.post(url);
      const mapped = mapBackendResponse(response.data);

      if (!mapped.success || !mapped.data) {
        return null;
      }

      return mapTravelMasterToRequest(mapped.data);

    } catch (error) {
      console.error('Error fetching active request:', error);
      return null;
    }
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Map backend TravelMaster to frontend request format
 * @param {object} travel - TravelMaster from backend
 * @returns {object} - Frontend request object
 */
const mapTravelMasterToRequest = (travel) => {
  return {
    id: travel.EmpId,
    empId: travel.EmpId,
    employee: travel.EmpId, // Will be replaced with name if available
    destination: `${travel.City}, ${travel.Country}`,
    city: travel.City,
    country: travel.Country,
    departure: travel.TravelStartDate,
    departureDate: travel.TravelStartDate,
    returnDate: travel.TravelEndDate,
    suggestedDate: travel.SuggestedDate,
    purpose: travel.Remark || 'Business Travel',
    status: mapStatusCode(travel.Status),
    statusCode: travel.Status,
    rptEmpId: travel.RptEmpId,
    // Additional fields for frontend
    requestNumber: `TR-${travel.EmpId}-${new Date(travel.SuggestedDate).getFullYear()}`,
    estimatedCost: 100000, // Backend doesn't have cost field
    priority: 'MEDIUM',
    submittedAt: travel.SuggestedDate,
    steps: generateStepsFromStatus(travel.Status)
  };
};

/**
 * Generate stepper steps based on status
 * @param {number} statusCode - Status code from backend
 * @returns {Array} - Array of step objects
 */
const generateStepsFromStatus = (statusCode) => {
  const allSteps = [
    { label: 'Request Raised', completed: statusCode >= 0 },
    { label: 'Manager Review', completed: statusCode >= 1 },
    { label: 'AVP Review', completed: statusCode >= 2 },
    { label: 'SVP Review', completed: statusCode >= 3 },
    { label: 'CHRO Approval', completed: statusCode >= 4 },
    { label: 'Documents Submitted', completed: statusCode >= 7 },
    { label: 'Booking Confirmed', completed: statusCode >= 10 }
  ];

  return allSteps;
};

/**
 * Compute stats from travel data
 * @param {Array} travelData - Array of TravelMaster objects
 * @param {string} role - User role
 * @returns {Array} - Array of stat objects
 */
const computeStatsFromTravelData = (travelData, role) => {
  const total = travelData.length;
  const pending = travelData.filter(t => t.Status < 5).length;
  const approved = travelData.filter(t => t.Status >= 5 && t.Status < 6).length;
  const rejected = travelData.filter(t => t.Status === 6).length;
  const completed = travelData.filter(t => t.Status === 10).length;

  if (role === 'MANAGER' || role === 'AVP' || role === 'SVP' || role === 'CHRO') {
    return [
      {
        title: 'Team Requests',
        value: total,
        iconKey: 'People',
        color: 'primary',
        trend: `${total > 0 ? '+' : ''}${total}`
      },
      {
        title: 'Pending Approvals',
        value: pending,
        iconKey: 'PendingActions',
        color: 'warning',
        trend: `${pending > 0 ? '+' : ''}${pending}`
      },
      {
        title: 'Approved',
        value: approved,
        iconKey: 'CheckCircle',
        color: 'success',
        trend: `${approved > 0 ? '+' : ''}${approved}`
      },
      {
        title: 'Rejected',
        value: rejected,
        iconKey: 'Cancel',
        color: 'error',
        trend: `${rejected > 0 ? '-' : ''}${rejected}`
      }
    ];
  }

  if (role === 'TRAVEL_DESK' || role === 'ADMIN') {
    return [
      {
        title: 'Pending Processing',
        value: pending,
        iconKey: 'PendingActions',
        color: 'warning',
        trend: `${pending > 0 ? '+' : ''}${pending}`
      },
      {
        title: 'Total Bookings',
        value: total,
        iconKey: 'Flight',
        color: 'info',
        trend: `${total > 0 ? '+' : ''}${total}`
      },
      {
        title: 'Completed',
        value: completed,
        iconKey: 'CheckCircle',
        color: 'success',
        trend: `${completed > 0 ? '+' : ''}${completed}`
      }
    ];
  }

  // Default stats
  return [
    {
      title: 'Total Requests',
      value: total,
      iconKey: 'Flight',
      color: 'primary',
      trend: `${total > 0 ? '+' : ''}${total}`
    },
    {
      title: 'Pending',
      value: pending,
      iconKey: 'PendingActions',
      color: 'warning',
      trend: `${pending > 0 ? '+' : ''}${pending}`
    },
    {
      title: 'Approved',
      value: approved,
      iconKey: 'CheckCircle',
      color: 'success',
      trend: `${approved > 0 ? '+' : ''}${approved}`
    },
    {
      title: 'Rejected',
      value: rejected,
      iconKey: 'Cancel',
      color: 'error',
      trend: `${rejected > 0 ? '-' : ''}${rejected}`
    }
  ];
};

// ============================================
// MOCK DATA FUNCTIONS (Kept for compatibility)
// ============================================

/**
 * Get mock dashboard stats based on role
 * @param {string} role - User role
 * @returns {Array} - Mock stats
 */
const getMockStats = (role) => {
  const commonStats = [
    {
      title: 'Total Requests',
      value: 24,
      iconKey: 'Flight',
      color: 'primary',
      trend: '+12%'
    },
    {
      title: 'Pending Approvals',
      value: 5,
      iconKey: 'PendingActions',
      color: 'warning',
      trend: '+2'
    },
    {
      title: 'Approved',
      value: 15,
      iconKey: 'CheckCircle',
      color: 'success',
      trend: '+8%'
    },
    {
      title: 'Rejected',
      value: 4,
      iconKey: 'Cancel',
      color: 'error',
      trend: '-2'
    }
  ];

  if (role === 'MANAGER' || role === 'AVP' || role === 'SVP' || role === 'CHRO') {
    return [
      {
        title: 'Team Requests',
        value: 18,
        iconKey: 'People',
        color: 'primary',
        trend: '+5'
      },
      ...commonStats
    ];
  }

  if (role === 'TRAVEL_DESK' || role === 'ADMIN') {
    return [
      {
        title: 'Pending Processing',
        value: 12,
        iconKey: 'PendingActions',
        color: 'warning',
        trend: '+3'
      },
      {
        title: 'Total Bookings',
        value: 45,
        iconKey: 'Flight',
        color: 'info',
        trend: '+15%'
      },
      {
        title: 'Completed',
        value: 33,
        iconKey: 'CheckCircle',
        color: 'success',
        trend: '+10'
      }
    ];
  }

  if (role === 'FINANCE') {
    return [
      {
        title: 'Pending Reimbursements',
        value: 8,
        iconKey: 'AttachMoney',
        color: 'warning',
        trend: '+2'
      },
      {
        title: 'Total Amount',
        value: '₹2,45,000',
        iconKey: 'AttachMoney',
        color: 'success',
        trend: '+18%'
      },
      ...commonStats.slice(2)
    ];
  }

  return commonStats;
};

/**
 * Get mock pending approvals
 * @returns {Array} - Mock approvals
 */
const getMockPendingApprovals = () => {
  return [
    {
      id: 'req-001',
      requestNumber: 'TR-2025-001',
      employeeName: 'John Doe',
      destination: 'New York, USA',
      departureDate: '2025-12-15',
      returnDate: '2025-12-20',
      estimatedCost: 150000,
      purpose: 'Client meeting and product demo',
      status: 'MANAGER_REVIEW',
      priority: 'HIGH',
      submittedAt: '2025-11-25T10:30:00Z'
    },
    {
      id: 'req-002',
      requestNumber: 'TR-2025-002',
      employeeName: 'Jane Smith',
      destination: 'London, UK',
      departureDate: '2025-12-10',
      returnDate: '2025-12-15',
      estimatedCost: 180000,
      purpose: 'Technical conference attendance',
      status: 'MANAGER_REVIEW',
      priority: 'MEDIUM',
      submittedAt: '2025-11-24T14:15:00Z'
    },
    {
      id: 'req-003',
      requestNumber: 'TR-2025-003',
      employeeName: 'Mike Johnson',
      destination: 'Singapore',
      departureDate: '2025-12-08',
      returnDate: '2025-12-12',
      estimatedCost: 120000,
      purpose: 'Partner meeting',
      status: 'AVP_REVIEW',
      priority: 'MEDIUM',
      submittedAt: '2025-11-23T09:00:00Z'
    },
    {
      id: 'req-004',
      requestNumber: 'TR-2025-004',
      employeeName: 'Sarah Williams',
      destination: 'Dubai, UAE',
      departureDate: '2025-12-18',
      returnDate: '2025-12-22',
      estimatedCost: 95000,
      purpose: 'Training program',
      status: 'MANAGER_REVIEW',
      priority: 'LOW',
      submittedAt: '2025-11-26T11:45:00Z'
    },
    {
      id: 'req-005',
      requestNumber: 'TR-2025-005',
      employeeName: 'Robert Brown',
      destination: 'Tokyo, Japan',
      departureDate: '2025-12-20',
      returnDate: '2025-12-25',
      estimatedCost: 200000,
      purpose: 'Strategic planning meeting',
      status: 'SVP_REVIEW',
      priority: 'HIGH',
      submittedAt: '2025-11-22T16:20:00Z'
    }
  ];
};

/**
 * Get mock pending requests for travel desk
 * @returns {Array} - Mock requests
 */
const getMockPendingRequests = () => {
  return [
    {
      id: 'req-006',
      requestNumber: 'TR-2025-006',
      employeeName: 'Alice Cooper',
      destination: 'Paris, France',
      departureDate: '2025-12-12',
      returnDate: '2025-12-16',
      estimatedCost: 165000,
      purpose: 'Business development',
      status: 'APPROVED',
      priority: 'HIGH',
      approvedAt: '2025-11-27T10:00:00Z',
      needsBooking: true
    },
    {
      id: 'req-007',
      requestNumber: 'TR-2025-007',
      employeeName: 'David Lee',
      destination: 'Sydney, Australia',
      departureDate: '2025-12-14',
      returnDate: '2025-12-19',
      estimatedCost: 220000,
      purpose: 'Regional conference',
      status: 'APPROVED',
      priority: 'MEDIUM',
      approvedAt: '2025-11-26T15:30:00Z',
      needsBooking: true
    },
    {
      id: 'req-008',
      requestNumber: 'TR-2025-008',
      employeeName: 'Emma Watson',
      destination: 'Berlin, Germany',
      departureDate: '2025-12-09',
      returnDate: '2025-12-13',
      estimatedCost: 140000,
      purpose: 'Technical workshop',
      status: 'BOOKING_IN_PROGRESS',
      priority: 'HIGH',
      approvedAt: '2025-11-25T09:15:00Z',
      needsBooking: false
    }
  ];
};

export default dashboardService;
