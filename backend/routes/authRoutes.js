const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

router.post("/register", registerUser); // http://localhost:4000/api/v1/register
router.post("/login", loginUser); // /api/v1/login
router.get("/logout", logout); // /api/v1/logout
router.post("/password/forgot", forgotPassword); // /api/v1/password/forgot
router.put("/password/reset/:token", resetPassword); // /api/v1/password/reset/:token
router.get("/me", isAuthenticatedUser, getUserProfile); // /api/v1/me
router.put("/password/update", isAuthenticatedUser, updatePassword); // /api/v1/password/update
router.put("/me/update", isAuthenticatedUser, updateProfile); //  /api/v1/me/update
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  allUsers
); // /api/v1/admin/users/:id

router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getUserDetails
); //  /api/v1/admin/user/:id

router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateUser
); //  /api/v1/admin/user/:id

router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
); // /api/v1/admin/user/:id

module.exports = router;
