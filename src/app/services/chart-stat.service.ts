import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChartStatService {


  constructor(private http: HttpClient) { }

  getPopulationStats() {
    return this.http.get<any>('http://localhost:8282/collaborators/population-stats');
  }

}
