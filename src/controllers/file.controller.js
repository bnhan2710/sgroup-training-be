
const uploadFile = (req, res) => {
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

module.exports = {
    uploadFile
};