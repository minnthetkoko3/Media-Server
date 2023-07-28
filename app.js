let libby = require('./bmlibby/index')
let abc = process.argv[2]

libby.encode(abc)
    .then(encoded => libby.compare(abc, encoded))
    .then(res => console.log(res))
    .catch(err => console.log(err))