const Journal = require('../models/journalSchema');

exports.getJournalInRange = async (req, res, next) => {
    const { date } = req.query;
    try {
        const dailyJournals = await Journal.find({
            transactionDate: date
        })


        const groupedRecords = {
            cr: {},
            dr: {}
        };

        dailyJournals.forEach(record => {
            const { balanceType, cashBankAccount, generalAccount } = record;
            const targetAccount = (balanceType === 'cr') ? cashBankAccount : generalAccount;
            const counterpartAccount = (balanceType === 'cr') ? generalAccount : cashBankAccount;

            if (!groupedRecords[balanceType][targetAccount]) {
                groupedRecords[balanceType][targetAccount] = [];
            }
            groupedRecords[balanceType][targetAccount].push(record);

            // Ensure the counterpart account group exists in the opposite balanceType
            const oppositeBalanceType = (balanceType === 'cr') ? 'dr' : 'cr';
            if (!groupedRecords[oppositeBalanceType][counterpartAccount]) {
                groupedRecords[oppositeBalanceType][counterpartAccount] = [];
            }
            groupedRecords[oppositeBalanceType][counterpartAccount].push(record);
        });

        // Transform the grouped records into the required format
        const result = {
            cr: [],
            dr: []
        };

        // Helper function to map record to cr entry
        const mapCrEntry = record => ({
            receiptNumber: record.receiptNumber || record.voucherNumber,
            transactionDetails: record.transactionDetails,
            amount: record.amount
        });

        // Helper function to map record to dr entry
        const mapDrEntry = record => ({
            voucherNumber: record.receiptNumber || record.voucherNumber,
            details: record.details,
            amount: record.amount
        });

        for (const [account, entries] of Object.entries(groupedRecords.cr)) {
            result.cr.push({
                accountName: account,
                entries: entries.map(mapCrEntry)
            });
        }

        for (const [account, entries] of Object.entries(groupedRecords.dr)) {
            result.dr.push({
                accountName: account,
                entries: entries.map(mapDrEntry)
            });
        }

        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        next(error)
    }
}