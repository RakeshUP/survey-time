import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// middleware for reading cookies and verifying session
const isAuthenticated = (req, res, next) => {
  try {
    // get all cookies from headers and filter out only authToken
    const authCookie = req.headers.cookie.split(';').filter((el) => el.search('authToken') !== -1);
    const authToken = authCookie[0].split('=')[1];

    const { email } = jwt.verify(authToken, JWT_SECRET);
    req.email = email;
    next();
  } catch (err) {
    res.clearCookie('authToken');
    // respond with HTTP 401 when there is no authToken or if it fails JWT verification
    res.status(401).send({ status: 'error', message: 'Authentication Error' });
  }
};

export default isAuthenticated;
