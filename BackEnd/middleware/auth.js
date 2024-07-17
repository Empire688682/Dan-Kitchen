import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) =>{
    const {token} = req.header;
    if(!token){
        return res.json({success:false, message:"Not Authorized Longin Again"});
    }

    try {
        const token_decode = jwt.verify(token, process.env.SECRET_KEY);
        req.body.userId = token_decode.id;
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"});
    }
};

export default authMiddleware;