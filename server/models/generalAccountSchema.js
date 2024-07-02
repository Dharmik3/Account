const mongoose = require('mongoose');

const generalAccountSchema = new mongoose.Schema({
    accountName: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
        enum: [
            'assets',
            'bank',
            'cash',
            'expense',
            'income',
            'liability',
            'purchase',
            'sales',
            'non recurring',
        ],
    },
    openingBalance: {
        type: Number,
        default: 0,
    },
    balanceType: {
        type: String,
        enum: ['dr', 'cr'],
    },
});

const GeneralAccount = mongoose.model('GeneralAccount', generalAccountSchema);

module.exports = GeneralAccount;
