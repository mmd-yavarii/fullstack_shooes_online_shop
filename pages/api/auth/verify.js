import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                valid: false,
                message: 'No token provided',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({
            valid: true,
            user: decoded,
        });
    } catch (error) {
        return res.status(401).json({
            valid: false,
            message: 'Invalid token',
        });
    }
}
