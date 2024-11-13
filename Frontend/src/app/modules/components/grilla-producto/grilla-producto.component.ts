import { identifierName } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { productoGrilla, cambioStock, solicitudListaProductos, productosResponse, datosEliminar } from '../../../interfaces/productos.interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductosServices } from '../../../services/productos.services';
import { DatosFiltroProducto } from '../../../interfaces/fitros.interfeces';

@Component({
  selector: 'app-grilla-producto',
  templateUrl: './grilla-producto.component.html',
  styleUrls: ['./grilla-producto.component.css']
})
export class GrillaProductoComponent{

  //@Input() productos: productoGrilla[] =[];
  @Input() totalRows: number = 0;
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() rowsPerPage: number = 0;

  @Output() emiteProducto : EventEmitter<number> = new EventEmitter();
  @Output() emiteCambioStock : EventEmitter<cambioStock> = new EventEmitter();
  @Output() emiteCambioPrecio : EventEmitter<cambioStock> = new EventEmitter();
  @Output() emiteCambio : EventEmitter<DatosFiltroProducto> = new EventEmitter();
  @Output() emiteProductos : EventEmitter<productosResponse> = new EventEmitter();
  @Output() emiteEliminaProducto : EventEmitter<datosEliminar> = new EventEmitter();

  p : number = 1;

  cambioStock: cambioStock={
    tipo: 0,
    idProducto: 0
  }

  datosEliminar: datosEliminar={
    id: 0,
    nombre: ''
  }

  solicitud: solicitudListaProductos={
    pageNumber : 1,
    pageSize   : 20,
    filtro     : {
      filtro   : "",
      estado   : 0,
      categoria: 0,
      orden    : 1,
      pagina   : 1 
    }
  };

  productosResponse: productosResponse = {
    totalRows       :0,
    currentPage     :0,
    totalPages      :0,
    rowsPerPage     :0,
    Rows            :[]
  };
  
  constructor(
    private ProductosServices: ProductosServices,
    private spinner: NgxSpinnerService
  ) {
    this.trae_productos(this.solicitud.filtro);
   }

  agregarProducto(idProducto:number){
    this.emiteProducto.emit(idProducto);
  }

  getClaseCSS( estado : string ){
    return (estado === 'Activo') ? 'activo' : 'inactivo';
  }

  abrirCambioStock(tipo: number,producto: number){
    this.cambioStock.tipo = tipo;
    this.cambioStock.idProducto = producto;
    this.emiteCambioStock.emit(this.cambioStock);
  }

  abrirCambioPrecio(tipo: number,producto: number){
    this.cambioStock.tipo = tipo;
    this.cambioStock.idProducto = producto;
    this.emiteCambioPrecio.emit(this.cambioStock);
  }

  abrirConfirmacion(idproducto: number,nombre: string){
    this.datosEliminar.id = idproducto;
    this.datosEliminar.nombre = nombre;
    this.emiteEliminaProducto.emit(this.datosEliminar);
  }

  activarProducto(idProducto: number){
    this.ProductosServices.activarProducto(idProducto)
      .subscribe( respuesta => {
        this.spinner.hide('sp1');
        this.emiteCambio.emit(this.solicitud.filtro);
      },
      (error) =>{
        this.spinner.hide('sp1');
      });
  }

  desactivarProducto(idProducto: number){
    this.ProductosServices.desactivarProducto(idProducto)
    .subscribe( respuesta => {
      this.spinner.hide('sp1');
      this.emiteCambio.emit(this.solicitud.filtro);
    },
    (error) =>{
      this.spinner.hide('sp1');
    });
  }

  trae_productos(DatosFiltroProducto: DatosFiltroProducto){
    this.spinner.show('sp1');
    
    this.solicitud.pageNumber = DatosFiltroProducto.pagina;

    this.solicitud.filtro = DatosFiltroProducto;

    this.ProductosServices.getProductos(this.solicitud)
      .subscribe( respuesta => {
        this.productosResponse = respuesta;
        this.emiteProductos.emit(this.productosResponse);
        this.spinner.hide('sp1');
      },
      (error) =>{
        this.spinner.hide('sp1');
        //document.getElementById(this.errorModal.nombre)?.click();
      });
  }

}
