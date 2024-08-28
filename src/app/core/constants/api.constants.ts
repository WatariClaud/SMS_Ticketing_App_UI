const baseUrl = 'https://customer-ticketing-be.onrender.com';

export const API_ENDPOINTS = {
  user: {
    login: `${baseUrl}/user/login`,
    logout: `${baseUrl}/user/logout`,
    allUsers: `${baseUrl}/user/all-users`,
    register: `${baseUrl}/user/register`,
  },
  service: {
    cancelledVisits: `${baseUrl}/service/cancelled-visits`,
    createCustomerVisit: `${baseUrl}/service/create-customer-visit`,
    createRefNo: `${baseUrl}/service/create-ref_no`,
    feedbackStats: `${baseUrl}/service/feedback-stats`,
    pendingActivities: `${baseUrl}/service/pending-activities`,
    pendingVisits: `${baseUrl}/service/pending-visits`,
    activityCancelled: `${baseUrl}/service/activity-cancelled`,
    postActivityCompleted: `${baseUrl}/service/activity-completed`,
    postActivityInProgress: `${baseUrl}/service/activity-in-progress`,
    allVisitReports: `${baseUrl}/service/all-visits-report`,
  },
  stations: {
    allStations: `${baseUrl}/user/stations`,
    newStation: `${baseUrl}/user/new-station`,
  },


};
