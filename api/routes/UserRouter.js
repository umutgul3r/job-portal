const router = require("express").Router();
const auth = require("../middleware/Auth.js");
const authAdmin = require("../middleware/AuthAdmin.js");
const {
  register,
  login,
  getUserInfo,
  getAllUserInfo,
  logout,
  updateUser,
  updateUserRole,
  deleteUser,
  googleLogin,
  MyApplications,
  activateEmail,
  getAccessToken,
  forgotPassword,
  resetPassword,
} = require("../controllers/UserController");
const schemas = require("../validation/User");
const validate = require("../middleware/validate");

router.post("/register", register);
router.post("/activation", activateEmail);
router.post("/login", validate(schemas.loginValidation), login);
router.post("/refresh_token", getAccessToken);
router.post("/forgot", forgotPassword);
router.post("/reset", auth, resetPassword);
router.get("/info", auth, getUserInfo);
router.get("/all_info", auth, authAdmin, getAllUserInfo);
router.get("/logout", logout);
router.patch("/update", auth, updateUser);
router.patch("/update_role/:id", auth, updateUserRole);
router.delete("/delete/:id", auth, deleteUser);
router.post("/job-status/:id", MyApplications);

// Google Login

router.post("/google_login", googleLogin);

module.exports = router;
