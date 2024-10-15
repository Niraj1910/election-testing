const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'You are not authorized to access this resource' });
  }
};

module.exports = isAdmin;