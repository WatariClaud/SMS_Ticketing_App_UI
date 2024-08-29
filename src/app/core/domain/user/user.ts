export enum Role {
  ADMIN = 'Admin',
  TELLER = 'Teller',
  SECURITY = 'Security',
}

export enum RoleLower {
  ADMIN = 'admin',
  TELLER = 'teller',
  SECURITY = 'security',
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}
