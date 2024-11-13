import { Router } from "express";
import { methods as categoriasController } from "../controllers/categorias.controller";
const router=Router();

router.post("/", categoriasController.getCategorias);

export default router;