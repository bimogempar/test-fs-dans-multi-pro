const moment = require('moment');

const dateNow = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

const justDate = () => {
    return moment().format('YYYY-MM-DD')
}
const apiRes = (status, msg, data,) => {
    return {
        status,
        message: msg,
        data,
        timestamp: dateNow()
    }
}

module.exports = {
    dateNow,
    justDate,
    apiRes,
}