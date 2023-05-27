const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// get products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const search = req.query.search || "";
  const category = req.query.category || "";

  const page = req.query.page || 1;

  const priceLte = req.query.price.lte || Infinity;
  const priceGte = req.query.price.gte || 0;
  const ratingsGte = req.query.ratings.gte || 0;

  const ITEM_PER_PAGE = 4;

  const query = {
    name: { $regex: search, $options: "i" },
    price: { $lte: priceLte, $gte: priceGte },
    ratings: { $gte: ratingsGte },
  };

  if (category !== "all") {
    query.category = category;
  }

  const skip = (page - 1) * ITEM_PER_PAGE; // 1 * 4 = 4

  // console.log("query", query);

  const totalProducts = await Product.countDocuments();

  const count = await Product.countDocuments(query);

  const products = await Product.find(query).limit(ITEM_PER_PAGE).skip(skip);

  const pageCount = Math.ceil(count / ITEM_PER_PAGE); // 8 /4 = 2

  res.status(200).json({
    success: true,
    Pagination: {
      totalProducts,
      filteredProducts: count,
      pageCount,
      currentPageProducts: products.length,
    },
    products,
  });
});

// create new product

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body); // this will take all the data from body and create product
  res.status(201).json({
    success: true,
    product,
  });
});

// get single product details
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    // return res.status(404).json({
    //     success: false,
    //     message: "Product not found"
    // })
    return next(new ErrorHandler("Product not found", 404));
  } else {
    res.status(200).json({
      success: true,
      product,
    });
  }
});

// update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  } else {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  }
});

// delete product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    product,
  });
});


// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});


// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});


// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  console.log(product);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
