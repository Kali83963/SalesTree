const service = require("../../service/userService/userService");

const createContoller = async (req, res, db) => {
    try{
        const body = req.body;
        const createdBy = req.user;
        const response = await service.createUser(body, createdBy);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const paginatedListController = async (req,res)=>{
    try{
        const query = req.query;
        const createdBy = req.user;
        const response = await service.pagination(query, createdBy);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createContoller,
    paginatedListController
}