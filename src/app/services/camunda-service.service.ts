import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamundaServiceService {

  constructor(private http: HttpClient) {}

  startCamundaProcess(): Observable<any> { // Utilisez le type correct pour la réponse attendue
    const springBootUrl = 'http://localhost:8081/api/start';
    return this.http.post(springBootUrl, {});
  }
}
