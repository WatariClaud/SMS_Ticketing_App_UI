import { Observable, from, map, catchError, of } from "rxjs";

export const sendRequest = (data: any, url: string, method: string): Observable<any> => {
  // Determine whether to include a body based on the method
   const fetchOptions: RequestInit = {
     method,
     headers: {
       'Content-Type': 'application/json'
     }
   };
 
   if (method !== 'GET') {
     fetchOptions.body = JSON.stringify(data);
   }

   // using native fetch API here for quick debug class constructor
   return from(
     fetch(url, fetchOptions)
       .then(response => {
         if (!response.ok) {
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