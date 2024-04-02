const express = require('express');


const singleStorageUpload = require('../../middleware/FileStorage/fileStorage');
const userController = require('../../controller/userController/userController');
const validateToken = require('../../middleware/validateToken');
const router = express.Router();

router.post('/create',singleStorageUpload({ entity:'users',fieldName:'photo',fileType:'image'}),validateToken,userController.createContoller);




module.exports = router;