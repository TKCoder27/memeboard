const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Formidable = require('formidable');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const form = new Formidable.IncomingForm();
        form.uploadDir = path.join(__dirname, 'uploads');
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.status(500).json({ error: 'Error during file upload' });
                return;
            }

            const uploadedFile = files.media[0];
            const fileExtension = path.extname(uploadedFile.originalFilename);
            const fileName = `${uuidv4()}${fileExtension}`;
            const filePath = path.join(form.uploadDir, fileName);

            fs.renameSync(uploadedFile.filepath, filePath);

            // You can use a cloud storage service to save the file
            // For now, we'll return the local file path (in Vercel's case, it would need cloud storage)
            res.status(200).json({ url: `/uploads/${fileName}` });
        });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
