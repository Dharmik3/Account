const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    transactionDate: {
        type: Date,
        required: true,
    },
    cashBankAccount: {
        type: String,
        required: true,
    },
    voucherNumber: {
        type: Number,
        unique: true,
        sparse: true, // Allows either voucherNumberDr or receiptNumberCr to be unique
    },
    receiptNumber: {
        type: Number,
        unique: true,
        sparse: true, // Allows either receiptNumberCr or voucherNumberDr to be unique
    },
    balanceType: {
        type: String,
        required: true,
        enum: ['dr', 'cr'],
    },
    transactionDetails: {
        type: String,
        maxlength: 50,
    },
    generalAccount: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    details: {
        type: String,
        required: true
    },
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
