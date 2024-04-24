const jwt = require('jsonwebtoken');

// checks if user is authenticated
exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secret_key');
    req.userData = { userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

// checks if user is an admin
exports.isAdmin = (req, res, next) => {
  if (req.userData && req.userData.role === 'ADMIN') {
    next();
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};

// checks if user is faculty
exports.isFaculty = (req, res, next) => {
  if (req.userData && req.userData.role === 'Faculty') {
    next();
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};

// checks if user is a student
exports.isStudent = (req, res, next) => {
  if (req.userData && req.userData.role === 'Student') {
    next();
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};
