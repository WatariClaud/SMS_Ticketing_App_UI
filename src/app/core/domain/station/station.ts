
export interface Station {
  id: number;
  name: string;
  managed_by?: number;
  is_open: boolean;
  is_occupied: boolean;
}