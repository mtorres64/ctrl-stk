import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudLogin, RespuestaLogin } from '../interfaces/login.interfaces';

@Injectable({
    providedIn: 'root'
  })

export class LoginServices{

    constructor( private http: HttpClient ) { 
    }

    login( solicitud: SolicitudLogin ): Observable<RespuestaLogin[]>{
      const headers = { 'content-type': 'application/json'}  
      const body = JSON.stringify(solicitud);
      return this.http.post<RespuestaLogin[]>('http://localhost:4000/api/login',body,{'headers':headers})
    }

}