import { Router } from "express";
import { methods as marcasController } from "../controllers/marcas.controller";
const router=Router();

router.post("/", marcasController.getMarcas);

export default router;