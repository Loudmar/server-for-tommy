const User = require('../model/user');

const handleLogout = async (req, res) => {
    // On client, also delete the access token
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(204); //No content
   
    const refreshToken = cookies.jwt;

    // Is refresh token in the DB?

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        //return res.sendStatus(204); 
    }
    
    //Delete refreshToken in the DB here
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // In development secure: true - only servers on https

    res.sendStatus(204).json({ message: 'User logged out successfully!' });
    
}

module.exports = { handleLogout };