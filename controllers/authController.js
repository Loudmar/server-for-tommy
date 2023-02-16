const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  if(!userName || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

  try {
    const user = await User.findOne({ where: { userName } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' });
    user.refreshToken = refreshToken;
    const result = await user.save();
    console.log(result);

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //Add secure: true, for deployment 

    res.json({ accessToken });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { loginUser };