import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { DatosFiltroProducto } from '../../../interfaces/fitros.interfeces';
import { productosResponse, solicitudListaProductos, cambioStock, productoItem, productoGrilla, datosEliminar } from '../../../interfaces/productos.interfaces';
import { ProductosServices } from '../../../services/productos.services';
import { NgxSpinnerService } from 'ngx-spinner';
import { datosModal } from '../../../interfaces/modal.interfaces';
import { ModalProductoComponent } from '../../components/modal-producto/modal-producto.component';
import { ModalStockComponent } from '../../components/modal-stock/modal-stock.component';
import { ModalPrecioComponent } from '../../components/modal-precio/modal-precio.component';
import { GrillaProductoComponent } from '../../components/grilla-producto/grilla-producto.component';
import { ModalEliminarComponent } from '../../../shared/components/modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: []
})
export class ProductosComponent{
  spinner1 = 'sp1';
  descripcion : string = '';

  @ViewChild(ModalProductoComponent)
    private modalProductoComponent!: ModalProductoComponent;
    trae_producto(idProducto: number) {
       this.modalProductoComponent.trae_productoModal(idProducto);
    }
  @ViewChild(ModalStockComponent)
    private ModalStockComponent!: ModalStockComponent;
    cambioStock(idProducto: cambioStock) {
       this.ModalStockComponent.cambioStock(idProducto);
    }
  @ViewChild(ModalEliminarComponent)
    private ModalEliminarComponent!: ModalEliminarComponent;
    abrirConfirmacion(datosEliminar: datosEliminar) {
       this.ModalEliminarComponent.abrirConfirmacion(datosEliminar);
    }
  @ViewChild(ModalPrecioComponent)
    private ModalPrecioComponent!: ModalPrecioComponent;
    cambioPrecio(idProducto: cambioStock) {
       this.ModalPrecioComponent.cambioPrecio(idProducto);
    }
  @ViewChild(GrillaProductoComponent)
    private GrillaProductoComponent!: GrillaProductoComponent;
    trae_productos(datosFiltro: DatosFiltroProducto) {
       this.GrillaProductoComponent.trae_productos(datosFiltro);
       this.solicitud.filtro = datosFiltro;
    }  

    productosResponse: productosResponse = {
      totalRows       :0,
      currentPage     :0,
      totalPages      :0,
      rowsPerPage     :0,
      Rows            :[]
    };

  errorModal: datosModal={
    nombre  : "modalError",
    header  : "Error al traer los datos",
    body    : "Se ha producido un error al momento de traer la lista de productos. Por favor intente nuevamente."
  };

  eliminarModal: datosModal={
    nombre  : "eliminar",
    header  : "Eliminar producto",
    body    : "¿Esta seguro que desea aliminar el producto?"
  };

  idEliminar: number = 0;

  idProducto :number = 0;

  datosCambioStock :cambioStock ={
    tipo : 0,
    idProducto : 0
  };

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

  constructor(
    private ProductosServices: ProductosServices,
    private spinner: NgxSpinnerService
  ) 
  { }

  bindProductosPaginado(productosResponse: productosResponse){
    this.productosResponse = productosResponse;
  }

  eliminar(id:any){
    this.spinner.show('sp1');
    this.ProductosServices.delProducto(id)
      .subscribe( respuesta => {
        document.getElementById(this.eliminarModal.nombre)?.click();
        this.trae_productos(this.solicitud.filtro);  
        this.spinner.hide('sp1');
      })
  }


}
