import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MarcaProducto } from 'src/app/interfaces/fitros.interfeces';

@Component({
  selector: 'app-modal-marca',
  templateUrl: './modal-marca.component.html',
  styleUrls: ['./modal-marca.component.css']
})
export class ModalMarcaComponent {

  marca : MarcaProducto = {
    cod_marca: 0,
    marca: ""
  };

  constructor(
  ) 
  { }

  abrirMarca(marca: MarcaProducto){

    console.log(marca);

    if (marca.cod_marca == 0){
      this.marca = {
        cod_marca: 0,
        marca: ""
      };
    }
    else {
      this.marca = marca;
    }
  }
}
