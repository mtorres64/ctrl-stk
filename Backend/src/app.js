import express from "express";
import morgan from "morgan";

//Routes
import usersRoutes from "./routes/users.routes";
import loginRoutes from "./routes/login.routes";
import productosRoutes from "./routes/productos.routes";
import categoriasRoutes from "./routes/categorias.routes";
import marcasRoutes from "./routes/marcas.routes";

const app = express();
const jwt = require('jsonwebtoken');

//settings
app.set("port", 4000);

//middelware
app.use(morgan("dev"));
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Routes
app.use("/api/usuarios", usersRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/marcas", marcasRoutes);

export default app; 
