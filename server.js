const express = require('express');
const path = require('path');
const app = express();

// Serve only the static files from the dist directory
app.use(express.static(__dirname + '/dist/browser'));

// Redirect all other requests to the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/browser/index.html'));
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
