import { Component, Input, EventEmitter, Output } from '@angular/core';
import { datosModal } from '../../../interfaces/modal.interfaces';
import { datosEliminar } from '../../../interfaces/productos.interfaces';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: []
})
export class ModalEliminarComponent{

  @Input() datosModal! : datosModal;
  @Input() descripcion : string = '';
  @Output() clickElimina : EventEmitter<any> = new EventEmitter();

  id: number = 0;
  constructor() { }

  aceptar(id: number){
    this.clickElimina.emit(id);
  }

  abrirConfirmacion(datosEliminar: datosEliminar){
    this.id = datosEliminar.id;
    this.descripcion = datosEliminar.nombre;
    document.getElementById(this.datosModal.nombre)?.click();
  }
}
