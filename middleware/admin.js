const isAdmin = (req, res, next) => {
  if (
    req.session.user &&
    (req.session.user.role === "admin" ||
      req.session.user.role === "superadmin")
  ) {
    req.userRole = req.session.user.role;
    next();
  } else {
    res
      .status(403)
      .json({ message: "You are not authorized to access this resource" });
  }
};

const isUser = (req, res, next) => {
  const userTypes = ["user", "admin", "superadmin"];
  if (req.session.user && userTypes.includes(req.session.user.role)) {
    req.userRole = req.session.user.role;
    next();
  } else {
    res
      .status(403)
      .json({ message: "You are not authorized to access this resource" });
  }
};

module.exports = { isAdmin, isUser };
