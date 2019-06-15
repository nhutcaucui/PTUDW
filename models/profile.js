var db = require('./index').mysql;
var dbbase = require('./dbbase');
var datetime = require('../utils/datetime');
const sevenday = 7 * 24 * 60 * 60;

function getProfile(username){
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM account WHERE username=?";
        let params = [username];

        db.query(query, params, (err, res) => {
            if (err){
                throw err;
            }

            if (res.length > 0){
                let is_login = (new Int16Array(res[0].is_login))[0];
                let name = res[0].flname;
                let alias = res[0].alias;
                let level = res[0].level;
                let premium = res[0].premium_expired;
                let result = {
					status : 'success',
                    message : '' ,
                    name : name,
                    alias : alias,
                    level : level,
                    premium : premium,
                };
                
                if (is_login === 1){
                    result.message = 'Lấy thông tin thành công';

                }
                else{
                    result.status = 'failed';
                    result.message = 'Đăng nhập để xem thông tin';
                }

                resolve(result);
            }
            else{
                res.status = 'failed';
                res.message = 'Tài khoản không tồn tại';

                resolve(result);
            }

        });
    });
}

function accountPremium(username, unix){
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM account WHERE username=?";
        let params = [username];

        db.query(query, params, (err, res) => {
            if (err){
                throw err;
            }

            if (res.length > 0){
                let now = new Date();
                let expired = res[0].premium_expired;
                let result = {
                    status: 'success',
                    message: '',
                };

                if (expired > unix){
                    expired = expired + sevenday;
                    let entity = {
                        premium_expired: expired,
                        username: username
                    };

                    dbbase.updatetb('account', 'premium_expired', 'username', entity);

                    result.message = 'Gia hạn thành công';

                }
                else{
                    expired = unix + sevenday;
                    let entity = {
                        premium_expired: expired,
                        username: username
                    };

                    dbbase.updatetb('account', 'premium_expired', 'username', entity);

                    result.message = 'Nâng cấp thành công';
                }

                resolve(result);
            }
            else{
                result.status = 'failed';
                result.message = 'Tài khoản không tồn tại';
                resolve(result);
            }
        });
    });
};

function birthUpdate(username, value){
    return new Promise((resolve, reject) => {
        let entity = {
            birth: value,
            username: username
        };

        resolve(dbbase.updatetb('account', 'birth', 'username', entity));
    
    });
}

function nameUpdate(username, value){
    return new Promise((resolve, reject) => {
        let entity = {
            flname: value,
            username: username
        };

        resolve(dbbase.updatetb('account', 'flname', 'username', entity));
    });
}

function aliasUpdate(username, value){
    return new Promise((resolve, reject) => {
        let entity = {
            alias: value,
            username: username
        };

        resolve(dbbase.updatetb('account', 'alias', 'username', entity));
    });
}

module.exports = {
    getProfile : getProfile,
    accountPremium: accountPremium,
    birthUpdate: birthUpdate,
    nameUpdate: nameUpdate,
    aliasUpdate: aliasUpdate,
}