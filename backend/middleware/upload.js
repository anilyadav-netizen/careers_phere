const multer = require("multer");

// Use memory storage (no disk storage)
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  const imageTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "image/gif",
  ];

  // -----------------------------------------
  // RESUME - PDF, DOC, DOCX
  // -----------------------------------------
  if (file.fieldname === "resume") {
    const resumeMimes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/octet-stream",
    ];

    const isDoc = file.originalname && file.originalname.match(/\.(pdf|doc|docx)$/i);

    if (resumeMimes.includes(file.mimetype) || isDoc) {
      return cb(null, true);
    }

    return cb(
      new Error("Resume must be a PDF, DOC, or DOCX file"),
      false
    );
  }

  // -----------------------------------------
  // GOVERNMENT DOCUMENT - IMAGE OR PDF
  // -----------------------------------------
  if (file.fieldname === "governmentDocument") {
    if (
      [...imageTypes, "application/pdf"].includes(file.mimetype)
    ) {
      return cb(null, true);
    }

    return cb(
      new Error("Government document must be JPG, PNG or PDF"),
      false
    );
  }

  // -----------------------------------------
  // PROFILE PHOTO / OTHER IMAGE FIELDS
  // -----------------------------------------
  if (imageTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Only JPEG, PNG, JPG, WEBP, and GIF images are allowed"
    ),
    false
  );
};

// Configure multer
const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: fileFilter,
});

// -----------------------------------------
// Error handling middleware
// -----------------------------------------
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File is too large. Maximum size is 5MB",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next();
};

// -----------------------------------------
// Universal image upload
// -----------------------------------------
const uploadImage = upload.single("image");

// -----------------------------------------
// Upload multiple images
// -----------------------------------------
const uploadMultipleImages = upload.array("images", 10);

// -----------------------------------------
// Upload with custom field name
// -----------------------------------------
const uploadWithField = (fieldName) => {
  return upload.single(fieldName);
};

// -----------------------------------------
// Profile update uploads
// profilePhoto  -> image
// governmentDocument -> image/pdf
// resume -> PDF
// -----------------------------------------
const uploadProfileFields = upload.fields([
  {
    name: "profilePhoto",
    maxCount: 1,
  },
  {
    name: "governmentDocument",
    maxCount: 1,
  },
  {
    name: "resume",
    maxCount: 1,
  },
]);

const uploadResume = upload.single("resume");

module.exports = {
  uploadImage,
  uploadMultipleImages,
  uploadWithField,
  uploadProfileFields,
  uploadResume,
  handleUploadError,
};