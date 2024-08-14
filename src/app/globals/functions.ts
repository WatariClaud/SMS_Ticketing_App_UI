import { jwtDecode } from 'jwt-decode';

// dummy use fake guards list
import guards_enrolled from '../dummy-data/guards_enrolled';

const signingKey = 'f8hA3LzT1kYv5DpX9sB2UjM7gQnW6xCe';

export const signToken = (token: string) => {
  // return jwt.sign(token, signingKey);
  return true;
}

export const verifyToken = (token: string) => {
  try {
    // const decoded = jwtDecode(token);
    // Convert the token to an integer
    const tokenId = parseInt(token, 10);

    const exists = guards_enrolled.some(guard => guard.id === tokenId);

    return exists;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

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

export const showNotification = (message: string, type: 'success' | 'error') => {
  return { message, type };
}

