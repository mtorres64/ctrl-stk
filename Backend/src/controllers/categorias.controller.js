import { getConnection } from "../database/database" ;

//Get login
const getCategorias = async(req,res) => {
    try{

        const connection = await getConnection();

        const preSql = "SELECT 	id_categoria as cod_categoria, " +
                       "        categoria " +
                       "FROM art_categoria; ";

        const preResult = await connection.query(preSql);

        res.json(preResult);

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getCategorias
}