const service = require("../../service/salesService/salesService");

const createContoller = async (req, res) => {
    try{
        const body = req.body;
        const createdBy = req.user;
        const response = await service.createService(body, createdBy);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getController =  async (req, res) => {
    try{
        const params = req.params;
        const createdBy = req.user;
        
        const response = await service.detailsService(params, createdBy);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const editController = async (req, res) => {
    try{
        const params = req.params;
        const createdBy = req.user;
        const body = req.body;
        const response = await service.editService(body, createdBy,params);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteController = async (req, res) => {
    try{
        const params = req.params;
        const createdBy = req.user;
        const response = await service.deleteService(params, createdBy);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const searchController = async (req,res)=>{
    try{
        const query = req.query;
        const createdBy = req.user;
        const response = await service.searchService(query, createdBy);
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
const ListController = async (req,res)=>{
    try{
        const createdBy = req.user;
        const query = req.query;
        const response = await service.listService(query,createdBy);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const QuantityCheckController = async (req,res)=>{
    try{
        const createdBy = req.user;
        const params = req.params;
        const body = req.body;
        const response = await service.quantityCheckService(body,params,createdBy);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// const ListSearchController = async (req,res)=>{
//     try{
//         const createdBy = req.user;
//         const query = req.query;
//         const response = await service.listSearchService(query, createdBy);
//         res.status(201).json(response);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

module.exports = {
    createContoller,
    paginatedListController,
    getController,
    editController,
    deleteController,
    searchController,
    ListController,
    QuantityCheckController
    // ListSearchController
}