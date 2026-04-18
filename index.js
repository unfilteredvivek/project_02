const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('🚀 App updated from CI/CD Pipeline');
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});