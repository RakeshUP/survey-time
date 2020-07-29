import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export default (req, res, next) => {
  try {
    const authCookie = req.headers.cookie.split(';').filter((el) => el.search('authToken') !== -1);
    const authToken = authCookie[0].split('=')[1];

    const { email } = jwt.verify(authToken, JWT_SECRET);
    req.email = email;
    next();
  } catch (err) {
    res.clearCookie('authToken');
    res.status(401).send({ status: 'error', message: 'Authentication Error' });
  }
};
