const Journal = require('../models/journalSchema');
const GeneralAccount = require('../models/generalAccountSchema')
const CASH_AC = require('../constant');

exports.getJournalInRange = async (req, res, next) => {
    const { date } = req.query;
    try {

        const previousJournals = await Journal.find({
            transactionDate: { $lt: date }
        });

        // Calculate the opening balance
        let openingBalance = 0;
        previousJournals.forEach(record => {
            if (record.cashBankAccount === CASH_AC) {
                if (record.balanceType === 'cr') {
                    openingBalance += record.amount;
                } else if (record.balanceType === 'dr') {
                    openingBalance -= record.amount;
                }
            }
            else if (record.generalAccount === CASH_AC) {
                if (record.balanceType === 'cr') {
                    openingBalance -= record.amount;
                } else if (record.balanceType === 'dr') {
                    openingBalance += record.amount;
                }
            }

        });
        // fetching the account opening balance odf Cash A/C
        const [openingAccount] = await GeneralAccount.find({ accountName: CASH_AC }).select({ openingBalance: 1, balanceType: 1 }).exec();
        const { openingBalance: accountOpeningBalance, balanceType } = openingAccount;

        // Adding the openinig balance according to it's type
        if (balanceType === 'cr') {
            openingBalance += accountOpeningBalance;
        }
        else {
            openingBalance -= accountOpeningBalance;
        }

        const dailyJournals = await Journal.find({
            transactionDate: date
        })

        const groupedRecords = {
            cr: {},
            dr: {}
        };

        dailyJournals.forEach(record => {
            const { balanceType, cashBankAccount, generalAccount } = record;
            const targetAccount = cashBankAccount
            const counterpartAccount = generalAccount

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
            dr: [],
            openingBalance,
            closingBalance: openingBalance
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
        dailyJournals.forEach(record => {
            if (record.cashBankAccount === CASH_AC) {
                if (record.balanceType === 'cr') {
                    result.closingBalance += record.amount;
                } else if (record.balanceType === 'dr') {
                    result.closingBalance -= record.amount;
                }
            }
            else if (record.generalAccount === CASH_AC) {
                if (record.balanceType === 'cr') {
                    result.closingBalance -= record.amount;
                } else if (record.balanceType === 'dr') {
                    result.closingBalance += record.amount;
                }
            }

        });

        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        next(error)
    }
}