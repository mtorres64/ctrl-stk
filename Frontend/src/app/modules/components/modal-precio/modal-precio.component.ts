import { Component, Input, Output, EventEmitter } from '@angular/core';
import { productoItem, cambioStock } from '../../../interfaces/productos.interfaces';
import { ProductosServices } from '../../../services/productos.services';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatosFiltroProducto } from '../../../interfaces/fitros.interfeces';

@Component({
  selector: 'app-modal-precio',
  templateUrl: './modal-precio.component.html',
  styleUrls: []
})
export class ModalPrecioComponent {
  spinner1 = 'sp1';

  @Input() datosFiltro!: DatosFiltroProducto;
  @Output() emiteCambio : EventEmitter<DatosFiltroProducto> = new EventEmitter();
  @Output() emiteAltaMarca : EventEmitter<number> = new EventEmitter();

  producto: productoItem = {
    id_articulo : 0,  
    codigo_barra : "",
    articulo : "",     
    id_marca : 0,     
    id_categoria : 0, 
    id_unidad : 0,    
    costo : 0,        
    precio : 0,       
    stock : 0,      
    estado : "",  
    fecha_alta : "",   
    foto : "", 
    id_usuario : 0  
};

  constructor(
    private ProductosServices: ProductosServices,
    private spinner: NgxSpinnerService
  ) { }

  validar_articulo(){ }

  aceptar(){ 
    this.spinner.show('sp1');
    this.ProductosServices.putProducto(this.producto)
      .subscribe( respuesta => {
        this.emiteCambio.emit(this.datosFiltro);
        document.getElementById("modalPrecio")?.click();  
        this.spinner.hide('sp1');
      })
  }

  cambioPrecio(cambioStock: cambioStock){
    document.getElementById("modalPrecio")?.click();
    this.spinner.show('sp1');
    this.ProductosServices.getProducto(cambioStock.idProducto)
      .subscribe( respuesta => {
        this.producto = respuesta[0];
        this.spinner.hide('sp1');
      })
  }

  up(){
    this.producto.costo += 1; 
  }

  down(){
    this.producto.costo -= 1; 
  }

  up2(){
    this.producto.precio += 1; 
  }

  down2(){
    this.producto.precio -= 1; 
  }

}
