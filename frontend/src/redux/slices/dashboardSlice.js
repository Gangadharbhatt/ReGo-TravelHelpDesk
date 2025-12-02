import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import apiConfig from '../../config/apiConfig';
import dashboardService from '../../services/dashboardService';

// Inline Mock Data (since JSON files don't exist)
const mockDashboardStats = [
  { title: 'Total Requests', value: 24, iconKey: 'FlightTakeoff', trend: '+12%' },
  { title: 'Pending', value: 5, iconKey: 'PendingActions', trend: '+2' },
  { title: 'Approved', value: 15, iconKey: 'CheckCircle', trend: '+8%' }
];

const mockPendingApprovals = [
  { id: 'req-001', employee: 'John Doe', destination: 'New York', departure: '2025-12-15', status: 'MANAGER_REVIEW' },
  { id: 'req-002', employee: 'Jane Smith', destination: 'London', departure: '2025-12-10', status: 'MANAGER_REVIEW' },
  { id: 'req-003', employee: 'Mike Johnson', destination: 'Singapore', departure: '2025-12-20', status: 'AVP_REVIEW' },
  { id: 'req-004', employee: 'Sarah Williams', destination: 'Dubai', departure: '2025-12-25', status: 'SVP_REVIEW' }
];

const mockEmployeeActiveRequest = {
  id: 'req-001',
  destination: 'New York, USA',
  departure: '2025-12-15',
  return: '2025-12-20',
  status: 'APPROVED',
  steps: [
    { label: 'Submitted', completed: true, active: false },
    { label: 'Manager Approved', completed: true, active: false },
    { label: 'Documents Required', completed: false, active: true },
    { label: 'Booking', completed: false, active: false }
  ],
  documents: [
    { id: 'doc-1', name: 'Passport Front', status: 'PENDING' },
    { id: 'doc-2', name: 'Passport Back', status: 'PENDING' },
    { id: 'doc-3', name: 'Visa Application', status: 'PENDING' }
  ]
};

// Async Thunks
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetch',
  async (_, { getState }) => {
    const { auth } = getState();
    const userRole = auth.user?.role;
    const empId = auth.user?.empId || auth.user?.id;

    if (apiConfig.USE_MOCK_API) {
      // Use dashboardService for mock data
      const stats = await dashboardService.getDashboardStats(userRole, empId);
      const pendingApprovals = await dashboardService.getPendingApprovals(empId);

      return {
        stats: stats || mockDashboardStats,
        pendingApprovals: pendingApprovals || mockPendingApprovals,
        activeRequest: mockEmployeeActiveRequest
      };
    }

    // REAL BACKEND: Fetch data using dashboardService
    const stats = await dashboardService.getDashboardStats(userRole, empId);
    const pendingApprovals = await dashboardService.getPendingApprovals(empId);
    const activeRequest = userRole === 'EMPLOYEE'
      ? await dashboardService.getActiveRequest(empId)
      : null;

    return {
      stats: stats || [],
      pendingApprovals: pendingApprovals || [],
      activeRequest: activeRequest
    };
  }
);

export const fetchTravelDeskData = createAsyncThunk(
  'dashboard/fetchTravelDesk',
  async (_, { getState }) => {
    const { auth } = getState();
    const empId = auth.user?.empId || auth.user?.id;

    if (apiConfig.USE_MOCK_API) {
      const pendingRequests = await dashboardService.getPendingRequests(empId);
      return { pendingRequests: pendingRequests || [] };
    }

    // REAL BACKEND: Fetch pending requests
    const pendingRequests = await dashboardService.getPendingRequests(empId);
    return { pendingRequests: pendingRequests || [] };
  }
);

const initialState = {
  stats: [],
  pendingApprovals: [],
  loading: false,
  error: null,
  activeRequest: null,
  pendingRequests: [], // For Travel Desk
  notifications: [
    { id: 1, message: "New travel request from John Doe", read: false, time: "10 mins ago" },
    { id: 2, message: "Flight booking confirmed for NY", read: false, time: "2 hours ago" },
    { id: 3, message: "Visa application approved", read: true, time: "1 day ago" }
  ],
  approvalHistory: [
    { role: 'MANAGER', name: 'Alice Manager', status: 'APPROVED', comment: 'Approved, proceed.', date: '2025-11-26 10:30 AM' },
    { role: 'AVP', name: 'Bob AVP', status: 'PENDING', comment: '', date: '' }
  ]
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateRequestStatus: (state, action) => {
      const { id, status, stepIndex } = action.payload;
      if (state.activeRequest && state.activeRequest.id === id) {
        state.activeRequest.status = status;
        if (stepIndex !== undefined) {
          state.activeRequest.steps = state.activeRequest.steps.map((step, index) => ({
            ...step,
            completed: index < stepIndex,
            active: index === stepIndex
          }));
        }
      }
      const approvalIndex = state.pendingApprovals.findIndex(r => r.id === id);
      if (approvalIndex !== -1) {
        state.pendingApprovals[approvalIndex].status = status;
      }
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        message: action.payload,
        read: false,
        time: "Just now"
      });
    },
    markNotificationRead: (state, action) => {
      const notif = state.notifications.find(n => n.id === action.payload);
      if (notif) notif.read = true;
    },
    addApprovalHistory: (state, action) => {
      state.approvalHistory.push(action.payload);
    },
    // Travel Desk Actions
    processBooking: (state, action) => {
      const { id, bookingDetails } = action.payload;
      const requestIndex = state.pendingRequests.findIndex(r => r.id === id);
      if (requestIndex !== -1) {
        state.pendingRequests[requestIndex] = {
          ...state.pendingRequests[requestIndex],
          status: 'BOOKING_COMPLETED',
          bookingDetails: bookingDetails
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.pendingApprovals = action.payload.pendingApprovals;
        state.activeRequest = action.payload.activeRequest;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTravelDeskData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTravelDeskData.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingRequests = action.payload.pendingRequests;
      })
      .addCase(fetchTravelDeskData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  updateRequestStatus,
  addNotification,
  markNotificationRead,
  addApprovalHistory,
  processBooking
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
