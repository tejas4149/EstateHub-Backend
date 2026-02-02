import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  createProperty,
  getProperties,
  getPropertyById,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.post("/", protect, upload.array("images", 5), createProperty);

export default router;
