const bcrypt = require("bcrypt");

let encode = (plainPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(plainPassword, salt, (err, hash) => {
                if (err) reject(err);
                resolve(hash)
            })
        }) 
    })
};

let compare = (plainPassword, hashPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hashPassword, (err, bool) => {
            if(err) reject(err);
            resolve(bool);
        })
    })
}

module.exports = {
    encode, 
    compare
}