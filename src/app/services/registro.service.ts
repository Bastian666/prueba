import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../modelos/login';
import { Usuario } from '../modelos/usuario';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(
    private http: HttpClient
  ) { }

    public ingreso(formulario: Login):Observable<any>{
      return this.http.post<any>('https://dummyjson.com/users/add', formulario, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    public registro(formulario: Usuario):Observable<any>{
      return this.http.post<any>('https://dummyjson.com/users/add', formulario, {
        headers: {
          'Content-Type': 'application/json'
        }
    })
  }

    token(){
      return sessionStorage.getItem('token')!=null;
    }



}
