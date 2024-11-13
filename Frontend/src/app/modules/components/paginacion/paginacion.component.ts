import { Component, EventEmitter, Input, Output } from '@angular/core';
import { productosResponse } from 'src/app/interfaces/productos.interfaces';
import { DatosFiltroProducto } from '../../../interfaces/fitros.interfeces';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styles: [
  ]
})
export class PaginacionComponent {

  @Input() lista! : productosResponse;
  @Input() filtro! : DatosFiltroProducto;

  @Output() paginado : EventEmitter<DatosFiltroProducto> = new EventEmitter();

  constructor() { }

  get desde(){
    return (1 + (this.lista.rowsPerPage * (this.lista.currentPage - 1)));
  }

  get hasta(){
    if(this.lista.currentPage === this.lista.totalPages) return this.lista.totalRows;
    else return (this.desde + this.lista.rowsPerPage - 1);
  }

  getClaseCSS( pagina: number ): string {
    return (pagina === this.lista.currentPage) 
              ? 'page-item active'
              : 'page-item';
  }

  paginar(pagina: number){
    this.filtro.pagina = pagina;
    this.paginado.emit( this.filtro ); 
  }

}
