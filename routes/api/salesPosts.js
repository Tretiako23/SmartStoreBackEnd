const express = require('express');
const { addSalesPosts } = require('../../controllers/salesPosts/addSalesPosts');
const {
  addUrlForSalesPosts,
} = require('../../controllers/salesPosts/addUrlForSalesPosts');
const { authenticate, upload, isAdmin } = require('../../middlewares');
const { getSalesPosts } = require('../../controllers/salesPosts/getSalesPosts');

const salesPostsRouter = express.Router();

salesPostsRouter.patch(
  '/add',
  upload.fields([{ name: 'newPhotos', maxCount: 10 }]),
  authenticate,
  isAdmin,
  addSalesPosts
);

salesPostsRouter.patch(
  '/updateUrl',
  authenticate,
  isAdmin,
  addUrlForSalesPosts
);

salesPostsRouter.get('/get', getSalesPosts);

module.exports = salesPostsRouter;
