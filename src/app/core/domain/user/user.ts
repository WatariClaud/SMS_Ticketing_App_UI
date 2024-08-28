export enum Role {
  ADMIN = 'Admin',
  TELLER = 'Teller',
  SECURITY = 'Security',
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}
