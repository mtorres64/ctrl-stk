export interface CategoriaProducto{
    cod_categoria               : number;
    categoria                   : string;
}

export interface DatosFiltroProducto{
    filtro                      : string;
    estado                      : number;
    categoria                   : number;
    orden                       : number;
}