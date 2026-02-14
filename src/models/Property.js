import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  type: {
    type: String,
    enum: ['sale', 'rent'],
    required: [true, 'Please specify property type']
  },
  propertyType: {
    type: String,
    enum: ['house', 'apartment', 'condo', 'townhouse', 'land', 'commercial'],
    required: [true, 'Please specify property type']
  },
  bedrooms: {
    type: Number,
    required: [true, 'Please specify number of bedrooms'],
    min: 0
  },
  bathrooms: {
    type: Number,
    required: [true, 'Please specify number of bathrooms'],
    min: 0
  },
  area: {
    type: Number,
    required: [true, 'Please specify area in sqft']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please provide address']
    },
    city: {
      type: String,
      required: [true, 'Please provide city']
    },
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'USA'
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  features: [{
    type: String
  }],
  amenities: [{
    type: String
  }],
  images: [{
    url: String,
    publicId: String
  }],
  status: {
    type: String,
    enum: ['available', 'pending', 'sold', 'rented'],
    default: 'available'
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  yearBuilt: Number,
  parking: Number,
  lotSize: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for search functionality
propertySchema.index({ 
  title: 'text', 
  description: 'text',
  'location.city': 'text',
  'location.address': 'text'
});

// Virtual for formatted price
propertySchema.virtual('formattedPrice').get(function() {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(this.price);
});

const Property = mongoose.model('Property', propertySchema);
export default Property;