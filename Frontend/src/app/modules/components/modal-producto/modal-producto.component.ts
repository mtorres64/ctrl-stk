import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { productoItem } from '../../../interfaces/productos.interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductosServices } from '../../../services/productos.services';
import { FiltrosService } from '../../../services/filtros.services';
import { CategoriaProducto, MarcaProducto, DatosFiltroProducto } from '../../../interfaces/fitros.interfeces';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: []
})
export class ModalProductoComponent{

  @ViewChild('fileInput') myFileInput!: ElementRef;

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
      estado : 'A',      
      fecha_alta : "", 
      foto : "",  
      id_usuario : 0  
  };

  fotoPrevia! : string;
  archivoFoto : any;

  @Input() categorias! : CategoriaProducto[];
  @Input() marcas! : MarcaProducto[];
  @Output() emiteCambio : EventEmitter<DatosFiltroProducto> = new EventEmitter();
  @Input() datosFiltro!: DatosFiltroProducto;

  spinner1 = 'sp1';

  constructor( 
    private ProductosServices: ProductosServices,
    private spinner: NgxSpinnerService,
    private filtrosService: FiltrosService,
    private sanitizer: DomSanitizer ) 
  { 
    this.getCategorias();
    this.getMarcas();
  }

  validar_articulo(){

  }

  buscar_articulo(){

  }

  seleccionarArchivo(){
    document.getElementById("archivo")?.click(); 
  }

  aceptar(){ 
    this.spinner.show('sp1');

    

    this.ProductosServices.putProducto(this.producto)
      .subscribe( respuesta => {
        this.emiteCambio.emit(this.datosFiltro);
        document.getElementById("modalProducto")?.click();  
        this.spinner.hide('sp1');
      })
  }

  cancelar(){
    this.myFileInput.nativeElement.value = '';
  }

  trae_productoModal(idProducto: number){
    
    if(idProducto == 0){
      this.producto = {
        id_articulo : 0,  
        codigo_barra : "",
        articulo : "",     
        id_marca : 0,     
        id_categoria : 0, 
        id_unidad : 0,    
        costo : 0,        
        precio : 0,       
        stock : 0,  
        estado : 'A',       
        fecha_alta : "",   
        foto : "",
        id_usuario : 0   
      };

      this.getCategorias();
      this.getMarcas();

      document.getElementById("modalProducto")?.click();  
    }
    else{
    this.spinner.show('sp1');
    this.ProductosServices.getProducto(idProducto)
      .subscribe( respuesta => {
        this.producto = respuesta[0];
        this.fotoPrevia = respuesta[0].foto;
        this.spinner.hide('sp1');
        document.getElementById("modalProducto")?.click();
      })
    }
  }

  up(){
    this.producto.stock += 1; 
  }

  down(){
    this.producto.stock -= 1; 
  }

  up2(){
    this.producto.costo += 1; 
  }

  down2(){
    this.producto.costo -= 1; 
  }

  up3(){
    this.producto.precio += 1; 
  }

  down3(){
    this.producto.precio -= 1; 
  }

  getCategorias(){
    this.filtrosService.getCategorias()
    .subscribe( 
      (resp) => {
          this.categorias = [{
            cod_categoria: 0,
            categoria:'SELECCIONE'
          },...resp];  
      },
      (err) =>{
        
      });
  }

  getMarcas(){
    this.filtrosService.getMarcas()
    .subscribe( 
      (resp) => {
          this.marcas = [{
            cod_marca: 0,
            marca:'SELECCIONE'
          },...resp];  
      },
      (err) =>{
        
      });
  }

  tomarImagen( evento : any): any{
    this.archivoFoto = evento.target.files[0];
    this.extraerBase64(this.archivoFoto).then((imagen: any) => {
      this.fotoPrevia  = imagen.base;
    })
  }

  extraerBase64 = async ($event: any) => new Promise((resolve,reject)=>{
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        })
      };
      reader.onerror = error =>{
        resolve({
          base: null
        })
      }
    }
    catch{

    }
  })

}
