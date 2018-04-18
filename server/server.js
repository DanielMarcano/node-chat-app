const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(publicPath)));

app.listen(PORT, () => {
  console.log(`Server up and running at PORT ${PORT}`);
});