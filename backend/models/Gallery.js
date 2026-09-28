const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    image: {
        url: {
            type: String,
            required: [true, 'Image URL is required']
        },
        displayUrl: {
            type: String
        },
        deleteUrl: {
            type: String
        },
        thumb: {
            type: String
        },
        medium: {
            type: String
        },
        filename: {
            type: String
        },
        size: {
            type: Number
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        },
        imgbbId: {
            type: String
        }
    },
    heading: {
        type: String,
        required: [true, 'Heading is required'],
        trim: true,
        maxlength: [100, 'Heading cannot exceed 100 characters']
    },
    subHeading: {
        type: String,
        required: [true, 'SubHeading is required'],
        trim: true,
        maxlength: [200, 'SubHeading cannot exceed 200 characters']
    },
    category: {
        type: String,
        enum: ['Workplace', 'Career', 'Professionals', 'Learning'],
        required: [true, 'Category is required'],
        default: 'Workplace'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    sortOrder: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    views: {
        type: Number,
        default: 0
    },
    altText: {
        type: String,
        trim: true
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

// Indexes
GallerySchema.index({ category: 1 });
GallerySchema.index({ isActive: 1 });
GallerySchema.index({ createdAt: -1 });
GallerySchema.index({ heading: 'text', subHeading: 'text' });

// Virtual for formatted date
GallerySchema.virtual('formattedDate').get(function () {
    return this.createdAt ? this.createdAt.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }) : '';
});

// Virtual for image URL
GallerySchema.virtual('imageUrl').get(function () {
    return this.image?.displayUrl || this.image?.url || null;
});

// To include virtuals in JSON
GallerySchema.set('toJSON', { virtuals: true });
GallerySchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Gallery', GallerySchema);