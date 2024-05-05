const express = require('express');


const manufactureController = require('../../../controller/productsController/manufactureController/manufactureController');
const validateToken = require('../../../middleware/validateToken');
const permissionMiddleware = require('../../../middleware/permissions/permissionMiddleware');
const singleStorageUpload = require('../../../middleware/FileStorage/fileStorage');
const router = express.Router();

router.post('/create',validateToken,permissionMiddleware,singleStorageUpload({ entity:'manufacture',fieldName:'photo',fileType:'image'}),manufactureController.createContoller);
router.get('/list',validateToken,permissionMiddleware,manufactureController.paginatedListController);
router.get('/search',validateToken,permissionMiddleware,manufactureController.searchController);
router.get('/listAll',validateToken,permissionMiddleware,manufactureController.ListController);
router.get('/:id',validateToken,permissionMiddleware,manufactureController.getController);
router.patch('/:id',validateToken,permissionMiddleware,permissionMiddleware,singleStorageUpload({ entity:'manufacture',fieldName:'photo',fileType:'image'}),manufactureController.editController);
router.delete('/:id',validateToken,permissionMiddleware,manufactureController.deleteController);






module.exports = router;