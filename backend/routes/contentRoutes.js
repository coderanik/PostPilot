import express from "express";
import { generatePost } from "../controllers/contentController.js";

const router = express.Router();

router.get("/:type/:linkId", generatePost);

export default router;
