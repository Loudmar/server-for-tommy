const User = require('../model/user');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(401);
    //console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) return res.sendStatus(403); //Forbidden
    //Evaluate jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser.userName !== decoded.userName) 
        return res.status(403).json({ error: 'Invalid refresh token' });

        const accessToken = jwt.sign({ "userName": decoded.userName }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });

        res.json({ accessToken })
    })
    
}

module.exports = { handleRefreshToken };