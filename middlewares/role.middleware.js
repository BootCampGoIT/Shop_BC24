const roleMiddleware = roles => (req, res, next) => {
    const currentRole = req.currentUser.role;
    if (roles.includes(currentRole)) return next();
    res.status(403).send('Forbiden');
}

module.exports = {roleMiddleware};