import { Router } from "express";
import { methods as usersController } from "../controllers/users.controller";
const router=Router();

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUser);
router.post("/", usersController.addUser);
router.delete("/:id", usersController.deleteUser);
router.put("/:id", usersController.updateUser);

export default router;