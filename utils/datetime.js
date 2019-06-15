const moment = require('moment');

function date2unix(date){
    var ts = moment(date);
    var unix = ts.unix();

    return unix;
}

function unix2date(unix){
    let date = new Date(unix * 1000);
    return date;
}

module.exports = {
    date2unix : date2unix,
    unix2date : unix2date,
}