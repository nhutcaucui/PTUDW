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
    getUserIndex: getUserIndex,
    removeUser: removeUser,
}