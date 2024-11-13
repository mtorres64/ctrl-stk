import { getConnection } from "../database/database" ;

//Get login
const getMarcas = async(req,res) => {
    try{

        const connection = await getConnection();

        const preSql = "SELECT 	id_marca as cod_marca, " +
                       "        marca " +
                       "FROM art_marca " +
                       "ORDER BY marca ASC;";

        const preResult = await connection.query(preSql);

        res.json(preResult);

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getMarcas
}