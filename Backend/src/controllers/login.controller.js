import { getConnection } from "../database/database" ;

//Get login
const loginUser = async(req,res) => {
    try{
        const { usr, pass } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, usr, pass, perfil, clave_caja FROM usr_usuarios WHERE usr=? AND pass=?", [usr,pass]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    loginUser
}
