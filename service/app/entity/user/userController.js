const getUser = async (req, res) => {
    res.status(200).json({
        message: 'this me is a user'
    });
}

module.exports = {
    getUser,
}