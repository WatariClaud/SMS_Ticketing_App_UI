const baseUrl = `https://customer-ticketing-be.onrender.com`;

// user
export const CREATE_USER = `${baseUrl}/user/register/`;
export const AUTH_USER = `${baseUrl}/user/login/`;
export const GEN_REFRESH_TOKEN = `${baseUrl}/user/api/token/refresh//`;
export const GEN_ACCESS_TOKEN_FROM_REFRESH = `${baseUrl}/user/api/token/`;
export const GET_USER = `${baseUrl}/user/user/`;

// tickets and activities
export const GET_REF_NUMBER = `${baseUrl}/service/create-ref_no/`;
export const CREATE_USER_VISITATION = `${baseUrl}/service/create-customer-visit/`;