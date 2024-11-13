import { getConnection } from "../database/database" ;

//Get
const getUsers = async(req,res) => {
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT id, usr, pass, perfil, fcreacion FROM usr_usuarios");
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

//Post
const addUser = async(req,res) => {
    try{
        const { usr, pass, perfil, clave_caja } = req.body;

        if(usr===undefined || pass===undefined || perfil===undefined){
            res.status(400).json({
                message: "Bad Request. Please fill all field"
            });
        }

        const usuario = { usr, pass, perfil, clave_caja }
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO usr_usuarios SET ?", usuario);
        res.json({message: "Usuario Added"});
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

//Get
const getUser= async(req,res) => {
    try{
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, usr, pass, perfil, fcreacion FROM usr_usuarios WHERE id = ?", id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

//delete
const deleteUser = async(req,res) => {
    try{
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM usr_usuarios WHERE id = ?", id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

//Update
const updateUser = async(req,res) => {
    try{
        const { id } = req.params;
        const { usr, pass, perfil, clave_caja } = req.body;

        if(usr===undefined || pass===undefined || perfil===undefined || id===undefined){
            res.status(400).json({
                message: "Bad Request. Please fill all field"
            });
        }

        const usuario = { usr, pass, perfil, clave_caja }
        const connection = await getConnection();
        const result = await connection.query("UPDATE usr_usuarios SET ? WHERE id = ?", [usuario,id]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

//Get login
const loginUser = async(req,res) => {
    try{
        const { usr, pass } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, usr, pass, perfil, clave_caja FROM usuarios WHERE usr=? AND pass=?", [usr,pass]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getUsers,
    addUser,
    getUser,
    deleteUser,
    updateUser,
    loginUser
}
