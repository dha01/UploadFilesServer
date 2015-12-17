var path            =       './UploadFiles/'

var express    		=       require("express");
var multer     		=       require('multer');
var upload 			= 		multer({ dest: path});

var router = express.Router();
var fs = require("fs");

router.get('/', function(req, res, next) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<form action="File/Upload" enctype="multipart/form-data" method="post">'+
        '<input type="text" name="title"><br>'+
        '<input type="file" name="upload" multiple="multiple"><br>'+
        '<input type="submit" value="Upload">'+
        '</form>'
    );
});

router.post('/Upload',function(req,res){
    upload(req,res,function(err) {
        console.log(req.files);
        console.log(req.files.upload.originalname);
        fs.rename(req.files.upload.path,
            path + req.files.upload.originalname + '_' + req.files.upload.name, function (err) {
            if (err) {console.log(err); return; }
        });
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

module.exports = router;
