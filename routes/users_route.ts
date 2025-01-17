import express from "express";
const router = express.Router();
import usersController from "../controllers/users_controller";

router.post("/", usersController.addNewUser);
router.get("/:id", usersController.getUserByID);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

export default router;