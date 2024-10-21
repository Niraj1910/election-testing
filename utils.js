function getFullImagePath(req, folderName){
    return req.protocol + '://' + req.get('host') + `/uploads/${folderName}/` + req.file.filename;
}

module.exports = {getFullImagePath}