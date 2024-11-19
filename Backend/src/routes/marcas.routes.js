import { Router } from "express";
import { methods as marcasController } from "../controllers/marcas.controller";
const router=Router();

router.post("/", marcasController.getMarcas);
router.get("/:id", marcasController.getMarca);

export default router;