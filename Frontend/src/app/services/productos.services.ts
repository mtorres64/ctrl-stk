import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { solicitudListaProductos, productosResponse, productoItem } from '../interfaces/productos.interfaces';

@Injectable({
    providedIn: 'root'
  })

export class ProductosServices{

    constructor( private http: HttpClient ) { 
    }

    getProductos( solicitud: solicitudListaProductos ): Observable<productosResponse>{
      const headers = { 'content-type': 'application/json'}  
      const body = JSON.stringify(solicitud);
      return this.http.post<productosResponse>('http://localhost:4000/api/productos',body,{'headers':headers})
    }

    getProducto( producto: number ): Observable<productoItem[]>{
      const headers = { 'content-type': 'application/json'}  
      return this.http.get<productoItem[]>('http://localhost:4000/api/productos/' + producto,{'headers':headers})
    }

    activarProducto( idproducto: number ): Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      return this.http.put<any>('http://localhost:4000/api/productos/activar/' + idproducto,{'headers':headers})
    }

    desactivarProducto( idproducto: number ): Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      return this.http.put<any>('http://localhost:4000/api/productos/desactivar/' + idproducto,{'headers':headers})
    }

    putProducto( producto: productoItem ): Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      const body = JSON.stringify(producto);
      return this.http.put<any>('http://localhost:4000/api/productos/'+ producto.id_articulo, body,{'headers':headers})
    }
    
    delProducto( idproducto: number ): Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      return this.http.put<any>('http://localhost:4000/api/productos/'+ idproducto,{'headers':headers})
    }

}