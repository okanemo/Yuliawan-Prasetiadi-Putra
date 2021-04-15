const path = require('path');

exports.page404 = function(req,res){
    res.sendFile(path.join(__dirname,'../static','page404.html'));
}