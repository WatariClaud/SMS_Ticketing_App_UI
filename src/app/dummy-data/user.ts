import { User } from "../models/User"
export const users: User[] = [
  {
    id: 1,
    name: "Claud Watari",
    ref_number: "00000000000",
    mobile_number: "+254705724562",
    is_engineer: false,
    referred_by: "",
    email: "",
    password: "",
    is_staff: false,
    is_active: true,
    date_joined: new Date(),
    role: "",
    teller_counter_name: ""
  },
  {
    id: 2,
    name: "Gift Mwaiseghe",
    ref_number: "1111111111",
    mobile_number: "+254712860997",
    is_engineer: false,
    referred_by: "",
    email: "",
    password: "",
    is_staff: false,
    is_active: true,
    date_joined: new Date(),
    role: "",
    teller_counter_name: ""
  },
]