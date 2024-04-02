const service = require("../../service/userService/userService");

const createContoller = async (req, res, db) => {
    try{
        const body = req.body;
        const createdBy = req.user;
        const user = await service.createUser(body, createdBy);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createContoller
}