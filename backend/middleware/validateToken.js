const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "User is not authorized or token is missing" });
        }
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "User is not authorized" });
            }
            req.user = decoded.user;
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
});

module.exports = validateToken;