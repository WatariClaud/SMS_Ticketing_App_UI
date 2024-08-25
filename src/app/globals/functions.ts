import { jwtDecode } from 'jwt-decode';

interface DecodedJWT {
  iat?: number;
  exp?: number;
  user_id?: string;
  token_type: string;
}

const signingKey = 'f8hA3LzT1kYv5DpX9sB2UjM7gQnW6xCe';

export const signToken = (token: string) => {
  // return jwt.sign(token, signingKey);
  return true;
};

export const verifyToken = (id: string) => {
  try {
    const decoded = jwtDecode<DecodedJWT>(id);
    console.log({ decoded });

    if (!decoded.user_id || decoded.token_type !== 'access') return false;
    return true;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
};

export const formatTimestamp = (isoString: Date) => {
  const date = new Date(isoString);

  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');

  return `${yy}-${mm}-${dd} at ${hh}:${min}:${ss}`;
};

export const parseTimestamp = (timestamp: string): Date => {
  // Example timestamp format: '24-08-2024 at 14:30:00'
  const [datePart, timePart] = timestamp.split(' at ');
  const [day, month, year] = datePart.split('-').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  // Create and return a new Date object
  return new Date(year, month - 1, day, hours, minutes, seconds);
};

export const formatDifference = (
  diff: number
): { hours: number; minutes: number; seconds: number } => {
  const totalSeconds = Math.abs(Math.floor(diff / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
};

export const showNotification = (
  message: string,
  type: 'success' | 'error'
) => {
  return { message, type };
};
