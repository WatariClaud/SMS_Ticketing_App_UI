import { Observable, from, map, catchError, of } from "rxjs";
import { SessionStorageService } from "../../session/session-storage.service";
import { CookieService } from 'ngx-cookie-service';

export const sendRequest = (data: any, url: string, method: string, token: string): Observable<any> => {
  // Determine whether to include a body based on the method
  const fetchOptions: RequestInit = {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  if (method !== 'GET') {
    fetchOptions.body = JSON.stringify(data);
  }
  if (method === 'GET') {
    (fetchOptions.headers as Headers).set('Authorization', `Bearer ${token}`);
  }

   // using native fetch API here for quick debug class constructor
   return from(
     fetch(url, fetchOptions)
       .then(response => {
         if (!response.ok) {
          console.log({response})
           throw new Error('Network response was not ok');
         }
         return response.json();
       })
       .catch(error => {
         console.error('Error occured:', error.message);
         return null;
       })
   ).pipe(
     map(response => response),
     catchError(error => {
       console.error('Error occured:', error.message);
       return of(null);
     })
  );
}
