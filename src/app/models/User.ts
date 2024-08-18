export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  ref_number: string;
  mobile_number: string;
  is_engineer: boolean;
  is_staff: boolean;
  is_active: boolean;
  referred_by: string;
  date_joined: Date;
  role: string;
  teller_counter_name: string;
}
