// create user model with the following fields: id, username, ref_number, mobile_number, is_engineer, referred_by
export interface User {
  id: string;
  username: string;
  ref_number: string;
  mobile_number: string;
  is_engineer: boolean;
  referred_by: string;
}
