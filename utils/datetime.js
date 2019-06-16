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

function format(date, format){
    return moment(date).format(format);
}

module.exports = {
    date2unix : date2unix,
    unix2date : unix2date,
    format: format,
}