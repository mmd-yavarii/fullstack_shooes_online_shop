import jwt from 'jsonwebtoken';

function verifyToken(req) {
    try {
        const cookie = req.headers.cookie || '';

        const token = cookie
            .split(';')
            .find((c) => c.trim().startsWith('token='))
            ?.split('=')[1];

        if (!token) return null;

        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}

export { verifyToken };
