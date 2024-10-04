const baseUrl = `https://customer-ticketing-be.onrender.com`;

// user
export const CREATE_USER = `${baseUrl}/user/register/`;
export const AUTH_USER = `${baseUrl}/user/login/`;
export const GEN_REFRESH_TOKEN = `${baseUrl}/user/api/token/refresh//`;
export const GEN_ACCESS_TOKEN_FROM_REFRESH = `${baseUrl}/user/api/token/`;
export const GET_USER = `${baseUrl}/user/user/`;
export const GET_USERS = `${baseUrl}/user/all-users/`;
export const CREATE_STATION = `${baseUrl}/user/new-station/`;
export const GET_STATIONS = `${baseUrl}/user/stations/`;

// tickets and activities
export const GET_REF_NUMBER = `${baseUrl}/service/create-ref_no/`;
export const CREATE_USER_VISITATION = `${baseUrl}/service/create-customer-visit/`;
export const GET_USER_VISITATION_PENDING = `${baseUrl}/service/pending-visits/`;
export const GET_VISITATION_ACTIVITIES_PENDING = `${baseUrl}/service/pending-activities/`;
export const GET_USER_VISITATION_ACTIVITIES = `${baseUrl}/service/visit-activities/`;
export const UPDATE_ACTIVITY_STATUS = `${baseUrl}/service/activity-in-progress/`;
export const COMPLETE_ACTIVITY = `${baseUrl}/service/activity-completed/`;
export const CANCEL_ACTIVITY = `${baseUrl}/service/activity-cancelled/`;
export const GET_ALL_VISIT_DETAILS = `${baseUrl}/service/all-visits-report/`;
