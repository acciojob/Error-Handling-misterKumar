const fs = require('fs');
const csv = require('csv-parser');

// Accept command-line arguments for CSV file path and column name
const csvFilePath = process.argv[2];
const columnName = process.argv[3];

// Check if both arguments are provided
if (!csvFilePath || !columnName) {
  console.error('Please provide the path to the CSV file and the column name.');
  process.exit(1);
}

let sum = 0;
let count = 0;

// Read the CSV file
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (data) => {
    // Parse data and calculate the sum of the specified column
    const value = Number(data[columnName]);
    if (!isNaN(value)) {
      sum += value;
      count++;
    }
  })
  .on('end', () => {
    // Calculate the average value and print it to the console
    if (count > 0) {
      const average = sum / count;
      console.log(`The average value of ${columnName} is: ${average}`);
    } else {
      console.log(`No valid values found in the ${columnName} column.`);
    }
  })
  .on('error', (err) => {
    // Handle errors during file reading
    console.error(`Error reading CSV file: ${err}`);
  });
