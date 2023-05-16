import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Jugador } from '../models/jugador';

@Injectable({
  providedIn: 'root'
})
export class CompeticionService {
  URL_API = 'http://localhost:8000/api/jugadores'//Ruta del despliegue del backend
  jugadores: Jugador[];
  constructor(private http: HttpClient) {}
  getCompeticiones(){
    
    return this.http.get<Jugador[]>(this.URL_API)
  }
}
