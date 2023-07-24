import express from "express";
import { getPost, createPost, updatePost } from "../controllers/getPostController.js";

const router = express.Router();

router.get("/", getPost);

router.post("/", createPost);
router.post('/update', updatePost);

export default router;