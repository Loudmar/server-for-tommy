const User = require('../model/user');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { userName } });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ userName, email, password: hashedPassword });
        res.status(201).json(`New user ${userName} created.`);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createUser };
