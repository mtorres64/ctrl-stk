import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoginServices } from '../../../services/login.services';
import { SolicitudLogin } from '../../../interfaces/login.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  spinner1 = 'sp1';

  @Input() usuario : string = "";
  @Input() contrasena : string = "";

  login : SolicitudLogin = {
    usr: "",
    pass: ""
  }

  constructor(
    private spinner: NgxSpinnerService,
    private loginServices: LoginServices,
    public router: Router
  ) { 
  }

  logear(){
    this.spinner.show('sp1');

    this.login = {
      usr: this.usuario,
      pass: this.contrasena
    }

    this.loginServices.login(this.login)
      .subscribe( respuesta => {
  
        if(respuesta.length > 0){
          console.log("logeado con exito");
          this.router.navigate(['/productos']);
        }
        else{
          console.log("acceso denegado");
        }
        this.spinner.hide('sp1');
      },
      (err)=>{
        console.log(err);
        this.spinner.hide('sp1');
      })

  }
}
