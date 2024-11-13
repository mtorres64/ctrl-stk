import { Router } from "express";
import { methods as productosController } from "../controllers/productos.controller";

const router = Router();

const uploadFile = require('../middelwere/multer');

router.post("/", productosController.getProductos);
router.get("/:id", productosController.getProducto);
router.put("/activar/:id", productosController.activarProducto);
router.put("/desactivar/:id", productosController.desactivarProducto);
router.put("/:id", productosController.putProducto);
router.delete("/:id", productosController.delProducto);

//guarda imagen del producto
router.post("/imagen/:id", uploadFile(), (req, res) => {
    res.send(req.file);
})

export default router;