const Journal = require('../models/journalSchema');

exports.getJournalInRange = async (req, res, next) => {
    const { date } = req.query;
    try {
        const dailyJournal = await Journal.find({
            transactionDate: date
        })
        res.status(201).json({ success: true, data: dailyJournal });
    }
    catch (error) {
        next(error)
    }
}