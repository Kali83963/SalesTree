const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const permissionMiddleware = asyncHandler(async (req, res, next) => {
    try {

        const user = req.user;
        if(user.role !== "admin" && user.role !== "owner"){
            return res.status(401).json({ message: "User is not authorized" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
});

module.exports = permissionMiddleware;