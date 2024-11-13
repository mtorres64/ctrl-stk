import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/pages/login/login.component';
import { VentasComponent } from './modules/pages/ventas/ventas.component';
import { ProductosComponent } from './modules/pages/productos/productos.component';
import { ConfiguracionComponent } from './modules/pages/configuracion/configuracion.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
      path: 'ventas',
      component: VentasComponent
  },
  {
      path: 'productos',
      component: ProductosComponent
  },
  {
      path: 'configuracion',
      component: ConfiguracionComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
