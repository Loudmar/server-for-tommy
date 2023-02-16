const User = require('../model/user');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    try {
        const user = await User.findAll();
        console.log(`Found ${user.length} users.`);
        res.json(user);
    } catch (err) {
        console.error(`Error getting users: ${err}`);
        return res.status(204).json({ 'message': 'No users found!' });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ 'message': 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.userName = req.body.userName;
        user.email = req.body.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        await user.save();

        return res.status(200).json(`User ${userName} updated.`);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const user = await User.findOne({ where: { id: userId } });
        //console.log(user);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        await User.destroy({ where: { id: userId } });

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
};