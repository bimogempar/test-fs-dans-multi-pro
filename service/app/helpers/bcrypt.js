const bcrypt = require('bcryptjs');
const saltRounds = 10;
const secretKeyBcrypt = process.env.SECRET_KEY_BCRYPT;

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password + secretKeyBcrypt, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password + secretKeyBcrypt, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
}

module.exports = { hashPassword, comparePassword };