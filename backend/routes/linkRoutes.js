import express from "express";
import { addData, getLink } from "../controllers/linkController.js";

const router = express.Router();

router.post("/addlink",addData);
router.get("/getdata",getLink);

export default router;