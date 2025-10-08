const jwt = require('jsonwebtoken');

// This function checks for a valid token and attaches the user's data to the request
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, "your_jwt_secret", (err, userPayload) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = userPayload.user; // Attach user payload (e.g., { id: 1, role: 'PHC_STAFF' })
    next(); // Proceed to the next middleware or the controller
  });
};

// This function checks if the user's role is allowed
exports.checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('You do not have permission to perform this action');
    }
    next();
  };
};