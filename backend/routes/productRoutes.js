const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productControllers");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

router.get("/products", getProducts);
// http://localhost:4000/api/v1/products?search=&category=all&price[lte]=10000&price[gte]=0&ratings[gte]=0&page=1

router.get("/product/:id", getSingleProduct); // "/api/v1/product/:id"

router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  newProduct
); // "/api/v1/admin/product/new"

router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
); // "/api/v1/admin/product/:id"

router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
); // "/api/v1/admin/product/:id"

router.put("/review", isAuthenticatedUser, createProductReview);
router.get("/reviews", isAuthenticatedUser, getProductReviews);
router.delete("/reviews", isAuthenticatedUser, deleteReview);

module.exports = router;
