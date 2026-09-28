const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true,
        maxlength: [50, 'Category name cannot exceed 50 characters']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    shortDescription: {
        type: String,
        required: [true, 'Short description is required'],
        maxlength: [200, 'Description cannot exceed 200 characters'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Category image is required']
    },
    imagePublicId: {
        type: String // For cloud storage (optional)
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Create slug from name before saving
CategorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
    
});

module.exports = mongoose.model('Category', CategorySchema);