import { PaginacionComponent } from '../modules/components/paginacion/paginacion.component';
export interface CategoriaProducto{
    cod_categoria               : number;
    categoria                   : string;
}

export interface MarcaProducto{
    cod_marca                   : number;
    marca                       : string;
}

export interface DatosFiltroProducto{
    filtro                      : string;
    estado                      : number;
    categoria                   : number;
    orden                       : number;
    pagina                      : number;
}