import { getConnection } from "../database/database" ;

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

const getMarca = async(req,res) => {
    try{
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id_marca as cod_marca, " +
                       "        marca " +
                       "FROM art_marca " +
                       "WHERE id_marca = ?", id);
    res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getMarcas,
    getMarca
}