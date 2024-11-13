import { DatosFiltroProducto } from './filtros.interfaces';
export interface productoGrilla{
    id            : number;
    nombre        : string;
    marca         : string;
    categoria     : string;
    stock         : number;
    precio        : number;
    estado        : string;
    opciones      : string;
}

export interface solicitudListaProductos{
    pageNumber    : number;
    pageSize      : number;
    filtro        : DatosFiltroProducto;
}

export interface productosResponse{
    totalRows       :number;
    currentPage     :number;
    totalPages      :number;
    rowsPerPage     :number;
    Rows            :productoGrilla[];
}