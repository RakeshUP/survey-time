import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const createAuthToken = (req, res, next) => {
  const { body: { email, password } } = req;
  const jwtTokenObject = {
    email,
    password,
    iat: Date.now(),
  };
  try {
    const jwtToken = jwt.sign(jwtTokenObject, JWT_SECRET, { expiresIn: '1 day' });
    res.cookie('authToken', jwtToken, { httpOnly: true, maxAge: 86400000, domain: req.headers.domain });
    res.send({ jwtToken });
  } catch (err) {
    next(err);
  }
};

export default createAuthToken;
