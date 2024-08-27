const baseUrl = 'https://customer-ticketing-be.onrender.com';

/**
 GET    /user/all-users/        user_all-users_list
POST   /user/api/token/        user_api_token_create
POST   /user/api/token/refresh/ user_api_token_refresh_create
POST   /user/login/            user_login_create
POST   /user/logout/           user_logout_create
POST   /user/new-station/      user_new-station_create
POST   /user/register/         user_register_create
GET    /user/stations/         user_stations_list
GET    /user/user/             user_user_list

 */

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
    activityCompleted: `${baseUrl}/service/activity-completed`,
    activityInProgress: `${baseUrl}/service/activity-in-progress`,
  },
  stations: {
    allStations: `${baseUrl}/user/stations`,
    newStation: `${baseUrl}/user/new-station`,
  },

};
