import Property from "../models/Property.js";
import cloudinary from "../config/cloudinary.js";

export const createProperty = async (req, res) => {
  const { title, price, city, type, bhk, purpose } = req.body;

  const imageUrls = [];

  for (const file of req.files) {
    const result = await cloudinary.v2.uploader.upload(
      `data:image/jpeg;base64,${file.buffer.toString("base64")}`
    );
    imageUrls.push(result.secure_url);
  }

  const property = await Property.create({
    title,
    price,
    city,
    type,
    bhk,
    purpose,
    images: imageUrls,
    owner: req.user.id,
  });

  res.json(property);
};

export const getProperties = async (req, res) => {
  const properties = await Property.find().populate("owner", "email");
  res.json(properties);
};

export const getPropertyById = async (req, res) => {
  const property = await Property.findById(req.params.id);
  res.json(property);
};
