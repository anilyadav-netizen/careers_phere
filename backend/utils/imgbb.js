/**
 * Get URL from ImgBB image object/string
 */
const getImageUrl = (value) => {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object") {
    return value.url || value.display_url || value.displayUrl || "";
  }

  return "";
};

/**
 * Universal Image Upload to ImgBB
 *
 * @param {Buffer} imageBuffer - Image buffer from multer
 * @param {string} filename - Original filename
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} - Upload response with normalized image data
 */
const uploadToImgBB = async (imageBuffer, filename, options = {}) => {
  try {
    // ----------------------------------------------------------
    // Validate image buffer
    // ----------------------------------------------------------

    if (!imageBuffer) {
      throw new Error("Image buffer is required");
    }

    // ----------------------------------------------------------
    // Validate API key
    // ----------------------------------------------------------

    if (!process.env.IMGBB_API_KEY) {
      throw new Error("ImgBB API key is not configured");
    }

    // ----------------------------------------------------------
    // Validate API URL
    // ----------------------------------------------------------

    if (!process.env.IMGBB_API_URL) {
      throw new Error("ImgBB API URL is not configured");
    }

    // ----------------------------------------------------------
    // Prepare FormData
    // ----------------------------------------------------------

    const formData = new URLSearchParams();
    formData.set("key", process.env.IMGBB_API_KEY);
    formData.set("image", imageBuffer.toString("base64"));
    formData.set("name", options.name || filename || "image");

    // ----------------------------------------------------------
    // Optional expiration
    // ----------------------------------------------------------

    if (options.expiration) {
      formData.set("expiration", options.expiration);
    }

    // ----------------------------------------------------------
    // Upload to ImgBB
    // ----------------------------------------------------------

    const response = await fetch(process.env.IMGBB_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });
    const responseData = await response.json();

    // ----------------------------------------------------------
    // Validate response
    // ----------------------------------------------------------

    if (!response.ok || !responseData?.success || !responseData?.data) {
      throw new Error("Upload failed: " + JSON.stringify(responseData));
    }

    const img = responseData.data;

    // ----------------------------------------------------------
    // Normalize ImgBB response
    //
    // IMPORTANT:
    // thumb / medium / small can be OBJECTS.
    // We save only their URL strings.
    // ----------------------------------------------------------

    const normalizedData = {
      // Main image URL
      url: getImageUrl(img.url),

      // Display URL
      displayUrl:
        getImageUrl(img.display_url) ||
        getImageUrl(img.displayUrl) ||
        getImageUrl(img.url),

      // Delete URL
      deleteUrl: getImageUrl(img.delete_url) || getImageUrl(img.deleteUrl),

      // Thumbnail URL
      thumb: getImageUrl(img.thumb),

      // Medium image URL
      medium: getImageUrl(img.medium),

      // Small image URL
      small: getImageUrl(img.small) || getImageUrl(img.thumb),

      // Original filename
      filename: img.image?.filename || img.filename || filename || "",

      // File size
      size: typeof img.size === "number" ? img.size : undefined,

      // Width
      width: typeof img.width === "number" ? img.width : undefined,

      // Height
      height: typeof img.height === "number" ? img.height : undefined,

      // Expiration
      expiration: img.expiration || null,

      // ImgBB ID
      id: img.id || "",

      // Title
      title: img.title || "",

      // Description
      description: img.description || "",
    };

    // ----------------------------------------------------------
    // Return normalized result
    // ----------------------------------------------------------

    return {
      success: true,
      data: normalizedData,
    };
  } catch (error) {
    console.error("ImgBB Upload Error:", {
      message: error.message,

      response: error.response?.data,
    });

    throw new Error(
      error.response?.data?.error?.message ||
        error.message ||
        "Failed to upload image to ImgBB",
    );
  }
};

/**
 * Delete image from ImgBB using delete URL
 *
 * @param {string} deleteUrl
 * @returns {Promise<boolean>}
 */
const deleteFromImgBB = async (deleteUrl) => {
  try {
    if (!deleteUrl) {
      console.warn("No delete URL provided");

      return false;
    }

    const response = await fetch(deleteUrl, { method: "DELETE" });

    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("ImgBB Delete Error:", error.message);

    // Don't throw
    return false;
  }
};

/**
 * Get image info from ImgBB
 *
 * @param {string} imageId
 * @returns {Promise<Object>}
 */
const getImageInfo = async (imageId) => {
  try {
    if (!imageId) {
      throw new Error("Image ID is required");
    }

    if (!process.env.IMGBB_API_KEY) {
      throw new Error("ImgBB API key is not configured");
    }

    const response = await fetch(
      `https://api.imgbb.com/1/info?key=${encodeURIComponent(
        process.env.IMGBB_API_KEY,
      )}&id=${encodeURIComponent(imageId)}`,
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData?.error?.message || "ImgBB request failed");
    }

    return responseData;
  } catch (error) {
    console.error("ImgBB Get Info Error:", error.message);

    throw new Error(
      error.response?.data?.error?.message || "Failed to get image information",
    );
  }
};

/**
 * Check if ImgBB API key is valid
 *
 * @returns {Promise<boolean>}
 */
const validateApiKey = async () => {
  try {
    // 1x1 transparent PNG
    const testBuffer = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64",
    );

    const result = await uploadToImgBB(testBuffer, "test.png");

    return result && result.success === true;
  } catch (error) {
    console.error("ImgBB API validation error:", error.message);

    return false;
  }
};

module.exports = {
  uploadToImgBB,
  deleteFromImgBB,
  getImageInfo,
  validateApiKey,
};
