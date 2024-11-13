import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { ProductosComponent } from './modules/pages/productos/productos.component';
import { VentasComponent } from './modules/pages/ventas/ventas.component';
import { ConfiguracionComponent } from './modules/pages/configuracion/configuracion.component';
import { FiltroProductoComponent } from './modules/components/filtro-producto/filtro-producto.component';
import { GrillaProductoComponent } from './modules/components/grilla-producto/grilla-producto.component';
import { PaginacionComponent } from './modules/components/paginacion/paginacion.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ModalProductoComponent } from './modules/components/modal-producto/modal-producto.component';
import { ModalStockComponent } from './modules/components/modal-stock/modal-stock.component';
import { ModalPrecioComponent } from './modules/components/modal-precio/modal-precio.component';
import { ModalEliminarComponent } from './shared/components/modal-eliminar/modal-eliminar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProductosComponent,
    VentasComponent,
    ConfiguracionComponent,
    FiltroProductoComponent,
    GrillaProductoComponent,
    PaginacionComponent,
    ModalComponent,
    ModalProductoComponent,
    ModalStockComponent,
    ModalPrecioComponent,
    ModalEliminarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
