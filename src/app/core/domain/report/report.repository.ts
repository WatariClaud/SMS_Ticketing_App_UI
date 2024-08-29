import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { API_ENDPOINTS } from "../../constants/api.constants";

@Injectable({
  providedIn: 'root'
})
export class ReportRepository {
  constructor(
    private http: HttpClient
  ) { }

  getReport(): Observable<Report> {
    return this.http.get<Report>(
      `${API_ENDPOINTS.service.allVisitReports}`
    ).pipe(
      map((response: Report) => {
        return response;
      })
    );
  }
}

