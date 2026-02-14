import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PillService {

  private apiUrl = 'http://localhost:8080/generatePdf-v1';

  constructor(private http: HttpClient) {}

  /**
   * Genera y descarga el PDF del calendario de tomas
   */
  generateCalendarPdf(numberOfDays: number, timesPerDay: number, startDateTime: string): Observable<Blob> {
    // Configuramos los parámetros de la consulta
    const params = new HttpParams()
      .set('numberOfDays', numberOfDays.toString())
      .set('timesPerDay', timesPerDay.toString())
      .set('startDateTime', startDateTime); // Formato ISO: YYYY-MM-DDTHH:mm:ss

    // Es CRUCIAL usar responseType: 'blob' para recibir archivos
    return this.http.get(this.apiUrl, {
      params,
      responseType: 'blob'
    });
  }
  
}
