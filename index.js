const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const folderPath = path.join(__dirname, 'files'); // Folder to store the files

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

// Default route for base URL
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js File System API! Use /create-file or /get-files.');
});

// Endpoint 1: Create a text file with the current timestamp
app.post('/create-file', (req, res) => {
    const timestamp = new Date().toISOString();
    const filename = `${timestamp}.txt`;
    const filepath = path.join(folderPath, filename);

    fs.writeFile(filepath, `Timestamp: ${timestamp}`, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to create file');
        }
        res.send(`File created: ${filename}`);
    });
});

// Endpoint 2: Retrieve all text files in the folder
app.get('/get-files', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to retrieve files');
        }

        // Filter only `.txt` files
        const textFiles = files.filter((file) => file.endsWith('.txt'));
        res.json({ files: textFiles });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
