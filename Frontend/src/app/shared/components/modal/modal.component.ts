import { Component, EventEmitter, Input, Output } from '@angular/core';
import { datosModal } from '../../../interfaces/modal.interfaces';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: []
})
export class ModalComponent{

  @Input() datosModal! : datosModal
  @Input() acepta : boolean = false;
  @Output() clickAcepta : EventEmitter<datosModal> = new EventEmitter();

  constructor() { }

  aceptar(){
    this.clickAcepta.emit(this.datosModal);
  }
}
