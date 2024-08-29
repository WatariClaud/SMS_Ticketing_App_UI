import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Station } from "./station";
import { API_ENDPOINTS } from "../../constants/api.constants";

@Injectable({
  providedIn: 'root'
})
export class StationRepository {
  constructor(
    private http: HttpClient
  ) { }

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(
      API_ENDPOINTS.stations.allStations
    ).pipe(
      map((stations: Station[]) => {
        return stations
      })
    );
  }
}
