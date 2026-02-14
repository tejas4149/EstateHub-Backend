import { body, validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const userValidationRules = {
  register: [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  login: [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ]
};

export const propertyValidationRules = {
  create: [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('type').isIn(['sale', 'rent']).withMessage('Type must be sale or rent'),
    body('propertyType').isIn(['house', 'apartment', 'condo', 'townhouse', 'land', 'commercial']).withMessage('Invalid property type'),
    body('bedrooms').isInt({ min: 0 }).withMessage('Bedrooms must be a positive number'),
    body('bathrooms').isInt({ min: 0 }).withMessage('Bathrooms must be a positive number'),
    body('area').isNumeric().withMessage('Area must be a number'),
    body('location.address').notEmpty().withMessage('Address is required'),
    body('location.city').notEmpty().withMessage('City is required')
  ]
};