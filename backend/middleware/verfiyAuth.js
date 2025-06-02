import jwt from "jsonwebtoken";

export const verifyAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (process.env.NODE_ENV !== "production") console.log(err);
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
