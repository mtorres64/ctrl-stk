export interface SolicitudLogin{
    usr         : string;
    pass        : string;
}

export interface RespuestaLogin{
    id          : number;
    usr         : string;
    pass        : string;
    perfil      : number;
    fcreacion   : Date;
}