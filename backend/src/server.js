/*require('dotenv').config();

console.log("Starting server.js...");


const startEscalationWorker = re
require('./jobs/escalationWorker'); 
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});*/

require('dotenv').config(); // This must remain the very first line

console.log("Starting server.js...");

// ✅ Import the worker function AND the db pool
const startEscalationWorker = require('./jobs/escalationWorker');
const pool = require('./config/db'); // This is the successfully created pool
const app = require('./app');

// ✅ Start the worker by passing the pool to it
startEscalationWorker(pool);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

