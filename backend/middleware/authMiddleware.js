const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization) {
            var token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedToken?.id;
            next();
        } else {
            return res.status(403).send({ auth: false, message: "No token provided" });
        }
    } catch (err) {
        console.error("Error:", err);
        return res.status(403).send({ auth: false, message: "Invalid token" });
    }
};

module.exports = authMiddleware;
