import { DatosFiltroProducto } from './fitros.interfeces';

export interface productoItem{
    id_articulo   : number;
    codigo_barra  : string;
    articulo      : string;
    id_marca      : number;
    id_categoria  : number;
    id_unidad     : number;
    costo         : number;
    precio        : number;
    stock         : number;
    estado        : string;
    fecha_alta    : string;
    foto          : string;
    id_usuario    : number;
}

export interface productoGrilla{
    id            : number;
    articulo      : string;
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

export interface cambioStock{
    tipo            :number;
    idProducto      :number;
}

export interface datosEliminar{
    id              :number;
    nombre          :string;
}
