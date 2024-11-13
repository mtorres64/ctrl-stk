import { getConnection } from "../database/database" ;

//Get login
const getProductos = async(req,res) => {
    try{
        const { pageNumber, pageSize, filtro} = req.body;

        var offset = ((pageNumber-1)*pageSize);

        const connection = await getConnection();

        let orden = '';

        console.log (filtro.orden);

        switch(filtro.orden){
            case '1': orden = 'ORDER BY fecha_alta DESC'; break;
            case '2': orden = 'ORDER BY stock ASC'; break;
            case '3': orden = 'ORDER BY articulo ASC'; break;
        }

        const preSql = "SELECT count(*) as cantidad FROM ( " +
            "SELECT c.id_categoria," +
            "       CASE estado " +
            "            WHEN 'A' THEN 1 " +
            "            WHEN 'I' THEN 2 " +
            "            ELSE 0" +
            "        END AS cod_estado  " +
            "FROM 			    art_articulos a " +
            "        INNER JOIN art_marca b ON (a.id_marca = b.id_marca) " +
            "        INNER JOIN art_categoria c ON (a.id_categoria = c.id_categoria ) " +
            "        INNER JOIN art_cantidad d ON (a.id_articulo = d.id_articulo) " +
            "        INNER JOIN dat_sucursal e ON (e.id_sucursal = d.id_sucursal ) " +
            "        INNER JOIN dat_unidad f ON (f.id_unidad = a.id_unidad) " +
            "WHERE 	(articulo LIKE '%"+ filtro.filtro +"%' OR a.codigo_barra LIKE '%"+ filtro.filtro +"%' OR marca LIKE '%"+ filtro.filtro +"%')"+
        ") AS consulta "+
        "WHERE 	 (0 = "+ filtro.estado +" OR cod_estado = "+ filtro.estado +") "+
        "    AND (0 = "+ filtro.categoria +" OR id_categoria = "+ filtro.categoria +");	";

        const sql = "SELECT * FROM ( " +
            "SELECT  a.id_articulo as id, " +
            "        articulo, " +
            "        marca, " +
            "        c.id_categoria, " +
            "        categoria, " +
            "        cantidad AS stock, " +
            "        ROUND(precio,2) AS precio, " +
            "        CASE estado "+
            "            WHEN 'A' THEN 1 " +
            "            WHEN 'I' THEN 2 " +
            "            ELSE 0" +
            "        END AS cod_estado, " +
            "        CASE estado "+
            "            WHEN 'A' THEN 'Activo' " +
            "            WHEN 'I' THEN 'Inactivo' " +
            "            ELSE 0" +
            "        END AS estado, " +
            "        a.fecha_alta, " +
            "        a.foto " +
            "FROM 			    art_articulos a " +
            "        INNER JOIN art_marca b ON (a.id_marca = b.id_marca) " +
            "        INNER JOIN art_categoria c ON (a.id_categoria = c.id_categoria ) " +
            "        INNER JOIN art_cantidad d ON (a.id_articulo = d.id_articulo) " +
            "        INNER JOIN dat_sucursal e ON (e.id_sucursal = d.id_sucursal ) " +
            "        INNER JOIN dat_unidad f ON (f.id_unidad = a.id_unidad) " +
            "WHERE 	(articulo LIKE '%"+ filtro.filtro +"%' OR a.codigo_barra LIKE '%"+ filtro.filtro +"%' OR marca LIKE '%"+ filtro.filtro +"%')"+
        ") AS consulta "+
        "WHERE 	 (0 = "+ filtro.estado +" OR cod_estado = "+ filtro.estado +") "+
        "    AND (0 = "+ filtro.categoria +" OR id_categoria = "+ filtro.categoria +") " + orden +
        " LIMIT "+ offset +","+ pageSize +";	"
    
        console.log(sql);

        const preResult = await connection.query(preSql);
        const result = await connection.query(sql);

        const totalPages = Math.ceil(preResult[0].cantidad/pageSize);

        const respuesta = {
            totalRows       :preResult[0].cantidad,
            currentPage     :pageNumber,
            totalPages      :totalPages,
            rowsPerPage     :pageSize,
            Rows            :result
        }

        res.json(respuesta);

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

//Get
const getProducto= async(req,res) => {
    try{
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT  "+
                        "a.id_articulo , " +
                        "a.codigo_barra ," +
                        "a.articulo     ," +
                        "a.id_marca     ," +
                        "a.id_categoria ," +
                        "a.id_unidad    ," +
                        "a.costo        ," +
                        "a.precio       ," +
                        "ac.cantidad as stock,"+
                        "ac.estado,"+
                        "a.fecha_alta   ,"+
                        "a.id_usuario    "+
                    "FROM art_articulos a, art_cantidad ac " +
                    "WHERE a.id_articulo = ac.id_articulo " +
                    "and a.id_articulo = ?", id);
    res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

//Update
const activarProducto = async(req,res) => {
    try{
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("UPDATE art_cantidad SET estado = 'A' WHERE id_articulo = ?", [id]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

//Update
const desactivarProducto = async(req,res) => {
    try{
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("UPDATE art_cantidad SET estado = 'I' WHERE id_articulo = ?", [id]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

//Update
const putProducto = async(req,res) => {
    try{
        const { id } = req.params;
        const {
        id_articulo,   
        codigo_barra,  
        articulo,      
        id_marca,      
        id_categoria,  
        id_unidad,     
        costo,         
        precio,        
        stock,  
        estado,       
        fecha_alta,    
        id_usuario } = req.body;
        
        const connection = await getConnection();
        const result = await connection.query("UPDATE art_cantidad SET cantidad = ?, id_usuario = ?, estado = ?, fdato=now() WHERE id_articulo = ?", [stock,id_usuario,estado,id]);
        const result2 = await connection.query("UPDATE art_articulos SET codigo_barra = ?, articulo = ?, id_marca = ?, id_categoria = ?, costo = ?, precio = ? WHERE id_articulo = ?", [codigo_barra,articulo,id_marca,id_categoria,costo,precio,id]);

        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

//Update
const delProducto = async(req,res) => {
    try{
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("delete from art_cantidad WHERE id_articulo = ?", [id]);
        const result2 = await connection.query("delete from art_articulo WHERE id_articulo = ?", [id]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};



export const methods = {
    getProductos,
    getProducto,
    activarProducto,
    desactivarProducto,
    putProducto,
    delProducto
}
