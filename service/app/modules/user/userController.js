const { PrismaClient } = require('@prisma/client');
const { apiRes } = require('../../helpers/traits');
const { hashPassword, comparePassword } = require('../../helpers/bcrypt');
const { generateToken } = require('../../helpers/jwt');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                email: true,
                name: true
            }
        });
        res.status(200).json(apiRes(200, "Success retrieve all users", users))
    } catch (error) {
        res.status(500).json(apiRes(500, "Error retrieve all users", []))
    }
}

const doLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findFirstOrThrow({ where: { email } });
        const decryptPass = await comparePassword(password, user.password)
        if (decryptPass) {
            const access_token = generateToken({ user: { id: user.id, email: user.email } })
            res.status(200).json(apiRes(200, "Success found user", { email: user.email, name: user.name, access_token }));
        } else {
            res.status(401).json(apiRes(401, "Wrong email or password", {}));
        }
    } catch (error) {
        res.status(500).json(apiRes(500, "Not found user", error))
    }
}

const doRegister = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({ data: { email, name, password: hashedPassword } });
        res.status(200).json(apiRes(200, "Success create user", { name: user.name, email: user.email }));
    } catch (error) {
        res.status(500).json(apiRes(500, "Failed create user", error))
    }
}

module.exports = {
    getAllUsers,
    doLogin,
    doRegister,
}