const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler.js')
const cors = require('cors');
const accountController = require('./controllers/accountController.js')

const app = express();
dotenv.config();
require('./services/connection');
const corsOptions = {
    credentials: true,
    origin: ['https://account-fawn.vercel.app/','http://localhost:5001'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions))

app.use(express.json());

const journalRoutes = require('./routes/journalRoutes');
const accountRoutes = require('./routes/accountRoutes');
const dailyBookRoutes = require('./routes/dailyBookRoutes');
const ledgerRoutes = require('./routes/ledgerRoutes')

app.use('/api/v1/journal', journalRoutes);
app.use('/api/v1/account', accountRoutes);
app.use('/api/v1/dailyBook', dailyBookRoutes)
app.use('/api/v1/getAccounts', accountController.getAccountsName)
app.use('/api/v1/ledger', ledgerRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
