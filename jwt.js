const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    // Extract the jwt token fron the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) 
        return res.status(401).json({error: 'Unotherized'});

    try {
        // verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to the request obj
        res.user = jwt.decoded
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Invalid Token'});
    }
};

// Function to generate token 


const generateToken = (userData) => {
    // generate a new jwt token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30});
}



module.exports = {jwtAuthMiddleware, generateToken};