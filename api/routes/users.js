import express from "express";
import { getUsers, addUser, updateUser, deleteUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/", addUser);

router.put("/:id_cliente", updateUser);

router.delete("/:id_cliente", deleteUser);

export default router;