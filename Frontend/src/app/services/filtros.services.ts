import { Injectable } from '@angular/core';
import { CategoriaProducto, MarcaProducto } from '../interfaces/fitros.interfeces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FiltrosService{

    public categorias : CategoriaProducto[] = [{
        cod_categoria: 0,
        categoria:'cargando...'
      }];

    get Categorias(){
        return [...this.categorias];
      }
    
    constructor(public http: HttpClient) { 

    }

    getCategorias(): Observable<CategoriaProducto[]>{
      const headers = { 'content-type': 'application/json'}  
      return this.http.post<CategoriaProducto[]>('http://localhost:4000/api/categorias',{'headers':headers})
    }

    getMarcas(): Observable<MarcaProducto[]>{
      const headers = { 'content-type': 'application/json'}  
      return this.http.post<MarcaProducto[]>('http://localhost:4000/api/marcas',{'headers':headers})
    }
     
}