const jwt = require('jsonwebtoken');

// Function to validate URL format
const validateUrl = (url) => {
  const urlPattern = new RegExp('^(https?:\/\/)?'+ // validate protocol
    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.?)+[a-z]{2,}|'+ // validate domain
    '((\d{1,3}\.){3}\d{1,3}))'+ // OR validate IP (v4) address
    '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // validate port and path
    '(\?[;&a-z\d%_.~+=-]*)?'+ // validate query string
    '(\#[-a-z\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(url);
};

// Generate JWT Token (for future authentication features)
const generateJwt = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Verify JWT Token
const verifyJwt = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  validateUrl,
  generateJwt,
  verifyJwt,
};
