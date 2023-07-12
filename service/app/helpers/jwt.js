const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY_JWT;

const generateToken = (payload, expiresIn = '1h') => {
    try {
        const token = jwt.sign(payload, secretKey, { expiresIn });
        return token;
    } catch (error) {
        throw new Error('Error generating token');
    }
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        throw new Error('Error verifying token');
    }
}

module.exports = { generateToken, verifyToken };