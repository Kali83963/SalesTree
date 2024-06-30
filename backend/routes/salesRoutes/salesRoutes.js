const express = require('express');


const singleStorageUpload = require('../../middleware/FileStorage/fileStorage');
const salesContoller = require('../../controller/salesController/salesContoller');
const validateToken = require('../../middleware/validateToken');
const router = express.Router();

router.post('/create',singleStorageUpload({ entity:'sales',fieldName:'photo',fileType:'image'}),validateToken,salesContoller.createContoller);
router.get('/list',validateToken,salesContoller.paginatedListController);
router.get('/search',validateToken,salesContoller.searchController);
router.get('/:id',validateToken,salesContoller.getController);
router.patch('/:id',singleStorageUpload({ entity:'sales',fieldName:'photo',fileType:'image'}),validateToken,salesContoller.editController);
router.delete('/:id',validateToken,salesContoller.deleteController);





module.exports = router;