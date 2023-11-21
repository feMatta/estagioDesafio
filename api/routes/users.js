import express from "express";
import { getUsers, addUser, updateUser, deleteUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/", addUser);

router.put("/:CNPJ", updateUser);

router.delete("/:CNPJ", deleteUser);

export default router;