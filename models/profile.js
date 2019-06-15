var db = require('./index').mysql;
var dbbase = require('./dbbase');

function accountPremium(username){
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

                if (expired){

                }
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

module.exports = {
    accountPremium: accountPremium,
    birthUpdate: birthUpdate,
}