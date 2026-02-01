import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  createProperty,
  getProperties,
  getPropertyById,
} from "../controllers/propertyController.js";

const PropertyRoutes = express.Router();

PropertyRoutes.get("/", getProperties);
PropertyRoutes.get("/:id", getPropertyById);
PropertyRoutes.post("/", protect, upload.array("images", 5), createProperty);

export default PropertyRoutes;
