const fs = require('fs');

function readAndParseJSON(filePath) {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const parsedData = JSON.parse(jsonData);

        if (typeof parsedData.name === 'undefined' || typeof parsedData.age === 'undefined') {
            console.log("Missing required data in the JSON file.");
            return;
        }

        console.log(JSON.stringify(parsedData));
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log("Invalid JSON file format. Please provide a valid JSON file.");
        } else {
            console.log(`Error reading the file: ${error.message}`);
        }
    }
}


if (require.main === module) {
    const filePath = process.argv[2];
    if (!filePath) {
        console.log("Please provide a JSON file path.");
        return;
    }
    readAndParseJSON(filePath);
}

module.exports = { readAndParseJSON };