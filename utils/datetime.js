const moment = require('moment');

function date2unix(date){

}

function unix2date(unix){
    let date = moment(unix).format("YYYY-MM-DD");
    return date;
}

module.exports = {
    date2unix : date2unix,
    unix2date : unix2date,
}