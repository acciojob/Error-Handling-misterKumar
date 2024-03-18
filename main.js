const fs = require('fs');

// Check if the right number of arguments are passed
if (process.argv.length !== 4) {
  console.error('Usage: node average-csv.js <path-to-csv> <column-name>');
  process.exit(1);
}

const filePath = process.argv[2];
const columnName = process.argv[3];

// Read the CSV file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }

  const lines = data.trim().split('\n');
  const header = lines[0].split(',');

  // Check if the column name exists
  const columnIndex = header.indexOf(columnName);
  if (columnIndex === -1) {
    console.log(`No valid values found in the ${columnName} column.`);
    process.exit(0);
  }

  let sum = 0;
  let count = 0;

  // Calculate the average
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const value = parseFloat(values[columnIndex]);

    if (!isNaN(value)) {
      sum += value;
      count++;
    }
  }

  if (count === 0) {
    console.log(`No valid values found in the ${columnName} column.`);
    process.exit(0);
  }

  const average = sum / count;
  console.log(`The average value of ${columnName} is: ${average}`);
});