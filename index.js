const express = require('express');
const app = express();
const router = require('./routes/tasks');
const dotenv = require('dotenv');
app.use(express.json());
dotenv.config();

app.use('/task', router);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});
