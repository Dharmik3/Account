const Journal = require('../models/journalSchema');

exports.getAllJournals = async (req, res, next) => {
    try {
        const journals = await Journal.find();
        res.status(200).json(journals);
    } catch (error) {
        next(error);
    }
};

exports.createJournal = async (req, res, next) => {
    try {
        const journal = new Journal(req.body);
        await journal.save();
        res.status(201).json(journal);
    } catch (error) {
        next(error);
    }
};