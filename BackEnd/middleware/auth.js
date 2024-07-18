import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    // Extract token from headers
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not authorized. Please try logging in again." });
    }

    try {
        // Verify the token
        const token_decode = jwt.verify(token, process.env.SECRET_KEY);

        // Log the decoded token
        console.log(token_decode);

        // Attach userId to request body
        req.body.userId = token_decode.userId;
        console.log(req.body.userId);
        // Move to the next middleware or route handler
        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error verifying token." });
    }
};

export default authMiddleware;
