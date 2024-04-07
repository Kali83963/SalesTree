const express = require('express');
const router = express.Router();


const categoryRoutes = require('./categoryRoutes/categoryRoutes');

// Mount the category routes under the /category path
router.use('/category/', categoryRoutes);



module.exports = router;