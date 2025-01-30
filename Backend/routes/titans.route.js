import express from "express";
import { gettitans, createtitans, deletetitans, updatetitans } from "../controller/titans.controller.js";
const router = express.Router();

//GET ALL TITANS
router.get("/", gettitans);

//CREATE TITANS
router.post("/", createtitans);

//DELETE TITANS
router.delete("/:id", deletetitans);

//UPDATE TITANS
router.put("/:id", updatetitans);

export default router;