const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // get token from header
  const token = req.header('x-auth-token');

  // check if theres no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Kein Token vorhanden, Zugriff verweigert' });
  }

  // verfify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token ist ungültig' });
  }
};
