const { PrismaClient } = require('@prisma/client');
const { apiRes } = require('../../helpers/traits');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(apiRes(200, "Success retrieve all users", users))
    } catch (error) {
        res.status(500).json(apiRes(500, "Error retrieve all users", []))
    }
}

module.exports = {
    getAllUsers,
}