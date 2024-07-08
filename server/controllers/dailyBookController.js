const Journal = require('../models/journalSchema');

exports.getJournalInRange = async (req, res, next) => {
    const { startDate, endDate } = req.params

    try {
        const dailyJournal = await Journal.find({
            transactionDate: {
                $gte: startDate,
                $lte: endDate
            }
        })
        console.log(dailyJournal)
    }
    catch (error) {
        next(error)
    }
}