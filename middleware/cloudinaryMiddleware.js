const cloudinary = require("../cloudinary/cloudinaryConfig");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

module.exports = (req, res, next) => {
  const file = req.file;
  if (!file) {
    throw new Error("No image file uploaded");
  }
  const tempFilePath = path.join(__dirname, "..", "temp", file.originalname);
  fs.writeFileSync(tempFilePath, file.buffer);

  // upload the file to Cloudinary
  cloudinary.uploader
    .upload(tempFilePath, {
      folder: process.env.CLOUDINARY_FOLDER,
      public_id: `blog_${Date.now()}`,
    })
    .then((result) => {
      req.body.imgUrl = result.secure_url;
      next();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      // Delete the temporarily created file
      fs.unlinkSync(tempFilePath);
    });
};
