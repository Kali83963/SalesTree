const express = require('express');


const subCategoryController = require('../../../controller/productsController/subCategoryController/subCategoryController');
const validateToken = require('../../../middleware/validateToken');
const permissionMiddleware = require('../../../middleware/permissions/permissionMiddleware');
const singleStorageUpload = require('../../../middleware/FileStorage/fileStorage');
const router = express.Router();

router.post('/create',validateToken,permissionMiddleware,singleStorageUpload({ entity:'category',fieldName:'photo',fileType:'image'}),subCategoryController.createContoller);
router.get('/list',validateToken,permissionMiddleware,subCategoryController.paginatedListController);
router.get('/search',validateToken,permissionMiddleware,subCategoryController.searchController);
router.get('/:id',validateToken,permissionMiddleware,subCategoryController.getController);
router.patch('/:id',validateToken,permissionMiddleware,permissionMiddleware,singleStorageUpload({ entity:'category',fieldName:'photo',fileType:'image'}),subCategoryController.editController);
router.delete('/:id',validateToken,permissionMiddleware,subCategoryController.deleteController);





module.exports = router;