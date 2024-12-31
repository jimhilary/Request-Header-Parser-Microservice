const express = require('express');
const cors = require('cors');
const path = require('path');

// Create an Express application instance
const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
// This is important for allowing requests from different domains
// The optionsSuccessStatus: 200 setting ensures compatibility with legacy browsers
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from the 'public' directory
// This middleware automatically serves our HTML, CSS, and any other static files
app.use(express.static('public'));

// Route handler for the root path ('/')
// When users visit the main page, we serve our HTML documentation
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint that processes the header information
// This is where the main functionality of our microservice lives
app.get('/api/whoami', (req, res) => {
  // Extract and return relevant header information
  // req.ip provides the client's IP address
  // accept-language header shows the client's preferred languages
  // user-agent header contains information about the client's browser/system
  res.json({
    ipaddress: req.ip || req.connection.remoteAddress, // Fallback in case req.ip is unavailable
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

// Start the server on the specified port
// Process.env.PORT allows for deployment platforms to set their own port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});