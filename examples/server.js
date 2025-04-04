const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the examples directory
app.use(express.static(path.join(__dirname)));

// Serve the dist directory for the library
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// Add a redirect from root to benchmark
app.get('/', (req, res) => {
    res.redirect('/benchmark');
});

// Add a redirect from old benchmark path to new one
app.get('/benchmark.html', (req, res) => {
    res.redirect('/benchmark');
});

app.listen(port, () => {
    console.log(`Examples server running at http://localhost:${port}`);
    console.log('Available examples:');
    console.log('- Basic: http://localhost:3000/basic-usage.html');
    console.log('- Benchmark: http://localhost:3000/benchmark/');
}); 