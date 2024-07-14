const Journal = require('../models/journalSchema');
const GeneralAccount = require('../models/generalAccountSchema');
const { reverseBalanceType } = require('../utils/helper')



exports.getLedger = async (req, res, next) => {
    const { startDate, endDate, accountName } = req.query

    const query = {
        transactionDate: {
            $gte: startDate,
            $lte: endDate
        },
        $or: [
            { generalAccount: { $in: accountName } },
            { cashBankAccount: { $in: accountName } }
        ]
    };
    try {
        const [openingAccount] = await GeneralAccount.find({ accountName }).select({ openingBalance: 1, balanceType: 1 }).exec();
        const { openingBalance, balanceType } = openingAccount;

        const prevLedgerRecords = await Journal.find({ transactionDate: { $lt: startDate }, $or: [{ generalAccount: accountName }, { cashBankAccount: accountName }] })
        const journalRecords = await Journal.find(query)

        const ledgreRecords = journalRecords.map(record => {
            return {
                transactionDate: record.transactionDate,
                amount: record.amount,
                balanceType: record.generalAccount === accountName ? reverseBalanceType(record.balanceType) : record.balanceType,
                description: record.generalAccount === accountName ? record.details : record.transactionDetails
            }
        })
        let prevBalance = prevLedgerRecords.reduce((acc, record) => {
            if (record.generalAccount === accountName) {
                return record.balanceType === 'cr' ? acc - record.amount : acc + record.amount;
            }
            else {
                return record.balanceType === 'cr' ? acc + record.amount : acc - record.amount;
            }
        }, 0)
        if (accountName !== 'Cash A/C') {
            if (balanceType === 'cr') {
                prevBalance += openingBalance;
            }
            else {
                prevBalance -= openingBalance;
            }
        }


        const response = {
            openingBalance: Math.abs(prevBalance),
            openingBnalanceType: prevBalance > 0 ? 'cr' : (prevBalance === 0 ? balanceType : 'dr'),
            ledgreRecords
        }
        res.status(200).json({ success: true, data: response });
    }
    catch (err) {
        next(err);
    }
}