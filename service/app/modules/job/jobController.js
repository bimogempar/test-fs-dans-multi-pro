const axios = require('axios');
const { apiRes } = require('../../helpers/traits');

const getListJobs = async (req, res) => {
    const { description, location, full_time, page } = req.query;
    const arrParams = [];
    if (description) {
        arrParams.push(`description=${description}`);
    }
    if (location) {
        arrParams.push(`location=${location}`);
    }
    if (full_time) {
        arrParams.push(`full_time=${full_time}`);
    }
    if (page) {
        arrParams.push(`page=${page}`);
    }
    var url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?${arrParams.join('&')}`;
    try {
        const resp = await axios.get(url);
        const { data } = resp;
        res.status(200).json(apiRes(200, "Successfully get listing jobs", data));
    } catch (error) {
        res.status(200).json(apiRes(200, "Empty listing jobs", []));
    }
}

module.exports = { getListJobs };