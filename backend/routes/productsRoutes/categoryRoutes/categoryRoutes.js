const express = require('express');


const categoryController = require('../../../controller/productsController/categoryController/categoryController');
const validateToken = require('../../../middleware/validateToken');
const permissionMiddleware = require('../../../middleware/permissions/permissionMiddleware');
const singleStorageUpload = require('../../../middleware/FileStorage/fileStorage');
const router = express.Router();

router.post('/create',validateToken,permissionMiddleware,singleStorageUpload({ entity:'category',fieldName:'photo',fileType:'image'}),categoryController.createContoller);
router.get('/list',validateToken,permissionMiddleware,categoryController.paginatedListController);
router.get('/search',validateToken,permissionMiddleware,categoryController.searchController);
router.get('/:id',validateToken,permissionMiddleware,categoryController.getController);
router.patch('/:id',validateToken,permissionMiddleware,permissionMiddleware,singleStorageUpload({ entity:'category',fieldName:'photo',fileType:'image'}),categoryController.editController);
router.delete('/:id',validateToken,permissionMiddleware,categoryController.deleteController);





module.exports = router;