const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

function new_user(username, password, role){
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) =>{
        console.log(hash);
    });
}

function verify(password, hash){
    bcrypt.compare(password, hash, (err, res) => {
        if (res){
            console.log('Yes, indeed');
        } else{
            console.log('No, you');
        }
    });
}

verify('meomeomeo', '$2a$10$rqNNDhzSOmHnB/tega5kE.BpW5ALiAY9XNx5bNZ0qou8EOMEaQvli');
new_user('hi mom', 'meomeomeo', '');