const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            data: users,
            message: 'Successfully retrieved all users',
        })
    } catch (error) {
        res.status(500).json({
            data: [],
            message: error.message(),
        })
    }
}

module.exports = {
    getAllUsers,
}