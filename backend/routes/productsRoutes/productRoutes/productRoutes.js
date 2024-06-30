const express = require('express');


const productController = require('../../../controller/productsController/productController/productController');
const validateToken = require('../../../middleware/validateToken');
const permissionMiddleware = require('../../../middleware/permissions/permissionMiddleware');
const singleStorageUpload = require('../../../middleware/FileStorage/fileStorage');
const router = express.Router();

router.post('/create',validateToken,permissionMiddleware,singleStorageUpload({ entity:'product',fieldName:'photo',fileType:'image'}),productController.createContoller);
router.get('/list',validateToken,permissionMiddleware,productController.paginatedListController);
router.get('/search',validateToken,permissionMiddleware,productController.searchController);
router.get('/list-all',validateToken,productController.ListController);
router.get('/list-all/search',validateToken,productController.ListController);
router.patch('/check-product-quantity/:id',validateToken,productController.QuantityCheckController);
router.get('/:id',validateToken,permissionMiddleware,productController.getController);
router.patch('/:id',validateToken,permissionMiddleware,permissionMiddleware,singleStorageUpload({ entity:'manufacture',fieldName:'photo',fileType:'image'}),productController.editController);
router.delete('/:id',validateToken,permissionMiddleware,productController.deleteController);






module.exports = router;