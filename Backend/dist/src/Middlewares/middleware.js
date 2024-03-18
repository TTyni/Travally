import jwt from "jsonwebtoken";
const unknownEndpoint = (_req, res) => {
    res.status(404).send({ error: "nothing at all" });
};
const logger = (req, _res, next) => {
    const timestamp = new Date().toISOString();
    console.log(timestamp, req.method, decodeURI(req.url));
    console.log(req.body);
    next();
};
const errorHandler = (err, _req, res, _next) => {
    console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || "Something went wrong";
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
};
const authenticate = (req, res, next) => {
    const auth = req.get("Authorization");
    if (!auth?.startsWith("Bearer ")) {
        return res.status(401).send("Invalid token");
    }
    const token = auth.substring(7);
    const secret = "test";
    try {
        console.log(token);
        const decodedToken = jwt.verify(token, secret);
        console.log(decodedToken);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).send("Invalid token");
    }
};
export { logger, unknownEndpoint, authenticate, errorHandler };
