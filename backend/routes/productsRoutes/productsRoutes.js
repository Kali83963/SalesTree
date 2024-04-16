const express = require('express');
const router = express.Router();


const categoryRoutes = require('./categoryRoutes/categoryRoutes');
const subCategoryRoutes = require('./subcategoryRoutes/subCategoryRoutes');

// Mount the category routes under the /category path
router.use('/category/', categoryRoutes);
router.use('/subcategory/', subCategoryRoutes);




module.exports = router;