const GeneralAccount = require('../models/generalAccountSchema');

exports.getAllAccounts = async (req, res, next) => {
    try {
        const accounts = await GeneralAccount.find();
        res.status(200).json({ success: true, data: accounts });
    } catch (error) {
        next(error);
    }
};

exports.createAccount = async (req, res, next) => {
    try {
        const account = new GeneralAccount(req.body);
        await account.save();
        res.status(201).json({ success: true, data: account });
    } catch (error) {
        next(error);
    }
};

exports.deleteAccount = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            const error = new Error('ID is required');
            error.statusCode = 400;
            return next(error);
        }
        const account = await GeneralAccount.findByIdAndDelete(id);

        if (!account) {
            const error = new Error(`Account with ID ${id} not found`);
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ success: true, data: { message: `Account ${id} deleted successfully` } });
    } catch (error) {
        next(error);
    }
};

exports.updateAccount = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        if (!id) {
            const error = new Error('ID is required');
            error.statusCode = 400;
            return next(error);
        }

        if (!updateFields || Object.keys(updateFields).length === 0) {
            const error = new Error('Update fields are required');
            error.statusCode = 400;
            return next(error);
        }
        delete updateFields.id
        const account = await GeneralAccount.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        if (!account) {
            const error = new Error(`Account with ID ${id} not found`);
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({ success: true, data: account });
    } catch (error) {
        next(error);
    }
};

exports.getAccountsName = async (req, res, next) => {
    try {
        const accounts = await GeneralAccount.find().select({accountName:1}).exec();
        res.status(200).json({ success: true, data: accounts });
    }
    catch (err) {
        next(err);
    }
}