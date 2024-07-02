const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler.js')
const cors = require('cors');

const app = express();
dotenv.config();
require('./services/connection');
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173',] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions))

app.use(express.json());

const journalRoutes = require('./routes/journalRoutes.js');
const accountRoutes = require('./routes/accountRoutes');

app.use('/api/v1/journal', journalRoutes);
app.use('/api/v1/account', accountRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
