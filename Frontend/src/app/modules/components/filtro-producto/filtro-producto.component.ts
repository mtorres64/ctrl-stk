import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FiltrosService } from 'src/app/services/filtros.services';
import { CategoriaProducto, DatosFiltroProducto } from '../../../interfaces/fitros.interfeces';

@Component({
  selector: 'app-filtro-producto',
  templateUrl: './filtro-producto.component.html',
  styleUrls: []
})
export class FiltroProductoComponent {
  filtroService: FiltrosService;
  
  @Output() getarticulos: EventEmitter<DatosFiltroProducto> = new EventEmitter();

  @Input() filtro : string = "";
  @Input() estado : number = 0;
  @Input() categoria : number = 0;
  @Input() orden : number = 1;
  @Input() categorias! : CategoriaProducto[];

  DatosFiltroProducto! : DatosFiltroProducto;

  constructor(
      private filtrosService: FiltrosService
  ){
    this.filtroService = filtrosService;
    this.getCategorias();
   }

  limpiarFiltros(){
    this.filtro = "";
    this.estado = 0;
    this.categoria = 0;
    this.orden = 1;
    this.trae_articulos();
  }

  trae_articulos(){
    this.DatosFiltroProducto = {
      filtro : this.filtro,
      estado : this.estado,
      categoria : this.categoria,
      orden : this.orden,
      pagina : 1
    };
    this.getarticulos.emit (this.DatosFiltroProducto)
  }

  getCategorias(){
    this.filtrosService.getCategorias()
    .subscribe( 
      (resp) => {
          this.categorias = [{
            cod_categoria: 0,
            categoria:'TODAS'
          },...resp];  
      },
      (err) =>{
        
      });
  }

}
