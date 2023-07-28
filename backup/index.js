let qr = require('qr-image');
let fs = require('fs');

var createQRText = process.argv[2];
var output = process.argv[3]
 
qr.image(createQRText, {type: "png", size: 20})
 .pipe(fs.createWriteStream(output));