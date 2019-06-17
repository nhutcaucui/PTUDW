var hot;
var top;
var news;
var cats;
var tag;
var tag_manager = {
    //example
    //kinhte: 1,
    //cuocsong: 2,
};

var users = [];
var reset_password_users = [];

function getResetIndex(username){
    for (let loop = 0; loop < reset_password_users.length; loop++){
        if (reset_password_users[loop].username === username){
            return loop;
        }
    }

    return -1;
}

function getUserIndex(username){
    let index = 0;
    users.forEach(user => {
        if (user.username === username){
            return index;
        }

        index += 1;
    });

    return -1;
}

function removeUser(username){
    let index = getUserIndex(username);

    if (index > -1){
        users.splice(index, 1);
    }
}

module.exports = {
    hot: hot,
    top: top,
    news: news,
    cats: cats,
    users: users,
    reset_password_users: reset_password_users,
    getUserIndex: getUserIndex,
    getResetIndex: getResetIndex,
    removeUser: removeUser,
}