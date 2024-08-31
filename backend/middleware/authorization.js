import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    const accessToken = req.cookies['access_token'];

    if (accessToken == null) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: err.message });
        req.user = user;
        next();
    });
}

export { authenticateToken };