const router = require("express").Router();
const uploadImage = require("../middleware/ImageUpload");
const uploadController = require("../controllers/UploadController");
const auth = require("../middleware/Auth.js");
const cloud = require("cloudinary");

router.post("/upload_profil", uploadImage, auth, uploadController.uploadProfil);

module.exports = router;