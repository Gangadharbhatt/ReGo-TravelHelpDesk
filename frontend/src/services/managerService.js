/**
 * Manager Service
 * Handles all manager-specific API calls
 * Delegates to centralized apiService for Mock/Real switching
 */

import api from './apiService';

// Status labels mapping
const TRAVEL_STATUS_LABELS = {
  0: 'Pending',
  1: 'Submitted',
  2: 'Manager Approved',
  3: 'Completed',
  4: 'Rejected',
};

const managerService = {
  /**
   * Get team members reporting to manager
   * delegates to api.getEmployeesByRptId
   */
  getTeam: async (managerId) => {
    console.log('🟢 managerService: Getting team for:', managerId);

    const response = await api.getEmployeesByRptId(managerId);

    if (response.status !== 'Success' || !response.result) {
      console.warn('No team members found');
      return [];
    }

    const team = Array.isArray(response.result) ? response.result : [response.result];

    return team.map(member => ({
      empId: member.empId,
      name: member.name,
      email: member.email
    }));
  },

  /**
   * Get travel requests for team members
   * delegates to api.getTravelDetailByRptId
   */
  getTeamTravel: async (managerId) => {
    console.log('🟢 managerService: Getting team travel for:', managerId);

    const response = await api.getTravelDetailByRptId(managerId);

    if (response.status !== 'Success' || !response.result) {
      console.warn('No team travel data found');
      return [];
    }

    const travels = Array.isArray(response.result) ? response.result : [response.result];

    return travels.map(travel => ({
      id: travel.tId || travel.TID || `${travel.empId}-${travel.country}-${travel.travelStartDate}`,
      travelId: travel.tId || travel.TID, // Explicit travel ID for API calls
      empId: travel.empId,
      country: travel.country,
      city: travel.city,
      destination: `${travel.city}, ${travel.country}`,
      remark: travel.remark,
      purpose: travel.remark,
      suggestedDate: travel.suggestedDate,
      travelStartDate: travel.travelStartDate,
      travelEndDate: travel.travelEndDate,
      departureDate: travel.travelStartDate,
      returnDate: travel.travelEndDate,
      status: travel.status,
      statusLabel: TRAVEL_STATUS_LABELS[travel.status] || 'Unknown',
      rptEmpId: travel.rptEmpId
    }));
  },

  /**
   * Alias for getTeamTravel
   */
  getManagerTravel: async (managerId) => {
    return managerService.getTeamTravel(managerId);
  },

  /**
   * Create new travel request
   * delegates to api.insertTravelDetail
   */
  createTravelRequest: async (travelData) => {
    console.log('🟢 managerService: Creating travel request:', travelData);

    const payload = {
      empId: String(travelData.empId),
      country: travelData.country,
      city: travelData.city,
      remark: travelData.remark || travelData.purpose || '',
      suggestedDate: travelData.suggestedDate || new Date().toISOString(),
      travelStartDate: travelData.travelStartDate || travelData.departureDate,
      travelEndDate: travelData.travelEndDate || travelData.returnDate,
      status: travelData.status || 0,
      rptEmpId: String(travelData.rptEmpId)
    };

    // Note: realApi.js handles wrapping this in an array if needed
    // mockApi.js handles pushing it directly
    const response = await api.insertTravelDetail(payload);

    if (response.status !== 'Success') {
      throw new Error(response.result || 'Failed to create travel request');
    }

    return response.result;
  },

  /**
   * Update travel status
   * delegates to api.updateTravelStatus
   */
  updateTravelStatus: async (travelId, status) => {
    console.log('🟢 managerService: Updating status:', { travelId, status });

    const response = await api.updateTravelStatus(travelId, status);

    if (response.status !== 'Success') {
      throw new Error('Failed to update travel status');
    }

    return response.result;
  },

  /**
   * Approve travel request
   */
  approveTravelRequest: async (travelId) => {
    return managerService.updateTravelStatus(travelId, 2); // Status 2 = Manager Approved
  },

  /**
   * Reject travel request
   */
  rejectTravelRequest: async (travelId) => {
    return managerService.updateTravelStatus(travelId, 4); // Status 4 = Rejected
  }
};

export default managerService;