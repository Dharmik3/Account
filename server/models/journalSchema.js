const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    transactionDate: {
        type: Date,
        required: true,
    },
    cashBankAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeneralAccount',
        required: true,
    },
    voucherNumberDr: {
        type: Number,
        unique: true,
        sparse: true, // Allows either voucherNumberDr or receiptNumberCr to be unique
    },
    receiptNumberCr: {
        type: Number,
        unique: true,
        sparse: true, // Allows either receiptNumberCr or voucherNumberDr to be unique
    },
    debitCredit: {
        type: String,
        required: true,
        enum: ['Debit', 'Credit'],
    },
    transactionDetails: {
        type: String,
        maxlength: 50,
    },
    generalAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeneralAccount',
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
