const express = require('express');
const router = express.Router();


const categoryRoutes = require('./categoryRoutes/categoryRoutes');
const subCategoryRoutes = require('./subcategoryRoutes/subCategoryRoutes');
const manufactureRoutes = require('./manufactureRoutes/manufactureRoutes');
const productRoutes = require('./productRoutes/productRoutes');

// Mount the category routes under the /category path
router.use('/category/', categoryRoutes);
router.use('/subcategory/', subCategoryRoutes);
router.use('/manufacture/', manufactureRoutes);
router.use('/product/', productRoutes);




module.exports = router;