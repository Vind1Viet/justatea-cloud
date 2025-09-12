const jws = require('jsonwebtoken');

function authMiddleware(requireRole = null) {
  return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Don't have token, access denied" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }

            if (requireRole && user.role !== requireRole) {
                return res.status(403).json({ message: "Access denied" });
            }

            req.user = user;
            next();
        });
    }
}

module.exports = authMiddleware;