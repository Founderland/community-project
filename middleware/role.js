//MIDDLEWARE
const isUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res
      .status(401)
      .json({ error: 401, message: "Please login to access this data" })
  }
}

const isAdmin = (req, res, next) => {
  if (
    (req.isAuthenticated() && req.user.role === "admin") ||
    req.user.role === "sadmin"
  ) {
    return next()
  } else {
    res
      .status(401)
      .json({ error: 401, message: "You are not authorized to view this data" })
  }
}

module.exports = {
  isAdmin,
  isUser,
}
