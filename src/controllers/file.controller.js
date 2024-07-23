

const uploadSingleFile = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "Please upload a file!" });
    }

    const { originalname, size, mimetype, path: filePath } = req.file;

    const file = {
        originalname,
        size,
        mimetype,
        path: filePath
    };

    return res.status(200).send({ message: "File uploaded successfully!", file });
};


const uploadMultipleFiles = (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send({ message: "Please upload files!" });
    }

    let files = [];
    let count = 0;
    req.files.forEach(file => {
        const { originalname, size, mimetype, path: filePath } = file;
        count++;
        files.push({
            originalname,
            size,
            mimetype,
            path: filePath
        });
    });

    return res.status(200).send({ message: "Files uploaded successfully!", files, count });
};




module.exports = {
    uploadSingleFile,
    uploadMultipleFiles
};