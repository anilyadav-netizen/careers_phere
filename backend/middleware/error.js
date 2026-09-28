const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`
    });
  }

  // Validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: errors.join(', ')
    });
  }

  res.status(500).json({
    success: false,
    message: err.message || 'Server Error'
  });
};

module.exports = errorHandler;